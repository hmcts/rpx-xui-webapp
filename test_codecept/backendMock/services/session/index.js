const fs = require('fs');
const path = require('path');
const axios = require('axios');

const roleAssignmentsService = require('../roleAssignments/index');

const BASE_URL = process.env.WEB_BASE_URL || 'http://localhost:3000';
const STRICT_SESSIONS = process.env.STRICT_SESSIONS === 'true'; // throw instead of self-heal

// Tunables (override in CI if you want)
const POLL_INTERVAL_MS = Number(process.env.SESSION_POLL_INTERVAL_MS || 1500);
const MAX_WAIT_MS = Number(process.env.SESSION_MAX_WAIT_MS || 25000);
const STUB_AFTER_MS = Number(process.env.SESSION_STUB_AFTER_MS || 18000);

class MockSessionService {
  constructor(mode) {
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      validateStatus: (s) => s >= 200 && s < 500, // don’t throw on 4xx
    });

    const debug = mode && mode === 'DEBUG';
    this.sessionsPath = path.resolve(
      __dirname,
      debug ? '../../../../api/.sessions' : '../../../../.sessions'
    );
    try { fs.mkdirSync(this.sessionsPath, { recursive: true }); } catch { }

    this.defaultSession = '';
    this.sessionUsers = [];
  }

  setDefaultSession(session) {
    this.defaultSession = session.split('.')[0].replace('s:', '');
  }

  async getCopyOfDefaultSession() {
    const fp = path.join(this.sessionsPath, `${this.defaultSession}.json`);
    try {
      const raw = fs.readFileSync(fp, 'utf8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  getSessionFiles() {
    try { return fs.readdirSync(this.sessionsPath); }
    catch { return []; }
  }

  async updateSessionFile(_filename) {
    // no-op placeholder (kept for API compatibility)
  }

  async getSessionCookies() {
    try {
      const res = await this.http.get('/external/configuration-ui/');
      return res.headers?.['set-cookie'] || [];
    } catch {
      return [];
    }
  }

  async setUserSession(session, _userDetails) {
    const sessionId = session.split('.')[0].replace('s:', '');
    const fp = path.join(this.sessionsPath, `${sessionId}.json`);
    try {
      const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
      json.passport = json.passport || { user: { userinfo: {} } };
      json.passport.user = json.passport.user || { userinfo: {} };
      json.passport.user.userinfo.roles = ['caseworker', 'caseworker-iac-judge'];
      fs.writeFileSync(fp, JSON.stringify(json, null, 2), 'utf8');
    } catch (e) {
      // If the file doesn’t exist yet, create a minimal one
      const proto = {
        passport: {
          user: {
            tokenset: { accessToken: session },
            userinfo: { roles: ['caseworker', 'caseworker-iac-judge'] }
          }
        }
      };
      fs.writeFileSync(fp, JSON.stringify(proto, null, 2), 'utf8');
    }
    return '';
  }

  async getSessionFileAuth(auth) {
    const files = this.getSessionFiles().filter(f => f.endsWith('.json'));
    for (const file of files) {
      const fp = path.join(this.sessionsPath, file);
      try {
        const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
        if (json?.passport?.user?.tokenset?.accessToken === auth) {
          return fp;
        }
      } catch { }
    }
    return null;
  }

  async waitForSessionWithRoleAssignments(auth) {
    const t0 = Date.now();
    while (Date.now() - t0 < MAX_WAIT_MS) {
      await sleep(POLL_INTERVAL_MS);

      const fp = await this.getSessionFileAuth(auth);
      if (!fp) {
        // Self-heal by creating a stub after a while
        if (Date.now() - t0 > STUB_AFTER_MS) {
          const sid = auth.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '');
          const proto = {
            passport: {
              user: {
                tokenset: { accessToken: auth },
                userinfo: { roles: [] }
              }
            },
            roleAssignmentResponse: []
          };
          const newPath = path.join(this.sessionsPath, `${sid}.json`);
          try {
            fs.writeFileSync(newPath, JSON.stringify(proto, null, 2), 'utf8');
            console.warn('[mock] generated stub session %s', newPath);
            return;
          } catch (e) {
            // keep looping; next pass might succeed
          }
        }
        continue;
      }

      try {
        const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
        if (json.roleAssignmentResponse) return; // ready
      } catch { }
      // not yet populated; keep waiting
    }

    if (STRICT_SESSIONS) {
      throw new Error('Session not updated with role assignments within timeout');
    }
    console.warn('[mock] proceeding without roleAssignmentResponse (timed out)');
  }

  async updateAuthSessionWithRoles(auth, roles) {
    await this.waitForSessionWithRoleAssignments(auth);
    const fp = await this.getSessionFileAuth(auth);
    if (!fp) return;
    try {
      const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
      json.passport = json.passport || { user: { userinfo: {} } };
      json.passport.user = json.passport.user || { userinfo: {} };
      json.passport.user.userinfo.roles = roles;
      fs.writeFileSync(fp, JSON.stringify(json, null, 2), 'utf8');
    } catch { }
  }

  async updateAuthSessionWithUserInfo(auth, userInfo) {
    await this.waitForSessionWithRoleAssignments(auth);
    const fp = await this.getSessionFileAuth(auth);
    if (!fp) return;
    try {
      const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
      json.passport = json.passport || { user: {} };
      json.passport.user = json.passport.user || {};
      json.passport.user.userinfo = userInfo;
      fs.writeFileSync(fp, JSON.stringify(json, null, 2), 'utf8');
    } catch { }
  }

  async updateAuthSessionWithRoleAssignments(auth, roleAssignments) {
    await this.waitForSessionWithRoleAssignments(auth);
    const fp = await this.getSessionFileAuth(auth);
    if (!fp) return [];

    // de-dup roleAssignments by id (if present)
    const dedup = (arr) => {
      const seen = new Set();
      const out = [];
      for (const r of arr || []) {
        const k = r.id || JSON.stringify(r);
        if (!seen.has(k)) { seen.add(k); out.push(r); }
      }
      return out;
    };

    try {
      const json = JSON.parse(fs.readFileSync(fp, 'utf8'));

      // push into service cache once
      roleAssignmentsService.serviceUsersRoleAssignments.push(...roleAssignments);
      roleAssignmentsService.serviceUsersRoleAssignments =
        dedup(roleAssignmentsService.serviceUsersRoleAssignments);

      if (Array.isArray(json.roleAssignmentResponse)) {
        json.roleAssignmentResponse = dedup(json.roleAssignmentResponse.concat(roleAssignments));
      } else {
        json.roleAssignmentResponse = dedup(roleAssignments);
      }

      fs.writeFileSync(fp, JSON.stringify(json, null, 2), 'utf8');
      return json.roleAssignmentResponse;
    } catch {
      return [];
    }
  }

  async getSessionRolesAndRoleAssignments(auth) {
    const fp = await this.getSessionFileAuth(auth);
    if (!fp) return { roles: [], roleAssignments: [] };
    try {
      const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
      return {
        roles: (json.passport?.user?.userinfo?.roles) || [],
        roleAssignments: json.roleAssignmentResponse || []
      };
    } catch {
      return { roles: [], roleAssignments: [] };
    }
  }

  /* --- request capture helpers (unchanged except for safety) --- */
  captureRequestDetails(apiMethod, req) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    let userSession = this.sessionUsers.find((s) => s.token === token);
    if (!userSession) {
      userSession = { requests: [], token, apiData: [] };
      this.sessionUsers.push(userSession);
    }
    let api = userSession.apiData.find((d) => d.method === apiMethod);
    if (!api) {
      api = { method: apiMethod, response: null, request: { body: req.body } };
      userSession.apiData.push(api);
    } else {
      api.request = { body: req.body };
    }
  }

  getCapturedRequestData(token, apiMethod) {
    const user = this.sessionUsers.find((s) => s.token === token.replace('Bearer ', ''));
    if (!user) return null;
    const api = user.apiData.find((d) => d.method === apiMethod);
    return api ? api.request : null;
  }
}

const mode = process.env.DEBUG === 'true' ? 'DEBUG' : '';
module.exports = new MockSessionService(mode);

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

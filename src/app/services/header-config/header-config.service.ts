import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { menuItems } from '../../models/base-header.model';

@Injectable({ providedIn: 'root' })
export class HeaderConfigService {
  constructor(private http: HttpClient) {}

  headerCfg: any;
  roleCfg: any = undefined;
  configValidityDuration = 1000 * 60 * 1;

  constructHeaderConfig(userRoles: string[]): Observable<any> {
    const headerData = JSON.parse(localStorage.getItem('headerCfg'));
    const isConfigValid = headerData && new Date(headerData.timestamp).getTime() + this.configValidityDuration > new Date().getTime();

    if (isConfigValid) {
      this.headerCfg = JSON.parse(localStorage.getItem('headerCfg')).config;
      return this.getRoleConfig(userRoles);
    }
    return this.fetchHeaderConfig().pipe(
      switchMap(() => this.getRoleConfig(userRoles))
    );
  }

  getRoleConfig(userRoles: string[]): Observable<any> {
    const configKeys = Object.keys(this.headerCfg);

    const matchedConfig = configKeys.find((config) => {
      // allow for multiple roles to be assigned to a single config
      if (config.includes('|')) {
        const roles = config.split('|');
        if (roles.some((role) => userRoles.includes(role))) {
          this.roleCfg = this.matchConfigAndMerge(this.headerCfg[config]);
          return true;
        }
      } else if (config !== 'default' && userRoles.includes(config)) {
        // if this is true then the user has a single role that matches the config
        this.roleCfg = this.matchConfigAndMerge(this.headerCfg[config]);
        return true;
      }
      return false;
    });
    if (!matchedConfig) {
      this.roleCfg = this.matchConfigAndMerge(this.headerCfg['default']);
    }
    return of(this.roleCfg);
  }

  matchConfigAndMerge(config: any): any[] {
    return config.map((item: any) => {
      const baseItem = menuItems.find((baseConfig: any) => baseConfig.text === item.text);
      return baseItem ? { ...baseItem, ...item } : item;
    });
  }

  fetchHeaderConfig(): Observable<void> {
    return this.http.get('/api/header/config').pipe(
      map((data) => {
        const headerData = {
          config: data,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('headerCfg', JSON.stringify(headerData));
        this.headerCfg = data;
      })
    );
  }
}
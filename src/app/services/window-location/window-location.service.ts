
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowLocationService {
  constructor() {}

  public getPathName(): string {
    return window.location.pathname;
  }
}

import { Injectable } from '@angular/core';

export abstract class Logger {
  debug(message: string): void {
  }
  trace(message: string): void {
  }
  info(message: string): void {
  }
  warn(message: string): void {
  }
  error(message: string): void {
  }
  fatal(message: string): void {
  }
}

@Injectable({
  providedIn: 'root'
})

export class LoggerService implements Logger {
  debug(message: string): void {
  }
  trace(message: string): void {
  }
  info(message: string): void {
  }
  warn(message: string): void {
  }
  error(message: string): void {
  }
  fatal(message: string): void {
  }
}

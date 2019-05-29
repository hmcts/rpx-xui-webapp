import { Injectable } from '@angular/core';

export abstract class Logger {
  info(message: string): void{

  }
  warn(message: string): void{

  }
  error(message: string): void{

  }
}

@Injectable({
  providedIn: 'root'
})

export class LoggerService implements Logger {
  info(message: string): void{

  }
  warn(message: string): void{

  }
  error(message: string): void{

  }
}

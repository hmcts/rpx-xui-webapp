export interface IdleConfigModel {
  timeout: number;
  idleMilliseconds: number;
  keepAliveInSeconds: number;
  idleServiceName?: string;
}

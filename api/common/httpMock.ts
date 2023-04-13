import { AxiosInstance } from 'axios';
import { HttpMockClient } from './httpMockClient';

export class HttpMock extends HttpMockClient {
  public static getInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = new HttpMock();
    }
    return this.axiosInstance.instance;
  }

  private static axiosInstance?: HttpMock;

  private constructor() {
    super('');
  }
}

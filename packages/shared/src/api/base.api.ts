import { type CreateAxiosDefaults } from 'axios';

import { Version } from './version.api';

enum EAPIVersion {
  V1 = 'v1',
  V2 = 'v2'
}

export class BaseInstance {
  private readonly baseURL: string;

  private config?: CreateAxiosDefaults;

  constructor(baseURL: string, config?: CreateAxiosDefaults) {
    this.baseURL = baseURL;
    this.config = config;
  }

  public v1() {
    return new Version(`${this.baseURL}/${EAPIVersion.V1}`, this.config);
  }

  public v2() {
    return new Version(`${this.baseURL}/${EAPIVersion.V2}`, this.config);
  }
}

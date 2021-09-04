import { Injectable } from '@angular/core';

import OpenLogin from '@toruslabs/openlogin';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private openLogin: OpenLogin;

  constructor() {
    this.openLogin = new OpenLogin({
      clientId: environment.torus.clientID,
      network: environment.torus.network,
    });
    this.openLogin.init().then(() => {});
  }

  public isAuthenticated(): boolean {
    return !!this.openLogin.privKey;
  }
}

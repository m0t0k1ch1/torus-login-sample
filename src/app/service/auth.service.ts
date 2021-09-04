import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Torus, { UserInfo, TorusPublicKey } from '@toruslabs/torus-embed';

import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isInitialized: boolean = false;
  private torus: Torus;

  constructor() {
    this.torus = new Torus();
  }

  private init(): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (this.isInitialized) {
        subscriber.next();
        subscriber.complete();
        return;
      }

      this.torus
        .init({
          showTorusButton: false,
        })
        .then(() => {
          this.isInitialized = true;
          subscriber.next();
          subscriber.complete();
        })
        .catch((e) => {
          subscriber.error(e);
        });
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.init().subscribe(
        () => {
          subscriber.next(this.torus.isLoggedIn);
          subscriber.complete();
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }

  public getUser(): Observable<User> {
    return new Observable<User>((subscriber) => {
      this.init().subscribe(
        () => {
          this.torus
            .getUserInfo('')
            .then((userInfo: UserInfo) => {
              this.torus
                .getPublicAddress({
                  verifier: 'google',
                  verifierId: userInfo.verifierId,
                })
                .then((addressOrPubkey: string | TorusPublicKey) => {
                  subscriber.next({
                    address:
                      typeof addressOrPubkey === 'string'
                        ? addressOrPubkey
                        : addressOrPubkey.address,
                    name: userInfo.name,
                    email: userInfo.email,
                    profileImage: userInfo.profileImage,
                    verifier: userInfo.verifier,
                    verifierID: userInfo.verifierId,
                  });
                  subscriber.complete();
                })
                .catch((e) => {
                  subscriber.error(e);
                });
            })
            .catch((e) => {
              subscriber.error(e);
            });
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }

  public login(): Observable<void> {
    return new Observable<void>((subscriber) => {
      this.init().subscribe(
        () => {
          this.torus
            .login({
              verifier: 'google',
            })
            .then(() => {
              subscriber.next();
              subscriber.complete();
            })
            .catch((e) => {
              subscriber.error(e);
            });
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }

  public logout(): Observable<void> {
    return new Observable<void>((subscriber) => {
      this.init().subscribe(
        () => {
          this.torus
            .logout()
            .then(() => {
              subscriber.next();
              subscriber.complete();
            })
            .catch((e) => {
              subscriber.error(e);
            });
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Web3Service } from 'src/app/service/web3.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private router: Router, private web3Service: Web3Service) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((subscriber) => {
      this.web3Service.isAuthenticated().subscribe(
        (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.router.navigate(['']);
            subscriber.next(false);
            subscriber.complete();
            return;
          }

          subscriber.next(true);
          subscriber.complete();
        },
        (err) => {
          subscriber.error(err);
        }
      );
    });
  }
}

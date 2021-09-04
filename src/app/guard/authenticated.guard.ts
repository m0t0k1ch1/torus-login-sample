import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((subscriber) => {
      this.authService.isAuthenticated().subscribe(
        (isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.router.navigate(['signin']);
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

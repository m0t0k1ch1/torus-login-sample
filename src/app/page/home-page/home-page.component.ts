import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interface/User';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public user: User | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user: User) => (this.user = user),
      (err) => this.notificationService.error(err)
    );
  }

  public sign(): void {
    this.authService.sign('message to be signed').subscribe(
      (sig) => console.log(sig),
      (err) => this.notificationService.error(err)
    );
  }

  public logout(): void {
    this.authService.logout().subscribe(
      () => this.router.navigate(['signin']),
      (err) => this.notificationService.error(err)
    );
  }
}

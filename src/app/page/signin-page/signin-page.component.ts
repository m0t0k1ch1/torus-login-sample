import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Web3Service } from 'src/app/service/web3.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit {
  constructor(
    private router: Router,
    private web3Service: Web3Service,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.web3Service.login().subscribe(
      () => {
        this.router.navigate(['']);
      },
      (err) => {
        this.notificationService.error(err);
      }
    );
  }
}

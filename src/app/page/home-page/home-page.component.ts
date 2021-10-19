import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interface/User';
import { Web3Service } from 'src/app/service/web3.service';
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
    private web3Service: Web3Service,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.web3Service.getUser().subscribe(
      (user: User) => (this.user = user),
      (err) => this.notificationService.error(err)
    );
  }

  public sign(): void {
    this.web3Service.sign('message to be signed').subscribe(
      (sig: string) => console.log(sig),
      (err) => this.notificationService.error(err)
    );
  }

  public sendTx(): void {
    this.web3Service
      .sendTx({
        to: '0x0000000000000000000000000000000000000000',
        value: 0,
        gas: 100_000,
        gasPrice: 100_000_000_000,
        data: '0x0000000000000000000000000000000000000000',
      })
      .subscribe(
        (txHash: string) => console.log(txHash),
        (err) => this.notificationService.error(err)
      );
  }

  public logout(): void {
    this.web3Service.logout().subscribe(
      () => this.router.navigate(['signin']),
      (err) => this.notificationService.error(err)
    );
  }
}

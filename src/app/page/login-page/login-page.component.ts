import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  vote: number = 0;

  constructor() { }

  ngOnInit() {
  }
  voteCount(value) {
    this.vote = value;
  }
}

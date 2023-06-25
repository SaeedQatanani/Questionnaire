import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: any;

  constructor(private session: SessionService) {}

  ngOnInit(): void {
    this.currentUser = this.session.getUser();
    console.log(this.currentUser);
  }

}

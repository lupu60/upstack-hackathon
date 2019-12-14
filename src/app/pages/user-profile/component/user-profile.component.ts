import { Component, OnInit } from '@angular/core';
import { generateAvatar } from '../../../shared/generateAvatar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor() {}
  loading = true;
  userProfilePicture;
  ngOnInit() {
    this.userProfilePicture = generateAvatar();
    this.loading = false;
  }
}

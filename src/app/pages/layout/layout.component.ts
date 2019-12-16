import { Component, OnInit } from '@angular/core';
import { RestUser } from 'src/app/api/rest-user.service';
import { ApiResponse, User } from 'src/app/shared/api.dto';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  hidden = false;
  topFlag = false;
  tintColor = '#108ee9';
  unselectedTintColor = '#888';
  tabbarStyle: object = { position: 'fixed', height: '100%', width: '100%', top: 0 };
  selectedIndex = 0;
  selectedChatUser;

  constructor(private restUser: RestUser) {}
  ngOnInit(): void {
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    this.restUser.getUserDetails(currentUser.uid).subscribe((res: ApiResponse) => {
      const user: User = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
    });
  }
  showTabBar(event) {
    event.preventDefault();
    this.hidden = !this.hidden;
  }

  changePosition(event) {
    event.preventDefault();
    this.topFlag = !this.topFlag;
  }

  tabBarTabOnPress(pressParam: any) {
    this.selectedIndex = pressParam.index;
  }

  chatSelectedFromMap(event) {
    this.selectedChatUser = event;
    this.selectedIndex = 1;
  }
}

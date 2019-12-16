import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  hidden = false;
  topFlag = false;
  tintColor = '#108ee9';
  unselectedTintColor = '#888';
  tabbarStyle: object = { position: 'fixed', height: '100%', width: '100%', top: 0 };
  selectedIndex = 0;

  constructor() {}

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
}

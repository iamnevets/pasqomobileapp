import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Home',
      icon: 'apps'
    },
    {
      title: 'Timetable',
      url: '/folder/Timetable',
      icon: 'calendar'
    },
    {
      title: 'Notifications',
      url: '/folder/Notifications',
      icon: 'notifications'
    },
    {
      title: 'Achievements',
      url: '/folder/Achievements',
      icon: 'medal'
    },
    {
      title: 'Flash Quiz',
      url: '/folder/Quiz',
      icon: 'game-controller'
    },
    {
      title: 'Settings',
      url: '/folder/Settings',
      icon: 'settings'
    },
    {
      title: 'Feedback',
      url: '/folder/Help',
      icon: 'help'
    }
  ];
  // public labels = ['Dark Theme', 'Notifications', 'Notes', 'Work', 'Travel', 'Settings'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}

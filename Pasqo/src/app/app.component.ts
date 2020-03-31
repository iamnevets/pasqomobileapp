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
      url: '/folder/home/home',
      icon: 'apps'
    },
    {
      title: 'Timetable',
      url: '/folder/timetable/timetable',
      icon: 'calendar'
    },
    {
      title: 'Notifications',
      url: '/folder/notifications/notifications',
      icon: 'notifications'
    },
    {
      title: 'Achievements',
      url: '/folder/achievements/achievements',
      icon: 'medal'
    },
    {
      title: 'Flash Quiz',
      url: '/folder/flash-quiz/flash-quiz',
      icon: 'game-controller'
    },
    {
      title: 'Settings',
      url: '/folder/settings/settings',
      icon: 'settings'
    },
    {
      title: 'Feedback',
      url: '/folder/feedback/feedback',
      icon: 'help'
    }
  ];



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

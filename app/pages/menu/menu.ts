import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Nav, MenuController, LocalStorage, Storage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from '../home/home';
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";
import { AngularFire, FirebaseListObservable  } from 'angularfire2';




@Component({
  templateUrl: "build/pages/menu/menu.html"
})

export class MenuPage {
  CurrentUser
  rootPage: any = HomePage;
  storage: Storage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: String, component: any }>;
  constructor(private menu: MenuController ,private af: AngularFire) {
    
     var key = window.localStorage.getItem('saveToken')     
     var firebaseRefrence = this.af.database.object(`/users/${key}`)
    
    // this.storage = new Storage(LocalStorage);
   
    
    this.pages = [
      { title: "Profile", component: ProfilePage },
      { title: "Post", component: HomePage },
      { title: "Logout", component: "" }
    ]
    
    
    firebaseRefrence.subscribe((data)=>{
      this.CurrentUser = data 
      // console.log("HHHHHHHHHHHHHHHHHHHH. : ", this.CurrentUser);
      
    })
    
    
    
  }


  openPage(page) {
    if (page.title == "Logout") {
      this.storage.remove("user");
      this.storage.remove("userKey");
      this.nav.setRoot(LoginPage);
    }
    else {
      this.nav.setRoot(page.component, {
        animate: true
      });
    }
    this.menu.close();
  }
}


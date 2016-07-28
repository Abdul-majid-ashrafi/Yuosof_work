import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from "./pages/login/login";
import {MenuPage} from "./pages/menu/menu";
import {SignupPage} from "./pages/signup/signup";
import {User} from "./providers/user";
import {Credentials} from "./providers/userCredentials";
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';


@Component({
    templateUrl: "build/app.html"
})
class MyApp {
    rootPage: any;
    pages: Array<{ title: String, component: any }>;
    @ViewChild(Nav) nav: Nav;
    constructor(platform: Platform, credentials: Credentials) {
        platform.ready().then(() => {

            if (localStorage["saveToken"] != undefined) {
                this.rootPage = MenuPage;
            }
            else {
                this.rootPage = LoginPage;
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp, [
    FIREBASE_PROVIDERS, Credentials,
    // Initialize Firebase app  
    defaultFirebase({
        apiKey: "AIzaSyArEv-G1I3BR9z7K4Sjpjmr92Z8Ge2REB4",
        authDomain: "facebooklogen.firebaseapp.com",
        databaseURL: "https://facebooklogen.firebaseio.com",
        storageBucket: "project-8907647471000011657.appspot.com",
    }),
    firebaseAuthConfig({
        provider: AuthProviders.Password,
        method: AuthMethods.Password
    })
]);

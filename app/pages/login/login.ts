import {Page, NavController, MenuController, Alert, Loading, LocalStorage, Storage} from "ionic-angular";
import {ViewChild} from "@angular/core";
import {HomePage} from "../home/home";
import {MenuPage} from "../menu/menu";
import {SignupPage} from "../signup/signup";
import {User} from "../../providers/User";
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import {Credentials} from "../../providers/userCredentials";
// import User = require("../providers/user");


@Page({
    templateUrl: "build/pages/login/login.html"
})

export class LoginPage {
    user;
    alert;
    password;
    email;
    authForm;
    // loading: any;
    first: boolean = true;
    storage: Storage;
    newUser: FirebaseListObservable<any>;
    constructor(private nav: NavController, private af: AngularFire) {
        this.user = new User();
        this.storage = new Storage(LocalStorage);

    }

    login(user) {
                //  this.nav.setRoot(MenuPage)

        this.af.auth.login({
            email: this.user.email,
            password: this.user.password
        })
            .then(data => {
                // console.log("data : ", data)
                 this.storage.set("saveToken",data.uid)
                 this.nav.setRoot(MenuPage)
            })
            .catch((err) => {
                console.log("error", err);
            })
    }
    
    createAcc() {
        this.nav.push(SignupPage, {
            animate: true
        })
    }









}
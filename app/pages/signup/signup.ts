import {Page, NavController} from "ionic-angular";
import {User} from "../../providers/User";
import { AngularFire, FirebaseListObservable  ,FirebaseObjectObservable} from 'angularfire2';
import {LoginPage} from "../login/login";

@Page({
    templateUrl: "build/pages/signup/signup.html"
})

export class SignupPage {
    username;
    password;
    email;
    authForm
    user: User;
    constructor(private nav: NavController, public af: AngularFire) {
        this.user = new User();
    }


    Signup() {
        
     this.af.auth.createUser({
      email: this.user.email,
      password: this.user.password
    })
    
      .then((data) => {
             let profile = this.af.database.object(`/users/${data.uid}`)             
            profile.set(this.user)
        this.nav.push(LoginPage)
      })
      .catch((err) => {
          console.log("error",err);
      })
        
    }
    
     createAcc() {
        this.nav.push(LoginPage, {
            animate: true
        })
    }

}
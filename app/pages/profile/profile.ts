import {Page, NavController, Modal} from "ionic-angular";
import {User} from "../../providers/User"
import {Settings} from "../../modals/settings"
import { AngularFire  } from 'angularfire2';

@Page({
    templateUrl: "build/pages/profile/profile.html",
    // providers: [FirebaseService]
})

export class ProfilePage {
    user: any;
    CurrentUser
    firebaseRefrence
    constructor(private nav: NavController, private af: AngularFire) {
        var key = window.localStorage.getItem('saveToken')        
        this.firebaseRefrence = this.af.database.object(`/users/${key}`)

        this.firebaseRefrence.subscribe((data) => {            
            // this.user = data.val()[Object.keys(data.val())[0]]
            this.user = data
            // console.log(data);

        })
        
    }




    Update() {        
        delete this.user.$key;
        
this.firebaseRefrence.update(this.user)
        // console.log("Get Data: ", this.user);


    }




}
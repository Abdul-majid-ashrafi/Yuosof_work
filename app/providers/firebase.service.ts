import {Injectable} from "@angular/core";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class FirebaseService {
    refUser
    ref: any;
    // config = {
    //     apiKey: "AIzaSyAbtXcv3nTDKalkqv2TBDgPvqmQIObFJjo",
    //     authDomain: "firstapp-2e4fc.firebaseapp.com",
    //     databaseURL: "https://firstapp-2e4fc.firebaseio.com",
    //     storageBucket: "firstapp-2e4fc.appspot.com",
    // };
    constructor(private af: AngularFire) {
        // firebase.initializeApp(this.config);
        this.ref = firebase.database().ref();
        this.refUser = this.ref.child("users");
    }



    getRefUsers() {
        return this.refUser;
    }
    updateUser(user, key) {
        const itemObservable = this.af.database.object("/users/" + key);
        itemObservable.update(user);
    }


}
import {Injectable} from "@angular/core";
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

@Injectable()
export class Credentials {

    newUser;
    constructor(private af: AngularFire) {
        this.newUser = this.af.database.list("/users");
    }
    login(user) {
        return new Promise((resolve, reject) => {
            this.newUser.subscribe(snapshots => {
                let arrayLenght: number;
                let isAvailable: boolean = false;
                console.log("snapshots.length", snapshots.length);
                arrayLenght = snapshots.length;
                snapshots.forEach((snapshot, index) => {
                    console.log(index);
                    console.log("snapshot", snapshot);

                    if (user.email == snapshot.email) {
                        if (user.password == snapshot.password) {
                            // this.dismissLoading();
                            isAvailable = true;
                            console.log(snapshot.$key);
                            let key = snapshot.$key;
                            delete snapshot.$key;
                            resolve({ isAvailable: isAvailable, status: 1, key: key, user: snapshot }) // user correct
                            // this.nav.setRoot(HomePage);
                        }
                        else {
                            resolve({ isAvailable: isAvailable, status: 2 });
                            // this.doAlert("Incorrect Password");
                        }
                    }
                    else {
                        if (index + 1 == arrayLenght && !isAvailable) {
                            // this.dismissLoading();
                            // this.doAlert("email does not exists");
                            reject({ isAvailable: isAvailable, status: 0 });
                        }
                    }
                });

            })
        })
        // let user = JSON.parse(localStorage.getItem("user"));

    }
}
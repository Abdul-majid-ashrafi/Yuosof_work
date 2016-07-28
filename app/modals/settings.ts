import {Component} from '@angular/core';
import {Modal, NavController, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {User} from "../providers/User";
import {Camera} from "ionic-native";
import {FirebaseService} from "../providers/firebase.service"
@Component({
    templateUrl: "./build/modals/settings.html",
    providers: [FirebaseService]
})
export class Settings {
    storage: Storage
    user: User;
    userImage;
    key: String;
    imageChange: boolean = false;;
    options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    constructor(
        private viewCtrl: ViewController, private firebaseService: FirebaseService) {

        this.storage = new Storage(LocalStorage);
        this.storage.get("user").then(user => {
            this.user = JSON.parse(user);
            console.log(this.user)
        });
        this.storage.get("userKey").then(key => {
            this.key = key;
        });
    }

    close() {
        this.viewCtrl.dismiss();
    }


    uploadPicture() {
        Camera.getPicture(this.options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.imageChange = true;
            this.userImage = "data:image/jpeg;base64," + imageData;
            // this.user.image = imageData;
        }, (err) => {
            console.log("err", err);
        });
    }


    updateProfile() {
        if (this.imageChange) {
            var storageRef = firebase.storage().ref();
            var blob = new Blob([this.user.image]);
            var uploadTask = storageRef.child('images/image.png').put(blob);
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
                console.log(snapshot);

            }, function (error) {
                // Handle unsuccessful uploads
                console.log(error);

            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                console.log(uploadTask.snapshot);

                this.user.image = (uploadTask.snapshot.downloadURL).toString();
                this.firebaseService.updateUser(this.user, this.key);

            });
        }
        else {
            this.firebaseService.updateUser(this.user, this.key);
        }


        console.log("updateCalled");
    }
}
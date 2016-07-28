import {Component} from '@angular/core';
import {Modal, NavController, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {User} from "../../providers/User";
import {Camera} from "ionic-native";

@Component({
    templateUrl: "./build/modals/addItem/addItem.html"
})

export class AddItemModal {

    imageChange;
    userImage;
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
    constructor(private viewCtrl: ViewController) {

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


    addItem() {
        
    }

}
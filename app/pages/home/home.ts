import {Component} from "@angular/core";
import {NavController, Modal, ActionSheet} from 'ionic-angular';
import {AddItemModal} from "../../modals/addItem/addItem";
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { Camera } from 'ionic-native';
import {User} from "../../providers/User"

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  user: User
  firebaseRefrence
  getPost
  userData
  constructor(private _navController: NavController, private af: AngularFire) {
    this.user = new User();
    var key = window.localStorage.getItem('saveToken')

    this.af.database.object(`/users/${key}`)
      .subscribe((data) => {
        this.userData = data
      })
    this.firebaseRefrence = this.af.database.list(`/user_Post/${key}`)
    this.firebaseRefrence.subscribe((data) => {
      this.getPost = data
      console.log(this.getPost);
      
    })
  }

  addPost() {

    this.firebaseRefrence.push(this.user)
    delete this.userData.$key;
    this.getPost.forEach((val, i) => {
      if (this.getPost.length - 1 === i) {
 
        let postId = this.af.database.list(`/posts/${val.$key}`);
               

        postId.push(this.userData)
      }
    })


  }
}

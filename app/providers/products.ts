import {Injectable} from "@angular/core";
import { AngularFire, FirebaseListObservable  } from 'angularfire2';


@Injectable()
export class Products {
    products
    constructor(private af: AngularFire) {
        this.products = this.af.database.list("/users");
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';


@Component({
  selector: 'app-lab-results',
  templateUrl: './lab-results.component.html',
  styleUrls: ['./lab-results.component.css']
})
export class LabResultsComponent implements OnInit, OnDestroy {

  resultsURL?: Observable<string | null>;
  uid: any;
  private _sub?: Subscription;

  constructor(private _router: Router, private _storage: AngularFireStorage, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.uid = this._authService.getFirestoreUser()?.uid
  }

  ngOnInit(): void {
    const ref = this._storage.ref(this._usersService.user.file)
    this.resultsURL = ref.getDownloadURL();
    this._sub = this.resultsURL?.subscribe((url) => {
      window.open(url!, "_blank");
    });
  }

  ngOnDestroy() {
    if (this._sub)
      this._sub.unsubscribe();
  }

  onReturn(): void {
    this._router.navigate(['profiles', this.uid])
  }
}

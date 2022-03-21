import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { Location } from '@angular/common';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';
import { KitRegistrationsService } from 'src/app/shared/kit-registrations.service';
import { DataService, PRODUCTS } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit, OnDestroy {
  public user?: User;
  public uid?: string;
  public displayName: string = '';
  public isAdmin: boolean = false;

  public email: string = "";
  public photoURL?: string = "";
  public emailVerified: any;
  public labOrders: any[] = [];
  public kitRegistrations: any[] = [];

  public diagDisplay = "none";
  public toggleDisplay = false;
  public emailVerificationMessage?: string;

  private _msub?: Subscription;
  private _lsub?: Subscription;
  private _nsub?: Subscription;
  private _psub?: Subscription;
  private _sub?: Subscription;
  private _adminSubscription?: Subscription;
  private _userSubscription?: Subscription;
  public production: boolean;
  public fu: any;


  constructor(private _kitRegistrationsService: KitRegistrationsService, private _router: Router, private _authService: NotchAuthService, private _usersService: UsersService, private location: Location, private _labOrderService: LabOrdersService, private _dataService: DataService) {
    this.production = environment.production;
    try {
      this.fu = this._authService.getFirestoreUser();
      this.uid = this._authService.getFirestoreUser()?.uid;
      this.emailVerified = this._authService.getFirestoreUser()?.emailVerified;
    } catch (error) {
      console.error(error);
      this._router.navigate(['error'])
    }
  }



  ngOnInit(): void {
    this.user = this._usersService.user;
    this._userSubscription = this._usersService.userSubject.subscribe((user: User) => {
      this.user = user;
    });

    this.initScreenVariables();
    this.isAdmin = this._usersService.admin;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    })

    this.setLabOrders();
    this.setKitRegistrations();

  }

  ngOnDestroy() {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._psub)
      this._psub.unsubscribe();

    if (this._lsub)
      this._lsub.unsubscribe();
    if (this._msub)
      this._msub.unsubscribe();
    if (this._nsub)
      this._nsub.unsubscribe();


    if (this._sub)
      this._sub.unsubscribe();

    if (this._userSubscription)
      this._userSubscription.unsubscribe();

  }

  private setKitRegistrations(): void {
    this.kitRegistrations = [];
    this._kitRegistrationsService.kitRegistrationsByProfile(this.uid!);
    this._psub = this._kitRegistrationsService.items?.pipe(take(1)).subscribe((kos) => {
      this.kitRegistrations = kos;
    })
  }


  private setLabOrders(): void {
    this.labOrders = [];
    this._labOrderService.labOrderByProfile(this.uid);
    this._lsub = this._labOrderService.items?.pipe(take(1)).subscribe((los) => {
      los.forEach((item) => {
        this.labOrders.push(item);
      })
    });

    this.setLabOrdersByEmail();
  }

  private setLabOrdersByEmail(): void {
    const email = (this._authService.getFirestoreUser() && this._authService.getFirestoreUser()?.email) ? this._authService.getFirestoreUser()?.email : null;
    if (!this.production)
      console.log("setLabOrdersByEmail", email)
    if (email) {
      this._labOrderService.labOrderByEmail(email);
      this._nsub = this._labOrderService.secondaryItems?.pipe(take(1)).subscribe((los) => {
        if (!this.production)
          console.log("Found Some", email, los)
        los.forEach((lo) => {
          if (!this.isAlreadyThere(lo))
            this.labOrders.push(lo);
        })
      })
    }
  }

  private isAlreadyThere(lo: any): boolean {
    for (let index = 0; index < this.labOrders.length; index++) {
      const element = this.labOrders[index];
      if (element._id == lo._id) {
        return true;
      }
    }
    return false;
  }

  onLabOrderClick(fileName: string): void {
    this._usersService.user.file = fileName;
    this._router.navigate(['lab-results']);
  }

  onLabOrderResultsClick(fileName: string): void {
    if (!this.production)
      console.log("File is", fileName);
    this._usersService.user.file = fileName;
    this._router.navigate(['lab-order-results']);
  }

  onLabResultsClick(): void {
    this._router.navigate(['lab-results']);
  }


  initScreenVariables(): void {
    this.email = this._authService.getFirestoreUser()?.email!;
    this.photoURL = this._authService.getFirestoreUser()?.photoURL!;
    this.displayName = this._authService.getFirestoreUser()?.displayName!;
  }


  onProfile(): void {
    this._router.navigate(['profiles', this.uid!, 'edit'])
  }

  onName(): void {
    this._router.navigate(['name-edit'])
  }

  onAddress(): void {
    this._router.navigate(['address-edit'])
  }

  onDob(): void {
    this._router.navigate(['dob-edit'])
  }

  onGender(): void {
    this._router.navigate(['gender-edit'])
  }

  onPhone(): void {
    this._router.navigate(['phone-edit'])
  }


  onChangePassword(): void {
    this._router.navigate(['change-password'])
  }

  onAvatar(): void {
    this._router.navigate(['avatar-edit'])
  }

  onLoginEdit(): void {
    this._router.navigate(['login-edit'])
  }

  signOut(): void {
    this._router.navigate(['sign-out'])
  }

  onReorder(id: any): void {
    this._dataService.itemDoc(PRODUCTS, id);
    this._sub = this._dataService.item?.subscribe((product: any) => {
      if (product.handle) {
        window.open("https://notch.health/products/" + product.handle, "_blank");
      }
    })
  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }


}

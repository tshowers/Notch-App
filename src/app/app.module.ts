import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { environment as env } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileDisplayComponent } from './profile/profile-display/profile-display.component';
import { RegistrationSummaryComponent } from './register/registration-summary/registration-summary.component';
import { NotFoundComponent } from './website/not-found/not-found.component';
import { ThankYouComponent } from './website/thank-you/thank-you.component';
import { SignOutComponent } from './login/sign-out/sign-out.component';
import { KitRegistrationComponent } from './register/kit-registration/kit-registration.component';

import { AccountLoginErrorComponent } from './register/account-login-error/account-login-error.component';
import { KitNumberNotFoundComponent } from './register/kit-number-not-found/kit-number-not-found.component';
import { ErrorFoundComponent } from './website/error-found/error-found.component';
import { LabResultsComponent } from './profile/lab-results/lab-results.component';
import { LabOrderResultsComponent } from './profile/lab-order-results/lab-order-results.component';
import { TestKitDataCorrectionComponent } from './register/test-kit-data-correction/test-kit-data-correction.component';

import { OrdersService } from './shared/orders.service';
import { LabOrdersService } from './shared/lab-orders.service';
import { NotchAuthService } from './shared/notch-auth.service';
import { FirestoreService } from './shared/firestore.service';
import { DataService } from './shared/data.service';
import { IpService } from './shared/ip.service';
import { KitRegistrationsService } from './shared/kit-registrations.service';
import { CustomersService } from './shared/customers.service';
import { UsersService } from './shared/users.service';
import { ReportsService } from './shared/reports.service';

import { NameEditComponent } from './profile/name-edit/name-edit.component';
import { AddressEditComponent } from './profile/address-edit/address-edit.component';
import { DobEditComponent } from './profile/dob-edit/dob-edit.component';
import { GenderEditComponent } from './profile/gender-edit/gender-edit.component';
import { PhoneEditComponent } from './profile/phone-edit/phone-edit.component';
import { ConstructionComponent } from './website/construction/construction.component';
import { CheckYourEmailComponent } from './register/check-your-email/check-your-email.component';
import { EmailCheckComponent } from './login/email-check/email-check.component';
import { LoginComponent } from './login/login/login.component';
import { EmailKitCheckComponent } from './login/email-kit-check/email-kit-check.component';
import { EssentialFoodComponent } from './profile/lab-results/essential-food/essential-food.component';
import { CompleteFoodComponent } from './profile/lab-results/complete-food/complete-food.component';
import { AirborneAllergensComponent } from './profile/lab-results/airborne-allergens/airborne-allergens.component';
import { VegetarianFoodComponent } from './profile/lab-results/vegetarian-food/vegetarian-food.component';
import { CovidNineteenComponent } from './profile/lab-results/covid-nineteen/covid-nineteen.component';
import { AsianFoodComponent } from './profile/lab-results/asian-food/asian-food.component';
import { ExpandedFoodComponent } from './profile/lab-results/expanded-food/expanded-food.component';
import { JapaneseFoodComponent } from './profile/lab-results/japanese-food/japanese-food.component';
import { MexicanFoodComponent } from './profile/lab-results/mexican-food/mexican-food.component';
import { VitaminDComponent } from './profile/lab-results/vitamin-d/vitamin-d.component';
import { AntibodyAssessmentComponent } from './profile/lab-results/antibody-assessment/antibody-assessment.component';
import { DietTemplateComponent } from './profile/lab-results/diet-template/diet-template.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileEditComponent,
    ProfileDisplayComponent,
    RegistrationSummaryComponent,
    NotFoundComponent,
    ThankYouComponent,
    SignOutComponent,
    KitRegistrationComponent,
    AccountLoginErrorComponent,
    KitNumberNotFoundComponent,
    ErrorFoundComponent,
    LabResultsComponent,
    TestKitDataCorrectionComponent,
    LabOrderResultsComponent,
    NameEditComponent,
    AddressEditComponent,
    DobEditComponent,
    GenderEditComponent,
    PhoneEditComponent,
    ConstructionComponent,
    CheckYourEmailComponent,
    EmailCheckComponent,
    LoginComponent,
    EmailKitCheckComponent,
    EssentialFoodComponent,
    CompleteFoodComponent,
    AirborneAllergensComponent,
    VegetarianFoodComponent,
    CovidNineteenComponent,
    AsianFoodComponent,
    ExpandedFoodComponent,
    JapaneseFoodComponent,
    MexicanFoodComponent,
    VitaminDComponent,
    AntibodyAssessmentComponent,
    DietTemplateComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(env.firebaseConfig),
    AngularFirestoreModule,
    SharedModule,
  ],
  providers: [ReportsService, OrdersService, LabOrdersService, NotchAuthService, FirestoreService, DataService, KitRegistrationsService, IpService, CustomersService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

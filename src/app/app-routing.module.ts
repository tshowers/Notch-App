import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotchAuthGuard } from './shared/notch-auth.guard';

import { ProfileDisplayComponent } from './profile/profile-display/profile-display.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { RegistrationSummaryComponent } from './register/registration-summary/registration-summary.component';
import { LabResultsComponent } from './profile/lab-results/lab-results.component';
import { LabOrderResultsComponent } from './profile/lab-order-results/lab-order-results.component';
import { KitRegistrationComponent } from './register/kit-registration/kit-registration.component';
import { AccountLoginErrorComponent } from './register/account-login-error/account-login-error.component'
import { KitNumberNotFoundComponent } from './register/kit-number-not-found/kit-number-not-found.component';
import { TestKitDataCorrectionComponent } from './register/test-kit-data-correction/test-kit-data-correction.component';
import { CheckYourEmailComponent } from './register/check-your-email/check-your-email.component';
import { NotFoundComponent } from './website/not-found/not-found.component';
import { ThankYouComponent } from './website/thank-you/thank-you.component';

import { SignOutComponent } from './login/sign-out/sign-out.component';
import { ErrorFoundComponent } from './website/error-found/error-found.component';
import { NameEditComponent } from './profile/name-edit/name-edit.component';
import { AddressEditComponent } from './profile/address-edit/address-edit.component';
import { DobEditComponent } from './profile/dob-edit/dob-edit.component';
import { GenderEditComponent } from './profile/gender-edit/gender-edit.component';
import { PhoneEditComponent } from './profile/phone-edit/phone-edit.component';
import { ConstructionComponent } from './website/construction/construction.component';
import { EmailCheckComponent } from './login/email-check/email-check.component';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  { path: '', component: KitRegistrationComponent, data: { animationState: 'KitRegistrationComponent', title: 'Register Kit' } },

  { path: 'verify', component: LoginComponent, data: { animationState: 'LoginComponent', title: 'Identity Verification' } },
  { path: 'under-construction', component: ConstructionComponent, data: { title: 'Under Construction' } },
  { path: 'check-your-email', component: CheckYourEmailComponent, data: { animationState: 'CheckYourEmailComponent', title: 'Check Your Email' } },
  { path: 'email-check', component: EmailCheckComponent, data: { animationState: 'EmailCheckComponent', title: 'Email Check' } },
  { path: 'lab-results', component: LabResultsComponent, canActivate: [NotchAuthGuard], data: { title: 'Lab Results' } },
  { path: 'lab-order-results', component: LabOrderResultsComponent, canActivate: [NotchAuthGuard], data: { title: 'Lab Order Results' } },
  { path: 'summary', component: RegistrationSummaryComponent, canActivate: [NotchAuthGuard], data: { animationState: 'RegistrationSummaryComponent', title: 'Summary' } },
  { path: 'profiles/:id1', component: ProfileDisplayComponent, canActivate: [NotchAuthGuard], data: { animationState: 'ProfileDisplayComponent', title: 'Profile' } },
  { path: 'profiles/:id1/edit', component: ProfileEditComponent, canActivate: [NotchAuthGuard], data: { animationState: 'ProfileEditComponent', title: 'Edit Profile' } },
  { path: 'test-kit-registration-correction', component: TestKitDataCorrectionComponent, canActivate: [NotchAuthGuard], data: { animationState: 'TestKitDataCorrectionComponent', title: 'Kit Registration Correction' } },

  { path: 'name-edit', component: NameEditComponent, canActivate: [NotchAuthGuard], data: { animationState: 'NameEditComponent', title: 'Name Edit' } },
  { path: 'address-edit', component: AddressEditComponent, canActivate: [NotchAuthGuard], data: {animationState: 'AddressEditComponent', title: 'Address Edit' } },
  { path: 'dob-edit', component: DobEditComponent, canActivate: [NotchAuthGuard], data: {animationState: 'DobEditComponent', title: 'Date of Birth Edit' } },
  { path: 'gender-edit', component: GenderEditComponent, canActivate: [NotchAuthGuard], data: {animationState: 'GenderEditComponent', title: 'Gender Edit' } },
  { path: 'phone-edit', component: PhoneEditComponent, canActivate: [NotchAuthGuard], data: {animationState: 'PhoneEditComponent', title: 'Phone Edit' } },

  { path: 'login-error', component: AccountLoginErrorComponent, data: {animationState: 'AccountLoginErrorComponent', title: 'Login Error' } },
  { path: 'kit-number-not-found', component: KitNumberNotFoundComponent, data: {animationState: 'KitNumberNotFoundComponent', title: 'Kit Number Not Found - Error' } },
  { path: 'error', component: ErrorFoundComponent, data: {animationState: 'ErrorFoundComponent', title: 'Error' } },


  { path: 'sign-out', component: SignOutComponent, data: {animationState: 'SignOutComponent', title: 'Signed Out' } },
  { path: 'thank-you', component: ThankYouComponent, canActivate: [NotchAuthGuard], data: {animationState: 'ThankYouComponent', title: 'Thank You!' } },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canLoad: [NotchAuthGuard] },
  { path: 'admin', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/invalid-orders', loadChildren: () => import('./invalid-orders/invalid-orders.module').then(m => m.InvalidOrdersModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/lab-orders', loadChildren: () => import('./lab-orders/lab-orders.module').then(m => m.LabOrdersModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/test-kit-orders', loadChildren: () => import('./test-kits/test-kits.module').then(m => m.TestKitsModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/kit-activations', loadChildren: () => import('./kit-registrations/kit-registrations.module').then(m => m.KitRegistrationsModule), canLoad: [NotchAuthGuard] },
  { path: 'admin/users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canLoad: [NotchAuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canLoad: [NotchAuthGuard] },

  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

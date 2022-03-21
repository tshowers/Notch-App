import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

export const SETTINGS = '/settings';
export const MARKETING = '/marketing';
export const ADMIN = '/admin';
export const WIDGET_FEED = 'widget-feed';
export const WIDGET_LIST_BADGES = 'widget-list-badges';
export const WIDGET_LIST_ORDER = 'widget-list-order';
export const WIDGET_PRODUCT = 'widget-product';
export const WIDGET_STATS12 = 'widget-stats12';
export const WIDGET_STATS13 = 'widget-stats13';
export const WIDGET_STATS14 = 'widget-stats14';
export const WIDGET_STATS15 = 'widget-stats15';
export const WIDGET_STATS16 = 'widget-stats16';
export const WIDGET_TABLE_DATA = 'widget-table-data';
export const WIDGET_TOTALS = 'widget-totals';
export const WIDGET_DISPLAY_NAME = 'widget-display-name';
export const WIDGET_PROVIDERS = 'widget-providers';
export const WIDGET_VIEW_LIST_COMBO = 'widget-view-list-combo';
export const WIDGET_PAYMENT_GATEWAY = 'widget-payment-gateway';
export const WIDGET_LOGO = 'widget-logo';

export const ABOUT_PRODUCT1 = 'about_product1';
export const ABOUT_PRODUCT2 = 'about_product2';

export const CART = 'cart';
export const CATALOG1 = 'catalog1'
export const CONTACT_US1 = 'contact-us1';
export const FAQ1 = 'faq1';
export const FAQ2 = 'faq2';
export const FAQ3 = 'faq3';
export const FEATURE1 = 'feature1';
export const FEATURE2 = 'feature2';
export const FOOTER1 = 'footer1';
export const HOW_TO = 'how-to';
export const VIDEO1 = 'video1';
export const VIDEO2 = 'video2';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _isSetting: boolean = false;

  public production: boolean;

  public settings: Settings = {
    name: 'No Name',
    logo: 'https://via.placeholder.com/150',
    aboutProduct1: null,
    payment: false,
    testMode: true,
    facebookProvider: true,
    yahooProvider: true,
    googleProvider: true,
    appleProvider: false,
    twitterProvider: true,
    carousel: false,
    productCatalog1: false,
    productCatalog2: false,
    marketingAboutProduct1: false,
    marketingAboutProduct2: false,
    marketingFAQ1: false,
    marketingFAQ2: false,
    marketingFAQ3: false,
    marketingFeatures1: false,
    marketingFeatures2: false,
    marketingIntegration1: false,
    marketingIntegration2: false,
    marketingContactUs: false,
    marketingLatestPost1: false,
    marketingLatestPost2: false,
    marketingReviews1: false,
    marketingReviews2: false,
    marketingReviews3: false,
    marketingVideo1: false,
    marketingVideo2: false,
    shoppingCart: false,
    footer1: false,
    howto1: false,
    _id: ''
  };


  constructor(private _firestore: AngularFirestore) {
    this.production = environment.production;
    const settingsDocs: AngularFirestoreCollection = this._firestore.collection('settings');
    const settingsCol: Observable<any[]> = settingsDocs.valueChanges({ idField: '_id' });
    settingsCol.subscribe((data: Settings[]) => {
      if (data && data.length > 0) {
        this.settings = data[0];
        this._isSetting = true;
      }
    })
  }

  private createSetting(): void {
    if (!this.production)
      console.log("CREATE SETTING");

    this._firestore.collection(SETTINGS).add(this.settings)
  }

  public updateSetting(): void {
    if (!this.production)
      console.log("UPDATE SETTING");

    if (this._isSetting)
      this._firestore.collection(SETTINGS).doc(this.settings._id).set(this.settings, { merge: true });
    else
      this.createSetting();
  }

  public updateSubSetting(SubSetting: string, item: string, data: any): void {
    if (!this.production)
      console.log("UPDATE SUB SETTING", SETTINGS + '/' + this.settings._id + SubSetting);

    this._firestore.collection(SETTINGS + '/' + this.settings._id + SubSetting).doc(item).set(data, { merge: true });
  }

  public getSubSetting(SubSetting: string, item: string) {
    if (!this.production)
      console.log("GETTING SUB SETTING", SETTINGS + '/' + this.settings._id + SubSetting + '/' + item);

    return this._firestore.doc(SETTINGS + '/' + this.settings._id + SubSetting + '/' + item).get();
  }


}

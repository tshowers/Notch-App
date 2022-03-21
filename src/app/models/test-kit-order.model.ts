export class TestKitOrder {
    
  public id?: string = '';
  public user_id?: string = '';
  public order_id?: string = '';
  public customer_id?: string = '';
  public pract_id?: string = '';
  public order_date?: any;
  public order_taker?: string = '';
  public requester?: string = '';
  public process?: string = '';
  public loc_pos?: string = '';
  public clinic_name?: string = '';
  public address1?:string = '';
  public address2?: string = '';
  public city?: string = '';
  public state?: string = '';
  public other_state?: string = '';
  public zip?: string = '';
  public country?: string = '';
  public req_loc?: string = '';
  public shipping_method?: string = '';
  public tracking_num?: string = '';
  public processing_status?: string = '';
  public status?: string = '';
  public comment?: string = '';
  public kit_id?: string = '';
  public testKitRigistration?: TestKitRegistration;
}

export interface TestKitRegistration {
  emailToSendResults: string;
  gender: string;
  shopifyOrderNumber: string;
  kitNumber: string;
  email: any;
  timeCollected: any;
  dateCollected: any;
  dob: string;
  status: any;
  orders: any;
  customer_id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phoneNumber: string;
  displayName: any;
  textNotification: boolean;
  emailNotification: boolean;
  uid: any;
  _id: any;
}
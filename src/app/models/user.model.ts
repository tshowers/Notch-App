export class User {
    uid?: string;
    order_id?: string = "";
    email?: string = "";
    emailToSendResults?: string = "";
    displayName?: string = "";
    photoURL?: string = "";
    phoneNumber?: string = "";
    gender?: string = "";
    emailVerified?: boolean = false;
    shopifyOrderNumber?: string = "";
    customer_id?: string = "";
    hasAccount?: boolean = true;
    address1?: string = "";
    address2?: string = "";
    city?: string = "";
    province?: string = "";
    zip?: string = "";
    county?: string = "";
    country?: string = "";
    timeCollected?: any;
    dateCollected?: any;
    firstName?: string = "";
    lastName?: string = "";
    dob?: string = "";
    lastLoginAt?: string = "";
    file: any;
    roles: any;
    testKitRegistration?: any;
}

export interface Note {
    text: string;
    updated_at?: any;
    updated_by?: any;
}
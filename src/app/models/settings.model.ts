
export interface Settings {
    name: string;
    logo: string;
    payment: boolean;
    testMode: boolean;
    facebookProvider: boolean;
    yahooProvider: boolean;
    googleProvider: boolean;
    appleProvider: boolean;
    twitterProvider: boolean;
    carousel: boolean;
    productCatalog1: boolean;
    productCatalog2: boolean;
    marketingAboutProduct1: boolean;
    aboutProduct1: any;
    marketingAboutProduct2: boolean;
    marketingFAQ1: boolean;
    marketingFAQ2: boolean;
    marketingFAQ3: boolean;
    marketingFeatures1: boolean;
    marketingFeatures2: boolean;
    marketingIntegration1: boolean;
    marketingIntegration2: boolean;
    marketingContactUs: boolean;
    marketingLatestPost1: boolean;
    marketingLatestPost2: boolean;
    marketingReviews1: boolean;
    marketingReviews2: boolean;
    marketingReviews3: boolean;
    marketingVideo1: boolean;
    marketingVideo2: boolean;
    shoppingCart: boolean;
    footer1: boolean;
    howto1: boolean;
    _id: string;
}

export interface AboutProduct1 {
    headerText: string;
    descriptionText: string;
    buttonText: string;
    buttonLink: string;
    featureBlockText1: string;
    featureBlockIcon1: string;
  
    featureBlockText2: string;
    featureBlockIcon2: string;
  
    featureBlockText3: string;
    featureBlockIcon3: string;
    featureBlockBadgeText3: any;
  
    featureBlockText4: string;
    featureBlockIcon4: string;
    featureBlockBadgeText4: any;
    _id: string;
}

export interface AboutProduct2 {
    imageURL1: string;
    imageURL2: string;
    headingText: string;
    descriptionText: string;
    bulletText1: string;
    bulletText2: string;
    bulletText3: string;
    buttonText: string;
    buttonLink: string;
    _id: string;
  
}



export interface Cart {
    _id: string;
    
}

export interface Catalog1 {
    _id: string;
    
}

export interface ContactUs1 {
    headingText: string;
    descriptionText: string;
    _id: string;
  
  
}

export interface Faq1 {
    headingText: string;
    descriptionText: string;
    faqHeading1: string;
    faqDescription1: string;
  
    faqHeading2: string;
    faqDescription2: string;
  
    faqHeading3: string;
    faqDescription3: string;
    _id: string;
  
}

export interface Faq2 {
    headingText: string;
    descriptionText: string;
    faqHeading1: string;
    faqDescription1: string;
  
    faqHeading2: string;
    faqDescription2: string;
  
    faqHeading3: string;
    faqDescription3: string;
  
    faqHeading4: string;
    faqDescription4: string;
    _id: string;
  
}

export interface Faq3 {
    headingText: string;
    descriptionText: string;
    imageURL: string;
  
    faqHeading1: string;
    faqDescription1: string;
  
    faqHeading2: string;
    faqDescription2: string;
  
    faqHeading3: string;
    faqDescription3: string;
    _id: string;
  
}

export interface Features1 {
    headingText: string;
    descriptionText: string;
  
    featureHeading1: string;
    featureDescription1: string;
    featureIcon1: string;
  
    featureHeading2: string;
    featureDescription2: string;
    featureIcon2: string;
  
    featureHeading3: string;
    featureDescription3: string;
    featureIcon3: string;
    _id: string;
  
}

export interface Features2 {
    headingText: string;
    descriptionText: string;
  
    featureHeading1: string;
    featureDescription1: string;
    featureIcon1: string;
  
    featureHeading2: string;
    featureDescription2: string;
    featureIcon2: string;
  
    featureHeading3: string;
    featureDescription3: string;
    featureIcon3: string;
    _id: string;
  
}



export interface Footer1 {
    headingText1: string;
    descriptionText: string;
    column1Heading: string;
    column1Text1: string;
    column1Text2: string;
    column1Text3: string;
    column1Text4: string;
    column1Text5: string;
    column1Button1Link: string;
    column1Button2Link: string;
    column1Button3Link: string;
    column1Button4Link: string;
    column1Button5Link: string;
  
    column2Heading: string;
    column2Text1: string;
    column2Text2: string;
    column2Text3: string;
    column2Text4: string;
    column2Text5: string;
    column2Button1Link: string;
    column2Button2Link: string;
    column2Button3Link: string;
    column2Button4Link: string;
    column2Button5Link: string;
  
    column3Heading: string;
    column3Text1: string;
    column3Text2: string;
    column3Text3: string;
    column3Text4 : string;
    column3Button1Link: string;
    column3Button2Link: string;
    column3Button3Link: string;
    column3Button4Link: string;
  
    footerText: string;
    router: any;
    _id: string;
  
}

export interface HowTo {
    headingText: string;
    descriptionText: string;
    header1: string;
    header2: string;
    header3: string;
  
    description1: string;
    description2: string;
    description3: string;
    _id: string;
  
}

export interface Video1 {
    headingText: string;
    descriptionText: string;
    videoURL: string;
    imageURL: string;
    _id: string;
  
}

export interface Video2 {
    headingText: string;
    descriptionText: string;
    videoURL: string;
    imageURL: string;
    _id: string;
  
}
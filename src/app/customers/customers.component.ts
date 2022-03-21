import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from '../shared/notch-auth.service';
import { Observable, Subscription } from 'rxjs';
import { IpService } from '../shared/ip.service';
import { LabOrdersService } from '../shared/lab-orders.service';
import { CustomersService } from '../shared/customers.service';
import { UsersService } from '../shared/users.service';
import { OrdersService } from '../shared/orders.service';
import { Chart } from 'chart.js';
import { environment } from '../../environments/environment';
import { DataService, LAB_ORDERS } from '../shared/data.service';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { KitRegistrationsService } from '../shared/kit-registrations.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  public isLoggedIn: boolean = false;
  public uid;
  public isAdmin: boolean = false;
  public production: boolean;
  private _adminSubscription?: Subscription;
  private _ipSubscription?: Subscription;
  private _dataSubscription?: Subscription;
  private _byAgeSubscription?: Subscription;
  private _kitRegistrationSubscription?: Subscription;

  private _ordersSubscription?: Subscription;
  private _usersSubscription?: Subscription;
  private _customersSubscription?: Subscription;

  public ipAddress?: string;
  public currentDataDisplay = '';
  public pastDataDisplay = 'none';
  public queryDateDisplay = "none"
  public data1: any;
  public data2: any;
  public data3: any;
  public labOrderHolding: any;
  public labOrderNeedAttention: any[] = [];

  public lo_new = 0;
  public lo_on_hold = 0;
  public lo_approved = 0;
  public lo_modified = 0;
  public lo_fully_rejected = 0;
  public lo_canceled = 0;
  public lo_testing_in_progress = 0;
  public lo_waiting_for_review = 0;
  public lo_tests_uploaded = 0;
  public lo_testing_complete = 0;
  public lo_printed = 0;
  public lo_reports_sent = 0;
  public lo_retest = 0;
  public lo_verified = 0;
  public lo_hold = 0;
  public lo_lab_order_received = 0;
  public lo_approved_by_doctor = 0;
  public lo_under_doctor_review = 0;
  public lo_uploaded = 0;
  public lo_registered = 0;
  public lo_results_delivered = 0;
  public lo_unknown = 0;

  orderHistory: any[] = [];

  private ctxStatus: any;
  ageLabels = ['18-30', '31-40', '41-50', '51-60', '61+'];
  ageDataSetLabel = "Ages";

  salesData = {
    "period1": {
      "total": 0,
      "subHeading": "1 Month",
      "chartData": [0],
    },
    "period2": {
      "total": 0,
      "subHeading": "3 Month",
      "chartData": [0],
    },
    "period3": {
      "total": 0,
      "subHeading": "6 Month",
      "chartData": [0],
    },
    "period4": {
      "total": 0,
      "subHeading": "1 Year",
      "chartData": [0],
    },
  };

  box = [
    {
      "boxHeading": "Orders",
      "boxIcon": "fa fa-shopping-cart",
      "label1": "Shopify Orders",
      "count1": 0,
      "label2": "Paid",
      "count2": 0,
      "label3": "Cancelled",
      "count3": 0,
      "label4": "$ Total",
      "count4": 0,
      "currency": true,
      "moreInfoLink": "/admin/orders"
    },
    {
      "boxHeading": "Lab Tests",
      "boxIcon": "fa fa-flask",
      "label1": "<39",
      "count1": 0,
      "label2": "40-49",
      "count2": 0,
      "label3": "50-59",
      "count3": 0,
      "label4": "60>",
      "count4": 0,
      "currency": false,
      "moreInfoLink": "/admin/lab-orders"
    },
    {
      "boxHeading": "Activations",
      "boxIcon": "fa fa-check-square-o",
      "label1": "Incomplete",
      "count1": 0,
      "label2": "Complete",
      "count2": 0,
      "label3": "Male",
      "count3": 0,
      "label4": "Female",
      "count4": 0,
      "currency": false,
      "moreInfoLink": "/admin/kit-activations"
    },
    {
      "boxHeading": "Shopify Customers",
      "boxIcon": "fa fa-users",
      "label1": "Total",
      "count1": 0,
      "label2": "Verified",
      "count2": 0,
      "label3": "Paying",
      "count3": 0,
      "label4": "Registered",
      "count4": 0,
      "currency": false,
      "moreInfoLink": "/admin/customers"
    }
  ]

  public labels1: any[] = [];
  public labels2: any[] = [];
  public labels3: any[] = [];

  private ctxa: any;
  chartLabels = ['Vitamin D', 'Complete', 'Essential', 'Airborne', 'Covid-19', 'Vegetarian', 'Asian', 'Mexican'];
  chartStatusLabels = ["Pending", "Activated", "Lab Order Received", "On Hold", "Approved", "Doctor Review", "Approved by Doctor", "Modified", "Testing in Progress", "Retest", "Waiting for Review", "Testing Complete", "Printed", "Verified", "All Tests Uploaded", "Hold", "Uploaded", "Reports Sent", "Results Delivered", "Cancelled", "Unknown", "Rejected"];
  dataSetLabel = "Paid Orders";
  borderColor = "#10b1dd";
  borderWidth: number = 1;
  responsive: boolean = true;

  public descriptionText = 'Total users are all customers who have established an account on Shopify. Paid users are all shopify customers who have a paid transaction. Activated users represent all users who have activated a kit.';

  public lab1 = 0;
  public lab2 = 0;
  public lab3 = 0;
  public lab4 = 0;
  public lab5 = 0;
  public lab6 = 0;
  public lab7 = 0;
  public lab8 = 0;

  chartData1: any[] = [
    this.lab1,
    this.lab2,
    this.lab3,
    this.lab4,
    this.lab5,
    this.lab6,
    this.lab7,
    this.lab8
  ];
  public totalLabOrders: number = 0;

  public queryDate: any;

  constructor(private _router: Router,
    private _authService: NotchAuthService,
    private _ipService: IpService,
    private _customersService: CustomersService,
    private _usersService: UsersService,
    private _ordersService: OrdersService,
    private _dataService: DataService,
    private _userService: UsersService,
    private _kitRegistrationService: KitRegistrationsService,
    private _labOrdersService: LabOrdersService) {
    this.production = environment.production;
    this.uid = this._authService.uid;
  }

  ngOnInit(): void {
    this.isLoggedIn = (this._authService.getFirestoreUser()) ? true : false;

    if (!this.isLoggedIn) {
      this._router.navigate(['verify']);
    } else {
      this.setAdmin();
      this.getIP();
      this.setLabOrderStats();
      this.setOrderStats();
      this.setCustomerStats();
      this.setUserStats();
      this.setActivations();
    }
  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
    if (this._ordersSubscription)
      this._ordersSubscription.unsubscribe();
    if (this._usersSubscription)
      this._usersSubscription.unsubscribe();
    if (this._customersSubscription)
      this._customersSubscription.unsubscribe();
    if (this._byAgeSubscription)
      this._byAgeSubscription.unsubscribe();
    if (this._kitRegistrationSubscription)
      this._kitRegistrationSubscription.unsubscribe();
  }



  countOrders(orders: any) {
    this.box[0].count1 = 0;
    this.box[0].count2 = 0;
    this.box[0].count3 = 0;

    // Total
    this.box[0].count1 = (orders && orders.length) ? orders.length : 0;


    // Paid
    this.box[0].count2 = orders.filter((order: any) => {
      return (order && order.financial_status && (order.financial_status.toLowerCase() == 'paid') && (order.current_total_price > 0.00))
    }).length;

    // Cancelled
    this.box[0].count3 = orders.filter((order: any) => {
      return (order && order.cancelled_at)
    }).length;
  }


  setAdmin(): void {
    this.isAdmin = this._userService.admin;
    this._adminSubscription = this._userService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    })
  }

  setActivations(): void {
    this._kitRegistrationService.getAll();
    this._kitRegistrationSubscription = this._kitRegistrationService.items?.subscribe((data) => {
      this.setActiviations(data);
    })
  }

  setLabOrderStats(): void {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);


    this._labOrdersService.labOrderByTimeStamp();
    this._dataSubscription = this._labOrdersService.items?.subscribe((data) => {
      this.data1 = data.filter(d => {
        var date = new Date(d.updated_at).toLocaleDateString();
        return (date == today.toLocaleDateString());
      });


      this.data2 = data.filter(e => {
        var date = new Date(e.updated_at).toLocaleDateString();
        return (date == yesterday.toLocaleDateString());
      })

      this.labOrderHolding = data;
    });

    this._dataService.getAll(LAB_ORDERS);
    this.labOrderStats();
  }


  labOrderByDate(): void {
    const qD = new Date(this.queryDate);
    qD.setDate(qD.getDate() + 1);
    this.data3 = null;

    this.data3 = this.labOrderHolding.filter((e: any) => {
      var date = new Date(e.updated_at).toLocaleDateString();
      if (!this.production)
      console.log("Compare Dates", date, qD.toLocaleDateString())
      return (date == qD.toLocaleDateString());
    });

    this.currentDataDisplay = 'none';
    this.pastDataDisplay = 'none';
    this.queryDateDisplay = '';

  }

  labOrderStats(): void {
    this._byAgeSubscription = this._dataService.items?.subscribe((data) => {
      this.setLabOrdersByAge(data);
      this.setLabOrdersByStatus(data);
      this.needAttention(data);
      this.initChart3();
    });
  }

  needAttention(data: any): void {
    let today = new Date();
    this.labOrderNeedAttention = [];
    data.forEach((labOrder: any) => {
      if (!(!labOrder['date-received'] || isNaN(labOrder['date-received']))) {
        let receivedDate = new Date(labOrder['date-received']);
        let daysDiff = this._labOrdersService.getDaysDiff(today.getTime(), receivedDate.getTime());

        if (daysDiff > 10 && (labOrder.status != 999) && (labOrder.status != 9) && (labOrder.status != 22) && (labOrder.status != '22') && (labOrder.status != 10) && (labOrder.status != '10') && (labOrder.status != 15) && (labOrder.status != '15')) {
          this.labOrderNeedAttention.push(labOrder);
        }
      }
    });
    this._dataService.sortByPatientLastName(this.labOrderNeedAttention);
  }

  setLabOrdersByStatus(data: any): void {
    this.totalLabOrders = data.length;
    this.lo_new = data.filter((labOrder: any) => { return ((labOrder.status === 0) || (labOrder.status === '0')) }).length;
    this.lo_on_hold = data.filter((labOrder: any) => { return ((labOrder.status === 1) || (labOrder.status === '1')) }).length;
    this.lo_approved = data.filter((labOrder: any) => { return ((labOrder.status === 2) || (labOrder.status === '2')) }).length;
    this.lo_modified = data.filter((labOrder: any) => { return ((labOrder.status === 7) || (labOrder.status === '7')) }).length;
    this.lo_fully_rejected = data.filter((labOrder: any) => { return ((labOrder.status === 9) || (labOrder.status === '9')) }).length;
    this.lo_canceled = data.filter((labOrder: any) => { return ((labOrder.status === 10) || (labOrder.status === '10')) }).length;
    this.lo_testing_in_progress = data.filter((labOrder: any) => { return ((labOrder.status === 11) || (labOrder.status === '11')) }).length;
    this.lo_waiting_for_review = data.filter((labOrder: any) => { return ((labOrder.status === 14) || (labOrder.status === '14')) }).length;
    this.lo_tests_uploaded = data.filter((labOrder: any) => { return ((labOrder.status === 15) || (labOrder.status === '15')) }).length;
    this.lo_testing_complete = data.filter((labOrder: any) => { return ((labOrder.status === 20) || (labOrder.status === '20')) }).length;
    this.lo_printed = data.filter((labOrder: any) => { return ((labOrder.status === 21) || (labOrder.status === '21')) }).length;
    this.lo_reports_sent = data.filter((labOrder: any) => { return ((labOrder.status === 22) || (labOrder.status === '22')) }).length;
    this.lo_retest = data.filter((labOrder: any) => { return ((labOrder.status === 16) || (labOrder.status === '16')) }).length;
    this.lo_verified = data.filter((labOrder: any) => { return ((labOrder.status === 50) || (labOrder.status === '50')) }).length;
    this.lo_hold = data.filter((labOrder: any) => { return ((labOrder.status === 68) || (labOrder.status === '68')) }).length;
    this.lo_lab_order_received = data.filter((labOrder: any) => { return ((labOrder.status === 85) || (labOrder.status === '85')) }).length;
    this.lo_uploaded = data.filter((labOrder: any) => { return ((labOrder.status === 86) || (labOrder.status === '86')) }).length;
    this.lo_registered = data.filter((labOrder: any) => { return ((labOrder.status === 998) || (labOrder.status === '998')) }).length;
    this.lo_results_delivered = data.filter((labOrder: any) => { return ((labOrder.status === 999) || (labOrder.status === '999')) }).length;
    this.lo_approved_by_doctor = data.filter((labOrder: any) => { return ((labOrder.status === 76) || (labOrder.status === '76')) }).length;
    this.lo_under_doctor_review = data.filter((labOrder: any) => { return ((labOrder.status === 72) || (labOrder.status === '72')) }).length;
    this.lo_unknown = data.filter((labOrder: any) => { return ((labOrder.status === 900) || (labOrder.status === '900')) }).length;
  }

  setOrderStats(): void {
    this._ordersService.getAll();
    this._ordersSubscription = this._ordersService.items?.subscribe((data) => {
      this.countOrders(data);
      this.initHistory();
      data.forEach((order) => {
        let date = new Date(order.created_at);
        let key = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
        let day = this.orderHistory.find(({ id }) => id == key);
        if (day)
          day.total = Number(day.total) + Number(order.total_price);
        if (order.current_total_price > 0.00) {
          this.lab1 += order.line_items.filter((o: any) => o.product_id == 6071351443617).length; // Vitamin D
          this.lab2 += order.line_items.filter((o: any) => o.product_id == 6053128503457).length; // Complete
          this.lab3 += order.line_items.filter((o: any) => o.product_id == 6071245504673).length; // Essential
          this.lab4 += order.line_items.filter((o: any) => o.product_id == 6071316054177).length; // Airborne
          this.lab5 += order.line_items.filter((o: any) => o.product_id == 6071369007265).length; // Covid
          this.lab6 += order.line_items.filter((o: any) => o.product_id == 6071271850145).length; // Vegetarian
          this.lab7 += order.line_items.filter((o: any) => o.product_id == 6070736453793).length; // Asian
          this.lab8 += order.line_items.filter((o: any) => o.product_id == 6680823922849).length; // Mexican
        }
      })
      this.initChart1();
      this.initSalesData1();
      this.initSalesData2();
      this.initSalesData3();
    })
  }


  private initHistory(): void {
    this.orderHistory = [];
    let today = new Date();
    for (let index = 0; index < 90; index++) {
      this.orderHistory[index] = { "id": (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(), "total": 0 };
      today.setDate(today.getDate() - 1);
    }
  }

  private initSalesData1(): void {
    this.salesData.period1.chartData = [];
    this.salesData.period1.total = 0;
    for (let index = 0; index < 30; index++) {
      this.labels1.push(this.orderHistory[index].id);
      this.salesData.period1.total = Number(this.salesData.period1.total) + Number(this.orderHistory[index].total);
      this.salesData.period1.chartData.push(this.orderHistory[index].total);
    }
  }

  private initSalesData2(): void {
    this.salesData.period2.chartData = [];
    this.salesData.period2.total = 0;
    for (let index = 0; index < 60; index++) {
      this.labels2.push(this.orderHistory[index].id);
      this.salesData.period2.total = Number(this.salesData.period2.total) + Number(this.orderHistory[index].total);
      this.salesData.period2.chartData.push(this.orderHistory[index].total);
    }
  }

  private initSalesData3(): void {
    this.salesData.period3.chartData = [];
    this.salesData.period3.total = 0;
    for (let index = 0; index < 90; index++) {
      this.labels3.push(this.orderHistory[index].id);
      this.salesData.period3.total = Number(this.salesData.period3.total) + Number(this.orderHistory[index].total);
      this.salesData.period3.chartData.push(this.orderHistory[index].total);
    }
  }


  private initChart1(): void {
    this.ctxa = document.getElementById("diary-chart");
    if (this.ctxa) {
      const chart = new Chart(this.ctxa, {
        type: 'doughnut',
        data: {
          labels: this.chartLabels,
          datasets: [{
            data: [this.lab1, this.lab2, this.lab3, this.lab4, this.lab5, this.lab6, this.lab7, this.lab8],
            backgroundColor: [
              'rgba(154, 198, 237, 0.2)',
              'rgba(255, 223, 209, 0.2)',
              'rgba(255, 153, 112, 0.2)',
              'rgba(229, 239, 242, 0.2)',
              'rgba(243, 165, 168, 0.2)',
              'rgba(67, 194, 209, 0.2)',
              'rgba(11, 70, 80, 0.2)',
              'rgba(255, 102, 153, 0.2)',
            ],
            borderColor: [
              'rgba(154, 198, 237, 1)',
              'rgba(255, 223, 209, 1)',
              'rgba(255, 153, 112, 1)',
              'rgba(229, 239, 242, 1)',
              'rgba(243, 165, 168, 1)',
              'rgba(67, 194, 209, 1)',
              'rgba(11, 70, 80, 1)',
              'rgba(255, 102, 153, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: this.responsive,
          maintainAspectRatio: false,
        }
      });
      const ctx = chart.ctx
      const canvas = chart.canvas;
      const chartArea = chart.chartArea;
      let context = (canvas) ? canvas.getContext("2d") : null;
      if (context) {
        let gradientBack = (context) ? context.createLinearGradient(0, 0, 0, 250) : null;
        if (gradientBack) {
          gradientBack.addColorStop(0, "rgba(198, 247, 198, 0.7)");
          gradientBack.addColorStop(0.5, "rgba(250, 242, 192, 0)");
          gradientBack.addColorStop(1, "rgba(252, 210, 214, 0.7)");
          if (ctx) {
            ctx.fillStyle = gradientBack;
            ctx.fillRect(chartArea.left, chartArea.bottom,
              chartArea.right - chartArea.left, chartArea.top - chartArea.bottom);
          }
        }
      }
    }
  }


  private initChart3(): void {
    this.ctxStatus = document.getElementById("status-chart");
    if (this.ctxStatus) {
      const chart = new Chart(this.ctxStatus, {
        type: 'pie',
        data: {
          labels: this.chartStatusLabels,
          datasets: [{
            data: [this.lo_new, this.lo_registered, this.lo_lab_order_received, this.lo_on_hold, this.lo_approved, this.lo_under_doctor_review, this.lo_approved_by_doctor, this.lo_modified, this.lo_testing_in_progress, this.lo_retest, this.lo_waiting_for_review, this.lo_testing_complete, this.lo_printed, this.lo_verified, this.lo_tests_uploaded, this.lo_hold, this.lo_uploaded, this.lo_reports_sent, this.lo_results_delivered, this.lo_canceled, this.lo_unknown, this.lo_fully_rejected],
            backgroundColor: [
              'rgba(237, 198, 154, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(252, 211, 197, 0.2)',
              'rgba(214, 255, 249, 0.2)',
              'rgba(153, 102, 255, 0.2)',

              'rgba(154, 198, 237, 0.2)',
              'rgba(255, 223, 209, 0.2)',
              'rgba(255, 153, 112, 0.2)',
              'rgba(229, 239, 242, 0.2)',
              'rgba(243, 165, 168, 0.2)',
              'rgba(67, 194, 209, 0.2)',
              'rgba(11, 70, 80, 0.2)',
              'rgba(255, 102, 153, 0.2)',

              'rgba(198, 237, 154, 0.2)',
              'rgba(206, 255, 86, 0.2)',
              'rgba(192, 75, 192, 0.2)',
              'rgba(99, 255, 132, 0.2)',
            ],
            borderColor: [
              'rgba(237, 198, 154, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(252, 211, 197, 1)',
              'rgba(214, 255, 249, 1)',
              'rgba(153, 102, 255, 1)',

              'rgba(154, 198, 237, 1)',
              'rgba(255, 223, 209, 1)',
              'rgba(255, 153, 112, 1)',
              'rgba(229, 239, 242, 1)',
              'rgba(243, 165, 168, 1)',
              'rgba(67, 194, 209, 1)',
              'rgba(11, 70, 80, 1)',
              'rgba(255, 102, 153, 1)',

              'rgba(198, 237, 154, 1)',
              'rgba(206, 255, 86, 1)',
              'rgba(192, 75, 192, 1)',
              'rgba(99, 255, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: this.responsive,
          maintainAspectRatio: false,
        }
      });
    }
  }


  setCustomerStats(): void {
    this._customersService.getAll();
    this._customersSubscription = this._customersService.items?.subscribe((data) => {
      this.box[3].count1 = 0;
      this.box[3].count1 = data.filter((customer) => (customer.total_spent > 0)).length;
      this.box[3].count2 = 0;
      this.box[3].count2 = data.filter((customer) => customer.verified_email).length;
      this.box[3].count3 = 0;
      this.box[3].count3 = data.filter((customer) => (customer.total_spent > 0)).length;

      this.dollarCount(data.filter((customer) => (customer.total_spent > 0)));
    })
  }

  dollarCount(customers: any): void {
    this.box[0].count4 = 0;
    customers.forEach((customer: any) => {
      this.box[0].count4 += Number(customer.total_spent);
    });

  }

  setUserStats(): void {
    this._usersService.getAll();
    this._usersSubscription = this._usersService.items?.subscribe((data) => {
      this.box[3].count4 = 0;
      this.box[3].count4 = data.filter((item: any) => { return (item.dob && (item.dob != '')) }).length;
    })
  }

  showCurrentData(): void {
    this.queryDate = null;
    this.data3 = null;
    this.currentDataDisplay = '';
    this.pastDataDisplay = 'none';
    this.queryDateDisplay = "none";
  }

  showPastData(): void {
    this.queryDate = null;
    this.data3 = null;
    this.currentDataDisplay = 'none';
    this.pastDataDisplay = '';
    this.queryDateDisplay = "none";
  }

  showMoreDetails(item: any): void {
    this._router.navigate(['admin', 'lab-orders', item._id])
  }

  onOrders(): void {
    this._router.navigate(['admin', 'orders']);
  }

  onInvalidOrders(): void {
    this._router.navigate(['admin', 'invalid-orders']);
  }

  onCustomer(): void {
    this._router.navigate(['admin', 'customers']);
  }

  onTestKit(): void {
    this._router.navigate(['admin', 'test-kit-orders']);
  }

  onLab(): void {
    this._router.navigate(['admin', 'lab-orders']);
  }

  onUsers(): void {
    this._router.navigate(['admin', 'users']);
  }

  onSettings(): void {
    this._router.navigate(['settings'])
  }

  onKitRegistration(): void {
    this._router.navigate(['admin', 'kit-registrations'])
  }

  onProfile(): void {
    this._router.navigate(['profiles', this.uid])
  }

  onSignOut(): void {
    this._router.navigate(['sign-out']);
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  setLabOrdersByAge(labOrders: any): void {

    // 18 - 30
    let year = new Date().getFullYear();
    const year1a = year - 18;
    const year1b = year - 29;

    const year2a = year - 30;
    const year2b = year - 39;

    const year3a = year - 40;
    const year3b = year - 49;

    const year4a = year - 50;
    const year4b = year - 59;

    const year5 = year - 60;

    this.box[1].count1 = 0;
    this.box[1].count1 = labOrders.filter((labOrder: any) => {
      return ((labOrder['patient-dob'] >= '1991-01-01') && (labOrder['patient-dob'] <= '1980-12-31'))
    }).length;

    // 31 - 40
    this.box[1].count1 = this.box[1].count1 + labOrders.filter((labOrder: any) => {
      return ((labOrder['patient-dob'] >= '1981-01-01') && (labOrder['patient-dob'] <= '1990-12-31'))
    }).length;

    // 41 - 50
    this.box[1].count2 = 0;
    this.box[1].count2 = labOrders.filter((labOrder: any) => {
      return ((labOrder['patient-dob'] >= '1971-01-01') && (labOrder['patient-dob'] <= '1980-01-01'))
    }).length;

    // 51 - 60
    this.box[1].count3 = 0;
    this.box[1].count3 = labOrders.filter((labOrder: any) => {
      return ((labOrder['patient-dob'] <= '1961-01-01') && (labOrder['patient-dob'] <= '1970-12-31'))
    }).length;

    // Over 60
    this.box[1].count4 = 0;
    this.box[1].count4 = labOrders.filter((labOrder: any) => {
      return (labOrder['patient-dob'] <= '1960-01-01')
    }).length;
  }

  setActiviations(kitRegistrations: any): void {
    this.box[2].count1 = 0;
    this.box[2].count1 = kitRegistrations.filter((ka: any) => {
      return (ka.dob == '')
    }).length;
    this.box[2].count2 = 0;
    this.box[2].count2 = kitRegistrations.filter((ka: any) => {
      return (ka.status == '998')
    }).length;
    this.box[2].count3 = 0;
    this.box[2].count3 = kitRegistrations.filter((ka: any) => {
      return (ka.gender == 'Male');
    }).length;
    this.box[2].count4 = 0;
    this.box[2].count4 = kitRegistrations.filter((ka: any) => {
      return (ka.gender == 'Female');
    }).length;

  }

}

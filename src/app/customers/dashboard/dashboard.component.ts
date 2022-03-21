import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  production: boolean = false;
  headingText = "Sales";
  option1 = "1 Month";
  option2 = "3 Month";
  option3 = "6 Month";
  option4 = "1 Year";
  fill: boolean = true;
  borderWidth: number = 5;
  borderColor = "#fff";
  responsive: boolean = true;
  @Input() box: any;
  @Input() labels1: any;
  @Input() labels2: any;
  @Input() labels3: any;
  // chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  @Input() data: any;

  option1Display = '';
  option2Display = 'none';
  option3Display = 'none';
  option4Display = 'none';

  private ctx1: any;
  private ctx2: any;
  private ctx3: any;
  // private ctx4: any;

  constructor(private _router: Router, private _userService: UsersService) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    if (!this._userService.graphShown)
      setTimeout(() => { this.initCharts() }, 3500);
  }

  private initCharts(): void {
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this._userService.graphShown = true;
  }

  showFirst(): void {
    this.option1Display = '';
    this.option2Display = 'none';
    this.option3Display = 'none';
    this.option4Display = 'none';
  }

  showSecond(): void {
    this.option1Display = 'none';
    this.option2Display = '';
    this.option3Display = 'none';
    this.option4Display = 'none';
  }

  showThird(): void {
    this.option1Display = 'none';
    this.option2Display = 'none';
    this.option3Display = '';
    this.option4Display = 'none';
  }

  showFourth(): void {
    this.option1Display = 'none';
    this.option2Display = 'none';
    this.option3Display = 'none';
    this.option4Display = '';
  }

  showMore(link: any): void {
    this._router.navigate([link]);
  }

  private initChart1(): void {
    this.ctx1 = document.getElementById("chart-stat-widget14-1");

    try {
      if (this.ctx1) {
        const chart = new Chart(this.ctx1, {
          type: 'line',
          data: {
            labels: this.labels1,
            datasets: [{
              data: this.data.period1.chartData,
              fill: this.fill,
              borderColor: '#fff',
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              pointBackgroundColor: "#FFF",
              pointHoverBackgroundColor: "#0b4650",
              pointHoverBorderColor: "#FFF",
              pointHoverRadius: 10,
            }]
          },
          options: {
            responsive: this.responsive,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  fontColor: '#ffffff',
                  fontSize: 10
                },
              }],
              xAxes: [{
                display: false,
              }]
            }
          }
        })
      }
    }
    catch (err) {
      console.error(null, err)
    }

  }
  private initChart2(): void {
    this.ctx2 = document.getElementById("chart-stat-widget14-2");
    try {
      if (this.ctx2) {
        const chart = new Chart(this.ctx2, {
          type: 'line',
          data: {
            labels: this.labels2,
            datasets: [{
              data: this.data.period2.chartData,
              fill: this.fill,
              borderColor: '#fff',
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              pointBackgroundColor: "#FFF",
              pointHoverBackgroundColor: "#0b4650",
              pointHoverBorderColor: "#FFF",
              pointHoverRadius: 10,
            }]
          },
          options: {
            responsive: this.responsive,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                display: true,
              }],
              xAxes: [{
                display: false,
              }]
            }
          }
        })
      }
    }
    catch (err) {
      console.error(null, err)
    }

  }
  private initChart3(): void {
    this.ctx3 = document.getElementById("chart-stat-widget14-3");
    try {
      if (this.ctx3) {
        const chart = new Chart(this.ctx3, {
          type: 'line',
          data: {
            labels: this.labels3,
            datasets: [{
              data: this.data.period3.chartData,
              fill: this.fill,
              borderColor: '#fff',
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              pointBackgroundColor: "#FFF",
              pointHoverBackgroundColor: "#0b4650",
              pointHoverBorderColor: "#FFF",
              pointHoverRadius: 10,
            }]
          },
          options: {
            responsive: this.responsive,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                display: true,
              }],
              xAxes: [{
                display: false,
              }]
            }
          }
        })
      }
    }
    catch (err) {
      console.error(null, err)
    }

  }
  // private initChart4(): void {
  //   this.ctx4 = document.getElementById("chart-stat-widget14-4");
  //   try {
  //     if (this.ctx4) {
  //       const chart = new Chart(this.ctx4, {
  //         type: 'line',
  //         data: {
  //           labels: this.chartLabels,
  //           datasets: [{
  //             data: this.data.period4.chartData,
  //             fill: this.fill,
  //             borderColor: '#fff',
  //             backgroundColor: "rgba(0, 0, 0, 0.2)",
  //             pointBackgroundColor: "#FFF",
  //             pointHoverBackgroundColor: "#0b4650",
  //             pointHoverBorderColor: "#FFF",
  //             pointHoverRadius: 10,
  //           }]
  //         },
  //         options: {
  //           responsive: this.responsive,
  //           legend: {
  //             display: false,
  //           },
  //           scales: {
  //             yAxes: [{
  //               display: true,
  //             }],
  //             xAxes: [{
  //               display: false,
  //             }]
  //           }
  //         }
  //       })
  //     }
  //   } catch (err) {
  //     console.error(null, err)
  //   }

  // }
}

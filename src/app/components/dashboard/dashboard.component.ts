import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Chartist from 'chartist';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { TokenStorageService } from '../../components/token-storage.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import Chart from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  accountForm:FormGroup;
  accounts: any;
  id:any;
  currentUser:any;
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels:Array<any>;
  public lineChartColors:Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels:Array<any>;
  public lineChartWithNumbersAndGridColors:Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>;

  array:[];
  a:[];
  aa:any;
  occ:any;
  tab1:[];
  tab2:[];
  errorMessage = '';
  chart:any;
  canvas12 : any;
  canvas13 : any;
  public ctx1;
  public ctx2;
  ChartOptions :any;
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  constructor(private fb: FormBuilder,private userservice : UserService,private datePipe : DatePipe,private token: TokenStorageService,) { }

  ngOnInit() {
   
    this.userservice.getstat1()
    .subscribe(
      res => {
        this.array=res;
        const a = Array.prototype.concat.apply([], this.array); 
        console.log("res1111111",a);

        const aa = a.map(item => {
          return { name: item };
        });
        console.log("r",aa);
      //check for occ

      function  findOcc(arr, key) {
        const arr2 = [];
        arr.forEach((x) => {

          // Checking if there is any object in arr2
          // which contains the key value
           if (arr2.some((val) => val[key] === x[key])) {

             // If yes! then increase the occurrence by 1
             arr2.forEach((k) => {
               if (k[key] === x[key]) {
                 k['y']++
               }
            })

           } else {
             // If not! Then create a new object initialize
             // it with the present iteration key's value and
             // set the occurrence to 1
             const a = {}
             a[key] = x[key]
             a['y'] = 1
             arr2.push(a);
           }
        })

        return arr2
      }
      const key = 'name'
     this.occ = findOcc(aa, key);

console.log('res3', this.occ);



let tab1 = this.occ.map(res => res.name);

let tab2 = this.occ.map(res => res.y);
console.log(tab1);
console.log(tab2);
this.ctx1 = document.getElementById("chart1");
this.chart = new Chart(this.ctx1, {
  type: 'pie',
  data: {
    labels:tab1,
    datasets: [
      {
        data:tab2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display:false
      }]
    }
  }
})
      })
      this.userservice.getstattype()
      .subscribe(
        res => {
          this.array=res;
          const a = Array.prototype.concat.apply([], this.array); 
          console.log("get stat typpe",a);
  
          const aa = a.map(item => {
            return { name: item };
          });
          console.log("r",aa);
        //check for occ
  
        function  findOcc(arr, key) {
          const arr2 = [];
          arr.forEach((x) => {
  
            // Checking if there is any object in arr2
            // which contains the key value
             if (arr2.some((val) => val[key] === x[key])) {
  
               // If yes! then increase the occurrence by 1
               arr2.forEach((k) => {
                 if (k[key] === x[key]) {
                   k['y']++
                 }
              })
  
             } else {
               // If not! Then create a new object initialize
               // it with the present iteration key's value and
               // set the occurrence to 1
               const a = {}
               a[key] = x[key]
               a['y'] = 1
               arr2.push(a);
             }
          })
  
          return arr2
        }
        const key = 'name'
       this.occ = findOcc(aa, key);
  
  console.log('stat type', this.occ);
  
  
  
  let tab1 = this.occ.map(res => res.name);
  
  let tab2 = this.occ.map(res => res.y);
  console.log(tab1);
  console.log(tab2);
  this.ctx2 = document.getElementById("chart2");
  this.chart = new Chart(this.ctx2, {
    type: 'pie',
    data: {
      labels:tab1,
      datasets: [
        {
          data:tab2,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display:false
        }]
      }
    }
  })
        })
   this.getAccountarray();
    this.accountForm = this.fb.group({
      account: [null]
    });

    this.accountForm.get("account").valueChanges
    .subscribe(f=> {
      this.onAccountChanged(f);
  })

  
    

  //   this.currentUser = this.token.getUser();
  
  //   this.userservice.getstat()
  //   .pipe(first()) 
  //   .subscribe(res => {

  //     let amount = res.map(res => res.sender_balance)
  //     let alldates = res.map(res => res.createdAt)
  //     let a = alldates.map(a=>this.datePipe.transform(a, 'dd/MM/yyyy HH:mm'));

  //    /////////////////
  //  //    console.log(amount);
  //  console.log(a);
 
  //   this.chartColor = "#FFFFFF";
  //   this.canvas = document.getElementById("bigDashboardChart");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#80b6f4');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

  //   this.lineBigDashboardChartData = [
  //       {
  //         label: "Data",

  //         pointBorderWidth: 1,
  //         pointHoverRadius: 7,
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 5,
  //         fill: true,

  //         borderWidth: 2,
  //         data: amount
  //       }
  //     ];
  //     this.lineBigDashboardChartColors = [
  //      {
  //        backgroundColor: this.gradientFill,
  //        borderColor: this.chartColor,
  //        pointBorderColor: this.chartColor,
  //        pointBackgroundColor: "#2c2c2c",
  //        pointHoverBackgroundColor: "#2c2c2c",
  //        pointHoverBorderColor: this.chartColor,
  //      }
  //    ];
  //   this.lineBigDashboardChartLabels =  a;
  // })
  //   this.lineBigDashboardChartOptions = {

  //         layout: {
  //             padding: {
  //                 left: 20,
  //                 right: 20,
  //                 top: 0,
  //                 bottom: 0
  //             }
  //         },
  //         maintainAspectRatio: false,
  //         tooltips: {
  //           backgroundColor: '#fff',
  //           titleFontColor: '#333',
  //           bodyFontColor: '#666',
  //           bodySpacing: 4,
  //           xPadding: 12,
  //           mode: "nearest",
  //           intersect: 0,
  //           position: "nearest"
  //         },
  //         legend: {
  //             position: "bottom",
  //             fillStyle: "#FFF",
  //             display: false
  //         },
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     fontColor: "rgba(255,255,255,0.4)",
  //                     fontStyle: "bold",
  //                     beginAtZero: true,
  //                     maxTicksLimit: 5,
  //                     padding: 10
  //                 },
  //                 gridLines: {
  //                     drawTicks: true,
  //                     drawBorder: false,
  //                     display: true,
  //                     color: "rgba(255,255,255,0.1)",
  //                     zeroLineColor: "transparent"
  //                 }

  //             }],
  //             xAxes: [{
  //                 gridLines: {
  //                     zeroLineColor: "transparent",
  //                     display: false,

  //                 },
  //                 ticks: {
  //                     padding: 10,
  //                     fontColor: "rgba(255,255,255,0.4)",
  //                     fontStyle: "bold"
  //                 }
  //             }]
  //         }
  //   };  


  //   this.lineBigDashboardChartType = 'line';


  //   this.gradientChartOptionsConfiguration = {
  //     maintainAspectRatio: false,
  //     legend: {
  //       display: true
  //     },
  //     tooltips: {
  //       bodySpacing: 4,
  //       mode: "nearest",
  //       intersect: 0,
  //       position: "nearest",
  //       xPadding: 10,
  //       yPadding: 10,
  //       caretPadding: 10
  //     },
  //     responsive: 1,
  //     scales: {
  //       yAxes: [{
  //         display: 0,
  //         ticks: {
  //           display: false
  //         },
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawTicks: false,
  //           display: false,
  //           drawBorder: false
  //         }
  //       }],
  //       xAxes: [{
  //         display: 0,
  //         ticks: {
  //           display: false
  //         },
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawTicks: false,
  //           display: false,
  //           drawBorder: false
  //         }
  //       }]
  //     },
  //     layout: {
  //       padding: {
  //         left: 0,
  //         right: 0,
  //         top: 15,
  //         bottom: 15
  //       }
  //     }
  //   };

  //   this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
  //     maintainAspectRatio: false,
  //     legend: {
  //       display: true
  //     },
  //     tooltips: {
  //       bodySpacing: 4,
  //       mode: "nearest",
  //       intersect: 0,
  //       position: "nearest",
  //       xPadding: 10,
  //       yPadding: 10,
  //       caretPadding: 10
  //     },
  //     responsive: true,
  //     scales: {
        
      
  //     },
  //     layout: {
  //       padding: {
  //         left: 0,
  //         right: 0,
  //         top: 15,
  //         bottom: 15
  //       }
  //     }
  //   };



    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

   
  }

  public getAccountarray(): void {
    this.userservice.getAccountarray()
    .subscribe(
      data => {
        this.accounts=data;
        console.log(data);
      },
      err => {
        this.accounts = (err.error).message;
      });
  }

  onAccountChanged(value) {
    //get transactions table
console.log('onAccountChanged')
console.log(value)
// this.userservice.getstat(value).subscribe(
//   err => {
//     this.errorMessage = err.error.message;

//   }
// );

this.currentUser = this.token.getUser();
  
this.userservice.getstat(value)
.pipe(first()) 
.subscribe(res => {

  let amount = res.map(res => res.sender_balance)
  let alldates = res.map(res => res.createdAt)
  let a = alldates.map(a=>this.datePipe.transform(a, 'dd/MM/yyyy HH:mm'));

 /////////////////
//    console.log(amount);
console.log(a);

this.chartColor = "#FFFFFF";
this.canvas = document.getElementById("bigDashboardChart");
this.ctx = this.canvas.getContext("2d");

this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
this.gradientStroke.addColorStop(0, '#80b6f4');
this.gradientStroke.addColorStop(1, this.chartColor);

this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

this.lineBigDashboardChartData = [
    {
      label: "Data",

      pointBorderWidth: 1,
      pointHoverRadius: 7,
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      fill: true,

      borderWidth: 2,
      data: amount
    }
  ];
  this.lineBigDashboardChartColors = [
   {
     backgroundColor: this.gradientFill,
     borderColor: this.chartColor,
     pointBorderColor: this.chartColor,
     pointBackgroundColor: "#2c2c2c",
     pointHoverBackgroundColor: "#2c2c2c",
     pointHoverBorderColor: this.chartColor,
   }
 ];
this.lineBigDashboardChartLabels =  a;
})
this.lineBigDashboardChartOptions = {

      layout: {
          padding: {
              left: 20,
              right: 20,
              top: 0,
              bottom: 0
          }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
      },
      scales: {
          yAxes: [{
              ticks: {
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold",
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  padding: 10
              },
              gridLines: {
                  drawTicks: true,
                  drawBorder: false,
                  display: true,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent"
              }

          }],
          xAxes: [{
              gridLines: {
                  zeroLineColor: "transparent",
                  display: false,

              },
              ticks: {
                  padding: 10,
                  fontColor: "rgba(255,255,255,0.4)",
                  fontStyle: "bold"
              }
          }]
      }
};  


this.lineBigDashboardChartType = 'line';


this.gradientChartOptionsConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: 1,
  scales: {
    yAxes: [{
      display: 0,
      ticks: {
        display: false
      },
      gridLines: {
        zeroLineColor: "transparent",
        drawTicks: false,
        display: false,
        drawBorder: false
      }
    }],
    xAxes: [{
      display: 0,
      ticks: {
        display: false
      },
      gridLines: {
        zeroLineColor: "transparent",
        drawTicks: false,
        display: false,
        drawBorder: false
      }
    }]
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 15,
      bottom: 15
    }
  }
};

this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: true,
  scales: {
    
  
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 15,
      bottom: 15
    }
  }
};


}

}
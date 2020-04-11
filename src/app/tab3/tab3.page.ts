import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidApiService } from '../api/covid-api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab3Page implements OnInit {
  public columns: any;
  public rows: any;
  dataApi: any;
  public dataTable: any;
  progress: string;


  constructor(private http: HttpClient, private apiService: CovidApiService, private platform: Platform) {

  }
  ngOnInit(): void {
    this.progress = 'indeterminate';
    this.getDataTable();
  }

  getDataTable() {
    this.progress = 'indeterminate';

    this.columns = [
      { name: 'negara', width: this.platform.width() - 260 },
      { name: 'positif', width: '100' },
      { name: 'sembuh', width: '80' },
      { name: 'wafat', width: '80' }
    ];

    this.dataTable = [];

    this.apiService.getGlobal()
      .then((response) => {
        const res = JSON.parse(response.data);
        for (const val in res) {
          if (res[val].attributes != null) {
            const data = {
              negara: res[val].attributes.Country_Region,
              positif: res[val].attributes.Confirmed,
              sembuh: res[val].attributes.Recovered,
              wafat: res[val].attributes.Deaths
            };
            this.dataTable.push(data);
          }
        }

        const table = {
          movie: this.dataTable
        };
        this.rows = table.movie;
        this.progress = 'determinate';

      });
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getDataTable();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}

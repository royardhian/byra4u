import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidApiService } from '../api/covid-api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page implements OnInit {
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
    console.log('Width: ' + this.platform.width());

  }

  getDataTable() {
    this.progress = 'indeterminate';
    this.columns = [
      { name: 'provinsi', width: this.platform.width() - 260 },
      { name: 'positif', width: '100' },
      { name: 'sembuh', width: '80' },
      { name: 'wafat', width: '80' }
    ];

    this.dataTable = [];

    this.apiService.getProvinsi()
      .then((response) => {
        const res = JSON.parse(response.data);
        for (const val in res) {
          if (res[val].attributes != null) {
            const data = {
              provinsi: res[val].attributes.Provinsi,
              positif: res[val].attributes.Kasus_Posi,
              sembuh: res[val].attributes.Kasus_Semb,
              wafat: res[val].attributes.Kasus_Meni
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

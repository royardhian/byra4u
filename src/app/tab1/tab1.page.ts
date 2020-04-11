import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../api/covid-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  dataApi: any;
  alive1: string;
  alive2: string;

  totalPositif: any;
  totalSembuh: any;
  totalMeninggal: any;

  progress: string;
  constructor(private apiService: CovidApiService) { }

  ngOnInit(): void {
    this.dataApi = 'getting data ';
    this.totalPositif = 'getting data ';
    this.totalSembuh = 'getting data ';
    this.totalMeninggal = 'getting data ';
    this.onReload();
  }

  onReload() {
    this.progress = 'indeterminate';
    this.apiService.getIndonesia().then((data) => {
      console.log(data);
      this.dataApi = JSON.parse(data.data)[0];
      this.alive1 = (parseInt(this.replceFrmt(this.dataApi.positif), 10)
        - (parseInt(this.replceFrmt(this.dataApi.sembuh), 10)
          + parseInt(this.replceFrmt(this.dataApi.meninggal), 10))).toLocaleString();
    });

    this.apiService.getPositif().then((positif) => {
      console.log(positif);
      this.totalPositif = JSON.parse(positif.data);
      this.apiService.getSembuh().then((sembuh) => {
        console.log(sembuh);
        this.totalSembuh = JSON.parse(sembuh.data);
        this.apiService.getMeninggal().then((meninggal) => {
          console.log(meninggal);
          this.totalMeninggal = JSON.parse(meninggal.data);
          this.alive2 = (parseInt(this.replceFrmt(this.totalPositif.value), 10)
            - (parseInt(this.replceFrmt(this.totalSembuh.value), 10)
              + parseInt(this.replceFrmt(this.totalMeninggal.value), 10))).toLocaleString();
          console.log(this.alive2);
          this.progress = 'determinate';
        });
      });
    });
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.onReload();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  replceFrmt(strFrmt: any) {
    strFrmt = strFrmt.replace(new RegExp(',', 'g'), '');
    return strFrmt;
  }
}

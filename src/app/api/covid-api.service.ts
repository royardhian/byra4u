import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})


export class CovidApiService {

  API_KEY = 'demo';

  constructor(private httpClient: HTTP) { }

  getIndonesia() {
    return this.httpClient.get('https://api.kawalcorona.com/indonesia', {}, {});
  }

  getPositif() {
    return this.httpClient.get('https://api.kawalcorona.com/positif', {}, {});
  }

  getSembuh() {
    return this.httpClient.get('https://api.kawalcorona.com/sembuh', {}, {});
  }

  getMeninggal() {
    return this.httpClient.get('https://api.kawalcorona.com/meninggal', {}, {});
  }

  getProvinsi() {
    return this.httpClient.get('https://api.kawalcorona.com/indonesia/provinsi', {}, {});
  }

  getGlobal() {
    return this.httpClient.get('https://api.kawalcorona.com', {}, {});
  }
}

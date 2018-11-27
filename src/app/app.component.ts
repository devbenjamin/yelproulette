import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title: string = 'Yelper, Your Food Finding Helper';
  baseURL: string = 'https://api.yelp.com/v3/businesses/search?location=';
  _dollar: string = '';
  _state: string = '';
  _city: string = '';
  place: object = {};
  rndPlace: object = {};
  intStars: number = 0;
  zero: boolean = false;
  one: boolean = false;
  oneHalf: boolean = false;
  two: boolean = false;
  twoHalf: boolean = false;
  three: boolean = false;
  threeHalf: boolean = false;
  four: boolean = false;
  fourHalf: boolean = false;
  five: boolean = false;
  show: boolean =false;
  delivery: boolean = false;

  token: string = 'bearer lHbbGBZNC0LpTIrfg29i_biR6RCoYXBNMirgW8gSYOamzQCMP8C4iWeclURizZ7UFJQ_vZkhnXBmHJCGXVpOonNb828YDV_pFE7D-jT8WaIzSlf7gGEEpRLaNSrrW3Yx'

  constructor(
    private http: HttpClient
    ) {}

    ngOnInit(){
    }

  onEnter(dollar: string, state: string, city: string) {
    this._dollar = dollar;
    this._state = state;
    this._city = city;
    this.zero = false;
    this.one = false;
    this.oneHalf = false;
    this.two = false;
    this.twoHalf = false;
    this.three = false;
    this.threeHalf = false;
    this.four = false;
    this.fourHalf = false;
    this.five = false;
    this.delivery = false
    this.show = false;
    console.log("insideonSubmit:",this._dollar, this._state, this._city);
    return (this.http.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${ this._state } ${ this._city }&price=${ this._dollar}&open_now=true`))
      .subscribe(place => {
      this.place = place;
      console.log(this.place);
      this.showData(this.place);
    })
  }

  showData(data) {
    let arrLength = data.businesses.length;
    console.log(arrLength);
    let rnd=Math.round(Math.random()*arrLength)
    console.log('data.businesses[rnd]:',data.businesses[rnd])
    console.log('rnd:',rnd)
    this.rndPlace=data.businesses[rnd];
    console.log(this.rndPlace)
    // console.log('rndPlace.display_address[1]:',this.rndPlace.location.display_address[1])

    this.findStars(this.rndPlace)
    this.delivers(this.rndPlace)
  }
findStars(obj) {
  let r = obj.rating;
  console.log('obj.rating:',obj.rating)
  console.log('r:',r)
  // console.log('rndPlace.display_address[1]:',this.rndPlace.display_address[1])
  switch(r){
    case(r=0):
      this.zero = true;
      break;
    case(r=1):
      this.one = true;
      break;
    case(r=1.5):
      this.oneHalf = true;
      break;
    case(r=2):
      this.two = true;
      break;
    case(r=2.5):
      this.twoHalf = true;
      break;
    case(r=3):
      this.three = true;
      break;
    case(r=3.5):
      this.threeHalf = true;
      break;
    case(r=4):
      this.four = true;
      break;
    case(r=4.5):
      this.fourHalf = true;
      break;
    case(r=5):
      this.five = true;
      break;
  }
  this.show=true;
}
delivers(r) {
  if((r.transactions.filter(deliver => (deliver == 'delivery'))).lemngth = 0) {
    this.delivery = true;
  }
}
}

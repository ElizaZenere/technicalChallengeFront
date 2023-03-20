import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSubscriptions } from './DataSubscriptions';
import { Subscriptions } from './Subscriptions';
import {Intervals} from './Intervals';
import {PaymentMethods} from './PaymentMethods';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'UIGrapevine';
  visible = 'none';
  mostrarBoton1 = true;
  newitems = [];
  arrayOfObjects: { id: number; value: string; disabled: boolean; mostrarBoton: boolean; name: string; idSubscription: number}[][] = [];
  itemInterval= [];
  options: { value: number, label: string,}[] = [];
  itemPaymentMethod= [];
  arrayOfObjectsPaymentMethods: { id: number, value: string,}[] = [];
  intervalName = '';
  paymentMethodsName ='';
  numberCardShort ='';
  nextDonationShort ='';
  sinceDonationShort ='';
  textTotalDonated ='';


    constructor(private http: HttpClient, private datePipe: DatePipe) {
    http.get<DataSubscriptions[]>('http://localhost:2975/api/Subscriptions').subscribe(result => {
      result.forEach(r => {

    this.numberCardShort = r.numberCard.toString().substring(r.numberCard.toString().length - 4)
    this.nextDonationShort = r.nextDonation.toString().substring(0, 10)
    this.sinceDonationShort = r.sinceDonation.toString().substring(0, 10)

    this.nextDonationShort = datePipe.transform(this.nextDonationShort, 'MMM dd, yyyy')?.toString()?? '';
    this.sinceDonationShort = datePipe.transform(this.sinceDonationShort, 'MMM dd, yyyy')?.toString()?? '';
    this.textTotalDonated =r.totalDonation+' since '+this.sinceDonationShort;
    this.textTotalDonated = r.totalDonation ==0? '0': r.totalDonation + ' since ' + this.sinceDonationShort;

        const newitems = [
          { id: 0, value: `$ ${r.amount}`, disabled: true, mostrarBoton: true, name: "Amount:", idSubscription:r.idSubscription },
          { id: 1, value: `${r.interval}`, disabled: true, mostrarBoton: true, name: "Interval:", idSubscription:r.idSubscription },
          { id: 2, value: `${this.nextDonationShort}`, disabled: true, mostrarBoton: true, name: "Next donation:", idSubscription:r.idSubscription },
          { id: 3, value:  `ending in ${this.numberCardShort}`, disabled: true, mostrarBoton: true, name: "Payment method:", idSubscription:r.idSubscription },
          { id: 4, value: `$ ${this.textTotalDonated}`, disabled: true, mostrarBoton: true, name: "Total Donated:", idSubscription:r.idSubscription }
        ];
        this.arrayOfObjects.push(newitems);
      });
    });
    this.http.get<Intervals[]>('http://localhost:2975/api/Intervals').subscribe(result => {
      //console.log(result);
      result.forEach(r => {
        const itemInterval = { value: r.idInterval, label: `${r.intervalName}`};
        this.options.push(itemInterval);
      });
    });
  }

  ngOnInit() {


  }
  changeButton(value:boolean, numero:any, numero2:any, id:any) {

    this.arrayOfObjects[numero][numero2].mostrarBoton = value;
    this.arrayOfObjects[numero][numero2].disabled=value;
    if(value){
      this.http.get<Subscriptions>('http://localhost:2975/api/Subscriptions/'+id).subscribe(result => {
        let amount         = numero2==0 ? parseInt(this.arrayOfObjects[numero][numero2].value.toString().substring(2, this.arrayOfObjects[numero][numero2].value.length)) : result.amount;
        let interval       = numero2==1 ? parseInt(this.arrayOfObjects[numero][numero2].value) : result.interval;
        let nextDonation   = numero2==2 ? new Date(this.arrayOfObjects[numero][numero2].value) : result.nextDonation;
        let subscription : Subscriptions = new Subscriptions(result.idSubscription,amount,interval,nextDonation,result.numberCard,result.paymentMethod);
        const url = 'http://localhost:2975/api/Subscriptions/'+id;
        this.http.put(url, subscription).subscribe(result => {
          console.log(result);
        });
      });
      if(numero2==2){
        this.arrayOfObjects[numero][numero2].value = this.datePipe.transform(this.arrayOfObjects[numero][numero2].value, 'MMM dd, yyyy')?.toString()?? '';
      }
      location.reload();

    }else{
      if(numero2==2){
        this.arrayOfObjects[numero][numero2].value = this.datePipe.transform(this.arrayOfObjects[numero][numero2].value, 'yyyy/MM/dd')?.toString()?? '';
      }
    }
  }

  buttonShow(show :boolean){
    if(show){
      this.visible = 'none';
    }else{
      this.visible = 'block';
    }
    this.mostrarBoton1 = show;
  }
}

export class DataSubscriptions {
  idSubscription: number;
  amount: number;
  interval: number;
  nextDonation: Date;
  sinceDonation: Date;
  numberCard: string;
  paymentMethod: number;
  totalDonation: number;

  constructor(idSubscription: number, amount: number, interval: number,
    nextDonation: Date, sinceDonation:Date, numberCard: string, paymentMethod: number, totalDonation:number) {
    this.idSubscription = idSubscription;
    this.amount = amount;
    this.interval = interval;
    this.nextDonation = nextDonation;
    this.sinceDonation = sinceDonation;
    this.numberCard = numberCard;
    this.paymentMethod = paymentMethod;
    this.totalDonation = totalDonation;
  }
}

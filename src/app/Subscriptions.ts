export class Subscriptions {
  idSubscription: number;
  amount: number;
  interval: number;
  nextDonation: Date;
  numberCard: string;
  paymentMethod: number;

  constructor(idSubscription: number, amount: number, interval: number,
    nextDonation: Date, numberCard: string, paymentMethod: number) {
    this.idSubscription = idSubscription;
    this.amount = amount;
    this.interval = interval;
    this.nextDonation = nextDonation;
    this.numberCard = numberCard;
    this.paymentMethod = paymentMethod;
  }
}

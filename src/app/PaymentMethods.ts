export class PaymentMethods {
  idPaymentMethod: number;
  paymentMethodsName: string;

  constructor(id: number, name: string) {
    this.idPaymentMethod = id;
    this.paymentMethodsName = name;
  }
}

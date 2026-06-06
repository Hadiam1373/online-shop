export interface IPaymentProcess {
  orderId: string;
  cardToken: string;
  cardLast4?: string;
}

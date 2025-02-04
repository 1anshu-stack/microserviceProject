import { Subjects, Publisher, PaymentCreatedEvent } from "@uchihatickets/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
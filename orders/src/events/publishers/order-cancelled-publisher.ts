import { Publisher, OrderCancelledEvent, Subjects } from "@uchihatickets/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
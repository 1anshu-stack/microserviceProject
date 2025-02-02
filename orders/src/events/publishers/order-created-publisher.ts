import { Publisher, OrderCreatedEvent, Subjects } from "@uchihatickets/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
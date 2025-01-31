import { Publisher, Subjects, TicketUpdatedEvent } from "@uchihatickets/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

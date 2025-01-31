import { Publisher, Subjects, TicketCreatedEvent } from "@uchihatickets/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}


import { Subjects, Publisher, ExpirationCompleteEvent } from "@uchihatickets/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

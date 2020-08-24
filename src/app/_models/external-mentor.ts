import { ExternalMentorContact } from './external-mentor-contact';

export interface ExternalMentor {
    mentorID: number;
    name: string;
    surname: string;
    contacts?: ExternalMentorContact[];
}

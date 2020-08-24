import { ExternalMentor } from './external-mentor';
import { CompanyContact } from './company-contact';

export interface Company {
    companyID: number;
    name: string;
    mentors?: ExternalMentor[];
    contacts?: CompanyContact[];
    locations?: Location[];
}

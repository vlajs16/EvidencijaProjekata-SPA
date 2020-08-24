import { ExternalMentor } from './external-mentor';
import { Company } from './company';
import { ProjectCoveringSubject } from './project-covering-subject';

export interface ProjectProposal {
    projectProposalID: number;
    proposalDate: Date;
    name: string;
    goal?: string;
    description: string;
    activities?: string;
    startDateProjectProposal?: Date;
    daysDuration?: number;
    externalMentor?: ExternalMentor;
    company: Company;
    subjects?: ProjectCoveringSubject[];
}

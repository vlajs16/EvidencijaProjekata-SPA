import { Employee } from './employee';
import { ProjectProposal } from './project-proposal';

export interface Project {
    projectID: number;
    adoptionDate?: Date;
    description: string;
    note: string;
    internalMentor?: Employee;
    decisionMaker?: Employee;
    projectProposal: ProjectProposal;
}

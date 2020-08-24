import { ScientificArea } from './scientific-area';

export interface ProjectCoveringSubject {
    projectCoveringSubjectID?: number;
    name: string;
    description: string;
    scientificArea: ScientificArea;
}

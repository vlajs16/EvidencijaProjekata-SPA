import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectProposalComponent } from './project-proposal/project-proposal.component';
import { CompanyProposeResolver } from './_resolvers/company-propose.resolver';
import { ScientificAreaService } from './_services/scientific-area.service';
import { ScientificAreaResolver } from './_resolvers/scientific-area.resolver';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { NumbersResolver } from './_resolvers/numbers.resolver';
import { ApprovingProjectComponent } from './approving-project/approving-project.component';
import { ProposedProjectsResolver } from './_resolvers/proposed-projects.resolver';
import { EmployeesResolver } from './_resolvers/employees.resolver';

export const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'projectproposal', component: ProjectProposalComponent,
        runGuardsAndResolvers: 'always',
        resolve: {company: CompanyProposeResolver, areas: ScientificAreaResolver}},
    {path: 'employee', component: EmployeeLoginComponent},
    {path: 'dashboard', component: EmpDashboardComponent,
        runGuardsAndResolvers: 'always',
        resolve: {numbers: NumbersResolver}},
    {path: 'notapproved', component: ApprovingProjectComponent,
        runGuardsAndResolvers: 'always',
        resolve: {projects: ProposedProjectsResolver, employees: EmployeesResolver}}
]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { ProjectProposalComponent } from './project-proposal/project-proposal.component';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertifyService } from './_services/alertify.service';
import { CompanyAuthService } from './_services/company-auth.service';
import { CompanyService } from './_services/company.service';
import { CompanyProposeResolver } from './_resolvers/company-propose.resolver';
import { ScientificAreaResolver } from './_resolvers/scientific-area.resolver';
import { ExternalMentorService } from './_services/external-mentor.service';
import { ErrorInteceptorProvider } from './_services/error.interceptor';
import { NewMentorModalComponent } from './new-mentor-modal/new-mentor-modal.component';
import { ScientificAreaService } from './_services/scientific-area.service';
import { ProposeProjectService } from './_services/propose-project.service';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { ProjectService } from './_services/project.service';
import { NumbersResolver } from './_resolvers/numbers.resolver';
import { ApprovingProjectComponent } from './approving-project/approving-project.component';
import { ProposedProjectsResolver } from './_resolvers/proposed-projects.resolver';
import { EmployeesResolver } from './_resolvers/employees.resolver';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { ApprovedProjectComponent } from './approved-project/approved-project.component';
import { UpdateProjectProposalComponent } from './update-project-proposal/update-project-proposal.component';
import { ProposedProjectsCompanyResolver } from './_resolvers/proposed-projects-company.resolver';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [							
      AppComponent,
      HomeComponent,
      ProjectProposalComponent,
      NewMentorModalComponent,
      EmployeeLoginComponent,
      SidebarComponent,
      EmpDashboardComponent,
      ApprovingProjectComponent,
      ApprovedProjectComponent,
      UpdateProjectProposalComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      HttpClientModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth', 'localhost:5000/api/companyauth']
         }
      }),
      ModalModule.forRoot(),
      TooltipModule.forRoot()
   ],
   providers: [
      AlertifyService,
      ErrorInteceptorProvider,
      CompanyAuthService,
      CompanyService,
      CompanyProposeResolver,
      ExternalMentorService,
      ScientificAreaService,
      ScientificAreaResolver,
      ProposeProjectService,
      ProjectService,
      NumbersResolver,
      ProposedProjectsResolver,
      EmployeesResolver,
      ProjectsResolver,
      ProposedProjectsCompanyResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

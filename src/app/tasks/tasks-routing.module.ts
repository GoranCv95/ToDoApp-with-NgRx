import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskModifyComponent } from "./task-modify/task-modify.component";
import { TaskStartComponent } from "./task-start/task-start.component";
import { TasksResolverService } from "./tasks-resolver.service";
import { TasksComponent } from "./tasks.component";

const routes: Routes = [
    {
        path: '',
        component: TasksComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: TaskStartComponent },
          { path: 'new', component: TaskModifyComponent},
          { path: ':id', component: TaskDetailComponent, resolve: [TasksResolverService] },
          { path: ':id/modify', component: TaskModifyComponent, resolve: [TasksResolverService]}
        ],
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}
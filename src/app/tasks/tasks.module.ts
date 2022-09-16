import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskItemComponent } from "./task-list/task-item/task-item.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskModifyComponent } from "./task-modify/task-modify.component";
import { TaskStartComponent } from "./task-start/task-start.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TasksComponent } from "./tasks.component";

@NgModule({
    declarations: [
        TasksComponent,
        TaskListComponent,
        TaskDetailComponent,
        TaskItemComponent,
        TaskStartComponent,
        TaskModifyComponent
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, TasksRoutingModule]
})
export class TasksModule {

}
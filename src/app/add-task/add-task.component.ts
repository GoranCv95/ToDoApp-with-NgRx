import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Task } from '../tasks/task.model';
import { TaskService } from '../tasks/task.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskChangeSub: Subscription;

  constructor(
    private tasksService: TaskService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.taskChangeSub = this.store
      .select('task')
      .pipe(map((tasksState) => tasksState.tasks))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  onEditItem(index: number) {
    this.tasksService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }
}

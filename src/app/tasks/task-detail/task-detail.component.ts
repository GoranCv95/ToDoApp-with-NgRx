import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TasksAction from '../store/task.actions';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('task');
        }),
        map((tasksState) => {
          return tasksState.tasks.find((task, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((task) => {
        this.task = task;
      });
  }

  onModifyTask() {
    this.router.navigate(['modify'], { relativeTo: this.route });
  }

  onDeleteTask() {
    this.store.dispatch(new TasksAction.DeleteTask(this.id));
    this.router.navigate(['/tasks']);
  }
}

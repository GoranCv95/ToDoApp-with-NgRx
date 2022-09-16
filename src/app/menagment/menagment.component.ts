import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../tasks/task.model';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-menagment',
  templateUrl: './menagment.component.html',
  styleUrls: ['./menagment.component.css'],
})
export class MenagmentComponent implements OnInit, OnDestroy {
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];
  private taskChangeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.taskChangeSub = this.store.select('task')
    .pipe(map(tasksState => tasksState.tasks))
    .subscribe(
      (tasks: Task[]) => {
        this.todo = tasks;
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }
}

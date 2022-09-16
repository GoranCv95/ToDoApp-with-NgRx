import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Task } from './task.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../store/app.reducer';
import * as TaskAction from '../tasks/store/task.actions';

@Injectable({ providedIn: 'root' })
export class TasksResolverService implements Resolve<Task[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Task[] | Observable<Task[]> | Promise<Task[]> {
    return this.store.select('task').pipe(
      take(1),
      map((tasksState) => {
        return tasksState.tasks;
      }),
      switchMap((tasks) => {
        if (tasks.length === 0) {
          this.store.dispatch(new TaskAction.FetchTasks());
          return this.actions$.pipe(ofType(TaskAction.SET_TASKS), take(1));
        } else {
          return of(tasks);
        }
      })
    );
  }
}

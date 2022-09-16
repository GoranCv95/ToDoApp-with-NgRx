import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Task } from '../task.model';

import * as fromApp from '../../store/app.reducer';
import * as TasksActions from './task.actions';

@Injectable()
export class TaskEffects {
  @Effect()
  fetchTasks = this.actions$.pipe(
    ofType(TasksActions.FETCH_TASKS),
    switchMap(() => {
      return this.http.get<Task[]>(
        'https://ng-to-do-app-75be1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      );
    }),
    map((tasks) => {
        return tasks.map((task) => {
          return {
            ...task,
          };
        });
      }),
      map(tasks => {
        return new TasksActions.SetTasks(tasks);
      })
  );

  @Effect({dispatch: false})
  storeTasks = this.actions$.pipe(ofType(TasksActions.STORE_TASKS),
  withLatestFrom(this.store.select('task')),
  switchMap(([actionData, tasksState]) => {
    return this.http
      .put(
        'https://ng-to-do-app-75be1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        tasksState.tasks
      );
  }));

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}

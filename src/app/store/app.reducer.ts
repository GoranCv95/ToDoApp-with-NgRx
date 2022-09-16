import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTasks from '../tasks/store/task.reducer';

export interface AppState {
  auth: fromAuth.State;
  task: fromTasks.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  task: fromTasks.taskReducer,
};

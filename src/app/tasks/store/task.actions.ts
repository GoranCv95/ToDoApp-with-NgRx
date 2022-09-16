import { Action } from '@ngrx/store';
import { Task } from '../task.model';

export const SET_TASKS = '[Tasks] Set Tasks';
export const FETCH_TASKS = '[Tasks] Fetch Tasks';
export const ADD_TASK = '[Task] Add Task';
export const MODIFY_TASK = '[Task] Modify Task';
export const UPDATE_TASKS = '[Task] Update Task';
export const DELETE_TASK = '[Task] Delete Task';
export const STORE_TASKS = '[Task] Store Tasks';

export class SetTasks implements Action {
  readonly type = SET_TASKS;

  constructor(public payload: Task[]) {}
}

export class FetchTasks implements Action {
  readonly type = FETCH_TASKS;
}

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: Task) {}
}

export class ModifyTask implements Action {
  readonly type = MODIFY_TASK;

  constructor(public payload: { index: number; newTask: Task }) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASKS;

  constructor(public payload: { index: number; newTask: Task }) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: number) {}
}

export class StoreTasks implements Action {
  readonly type = STORE_TASKS;
}

export type TasksAction =
  | SetTasks
  | FetchTasks
  | AddTask
  | ModifyTask
  | UpdateTask
  | DeleteTask 
  | StoreTasks;

import { Task } from '../task.model';
import * as TasksActions from './task.actions';

export interface State {
  tasks: Task[];
}

const initialState: State = {
  tasks: [],
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TasksActions.SET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case TasksActions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TasksActions.MODIFY_TASK:
    case TasksActions.UPDATE_TASKS:
      const modifyTask = {
        ...state.tasks[action.payload.index],
        ...action.payload.newTask,
      };

      const modifyTasks = [...state.tasks];
      modifyTasks[action.payload.index] = modifyTask;
      return {
        ...state,
        tasks: modifyTasks
      };
    case TasksActions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task, index) => {
            return index !== action.payload;
        })
      };
    default:
      return state;
  }
}

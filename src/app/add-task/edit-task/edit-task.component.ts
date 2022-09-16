import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/tasks/task.model';
import { TaskService } from 'src/app/tasks/task.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TasksAction from '../../tasks/store/task.actions';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) taskForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Task;

  constructor(private taskService: TaskService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.taskService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.taskService.findTask(index);
        this.taskForm.setValue({
          title: this.editedItem.title,
          description: this.editedItem.description,
          person: this.editedItem.person,
          date: this.editedItem.date
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newTask = new Task(value.title, value.description, value.person, value.date);
    if(this.editMode){
      this.store.dispatch(new TasksAction.UpdateTask({index: this.editedItemIndex, newTask}))
    } else {
      this.store.dispatch(new TasksAction.AddTask(newTask))
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.taskForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.taskService.deleteTask(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

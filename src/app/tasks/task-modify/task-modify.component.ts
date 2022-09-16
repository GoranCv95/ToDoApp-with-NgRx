import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TasksAction from '../store/task.actions';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-modify',
  templateUrl: './task-modify.component.html',
  styleUrls: ['./task-modify.component.css'],
})
export class TaskModifyComponent implements OnInit, OnDestroy {
  id: number;
  modifyMode = false;
  taskForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.modifyMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.modifyMode) {
      this.store.dispatch(
        new TasksAction.ModifyTask({
          index: this.id,
          newTask: this.taskForm.value,
        })
      );
    } else {
      this.store.dispatch(new TasksAction.AddTask(this.taskForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let taskTitle = '';
    let taskDescription = '';
    let taskPerson = '';
    let taskDate = '';

    if (this.modifyMode) {
      this.storeSub = this.store
        .select('task')
        .pipe(
          map((tasksState) => {
            return tasksState.tasks.find((task, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((task) => {
          taskTitle = task.title;
          taskDescription = task.description;
          taskPerson = task.person;
          taskDate = task.date;
        });
    }

    this.taskForm = new FormGroup({
      title: new FormControl(taskTitle, Validators.required),
      description: new FormControl(taskDescription, Validators.required),
      person: new FormControl(taskPerson, Validators.required),
      date: new FormControl(taskDate, Validators.required),
    });
  }
}

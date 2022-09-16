import { Subject } from 'rxjs';
import { Task } from './task.model';

export class TaskService {
  tasksChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();

  // private tasks: Task[] = [
  //   new Task(
  //     'Protokolisati poštu',
  //     'Svu poštu pristiglu na adresu COFUS-a protokolisati i rasporedi u Excel filove COFUS Banjaluka i COFUS Sarajevo. Ukoliko ima i otpremne poštu, takođe u Excel filu protokolisati i nju.',
  //     'Damjan',
  //     new Date('2022-08-28').toDateString()
  //   ),
  //   new Task(
  //     'Rođendani - Drina osiguranje',
  //     'Pri dolasku u jutarnju smjenu, napraviti file sa klijentima Drina osiguranja, kojima je taj dan rođendana. File kreirati prema insturkcijama, koji se nalaze u file "Drina rođendani". U posebno kreiranu tablu upisati broj poslanih čestitki.',
  //     'Goran',
  //     new Date("2022-09-03").toDateString()
  //   ),
  //   new Task(
  //     'Grawe pozivi',
  //     'Po dostavljenom spisku Grawe klijenata, koji nisu na vrijeme uplatili premiju osiguranja, potrebno ih je sve pozvati, te obavijestiti o tome da je obavezna uplata do kraja mjeseca. U suprotnom osiguranik gubi pravo na pokriće.',
  //     'Milica',
  //     new Date("2022-08-31").toDateString()
  //   ),
  // ];
  private tasks: Task[] = [];

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }

  getTasks() {
    return this.tasks.slice();
  }

  findTask(index: number) {
    return this.tasks[index];
  }

  updateTask(index: number, newTask: Task) {
    this.tasks[index] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }

  getTask(id: number) {
    return this.tasks[id];
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
  }

  modifyTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }

  updateTaskList(index: number, newTask: Task) {
    this.tasks[index] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }
}

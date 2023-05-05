import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {switchMap} from 'rxjs/operators';
import { List } from 'src/app/models/list.module';
import { Task } from 'src/app/models/task.module';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: any;
  tasks: any;

  selectedListId!:string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.taskService.getLists().pipe(
          switchMap(lists => {
            this.lists = lists;
            this.selectedListId = params['listId'];
            console.log(this.selectedListId)
            return this.taskService.getTasks(params['listId']);
          })
        );
      })
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(()=>{
      //the task has been successfully completed
      task.completed = !task.completed;
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((response)=>{
      this.router.navigate(['/lists']);
      console.log(response);
    });
  }

  }

  


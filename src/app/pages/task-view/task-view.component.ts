import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: any;
  tasks: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.taskService.getLists().pipe(
          switchMap(lists => {
            this.lists = lists;
            return this.taskService.getTasks(params['listId']);
          })
        );
      })
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  }

  


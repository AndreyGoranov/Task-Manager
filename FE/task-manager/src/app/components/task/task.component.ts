import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }
  @Input() title: string;
  @Input() description: string;
  @Input() startedAt: number;

  ngOnInit(): void {
  }

}

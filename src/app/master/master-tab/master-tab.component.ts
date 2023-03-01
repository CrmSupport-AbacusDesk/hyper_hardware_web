import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-master-tab',
  templateUrl: './master-tab.component.html'
})
export class MasterTabComponent implements OnInit {

  constructor(public db: DatabaseService) { }

  ngOnInit() {
  }

}

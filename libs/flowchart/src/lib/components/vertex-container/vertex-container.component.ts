import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eossu-fc-vertex-container',
  templateUrl: './vertex-container.component.html',
  styleUrls: ['./vertex-container.component.scss']
})
export class VertexContainerComponent implements OnInit {

  @Input()
  selected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

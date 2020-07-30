import { Component } from '@angular/core';
import { LineStyle, IWorkspaceModel } from '@eossu/flowchart';

@Component({
  selector: 'eossu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  model: IWorkspaceModel = {
    edges: [],
    vertexs: [],
  };
  lineStyle = LineStyle.Curved;
}

import { Component } from '@angular/core';
import { LineStyle, IWorkspaceModel, IView } from '@eossu/flowchart';

@Component({
  selector: 'eossu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  view: IView = {
    height: '100%',
    width: '100%',
  };
  model: IWorkspaceModel = {
    edges: [],
    vertexs: [],
  };
  lineStyle = LineStyle.Curved;
}

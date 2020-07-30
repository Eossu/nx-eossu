import { Component } from '@angular/core';
import { LineStyle, IWorkspaceModel, IView, IVertex } from '@eossu/flowchart';

const vertexs: Array<IVertex> = [
  {
    id: '1dkfjf-dkfjei',
    x: 100,
    y: 100,
    radius: 5,
    height: 100,
    width: 250,
    category: { color: '#386e7d', name: 'General' },
  },
];

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
    vertexs: vertexs,
  };
  lineStyle = LineStyle.Curved;
}

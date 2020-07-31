import { Component } from '@angular/core';
import { LineStyle, IWorkspaceModel, IView, IVertex, ConnectorType, VertexType } from '@eossu/flowchart';
import { v4 as uuidv4 } from 'uuid';


const vertexs: Array<IVertex> = [
  {
    id: uuidv4(),
    type: VertexType.Rectangle,
    x: 100,
    y: 200,
    radius: 5,
    height: 80,
    width: 200,
    category: { color: '#9597a8', name: 'General' },
    connectors: [
      { 
        id: uuidv4(),
        type: ConnectorType.Right,
        radius: 5
      }
    ]
  },
  {
    id: uuidv4(),
    type: VertexType.Rectangle,
    x: 620,
    y: 100,
    radius: 5,
    height: 80,
    width: 200,
    category: { color: '#386e7d', name: 'General' },
    connectors: [
      { 
        id: uuidv4(),
        type: ConnectorType.Left,
        radius: 5
      },
      { 
        id: uuidv4(),
        type: ConnectorType.Right,
        radius: 5
      }
    ]
  },
  {
    id: uuidv4(),
    type: VertexType.Rectangle,
    x: 620,
    y: 300,
    radius: 5,
    height: 80,
    width: 200,
    category: { color: '#386e7d', name: 'General' },
    connectors: [
      { 
        id: uuidv4(),
        type: ConnectorType.Left,
        radius: 5
      },
      { 
        id: uuidv4(),
        type: ConnectorType.Right,
        radius: 5
      }
    ]
  },
  {
    id: uuidv4(),
    type: VertexType.Rectangle,
    x: 1150,
    y: 200,
    radius: 5,
    height: 80,
    width: 200,
    category: { color: '#9597a8', name: 'General' },
    connectors: [
      { 
        id: uuidv4(),
        type: ConnectorType.Left,
        radius: 5
      }
    ]
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

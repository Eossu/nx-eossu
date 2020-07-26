import { Injectable } from '@angular/core';
import { IVertex, IConnector } from '../flowchart.interfaces';
import { ConnectorType } from '../flowchart.enums';
import { AbstractFlowchartModels } from '../abstraction/models.abstraction';
import { FlowchartService } from './flowchart.service';

@Injectable()
export class ConnectorsService extends AbstractFlowchartModels<IConnector> {

  constructor(protected _flowchartService: FlowchartService) {
    super(_flowchartService)
  }

  /**
   * Returns all connectors of the given type.
   *
   * @param vertx - The vertex to get connectors from
   * @param type - The type of connector
   *
   * @returns An Array of connectors.
   */
  getConnectorsByType(vertex: IVertex, type: ConnectorType): Array<IConnector> {
    return vertex.connectors.filter((connector) => {
      return connector.type === type;
    });
  }
}

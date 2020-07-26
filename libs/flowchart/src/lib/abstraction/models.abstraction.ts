import { IConnector, IVertex, IEdge } from '../flowchart.interfaces';
import { FlowchartService } from '../services/flowchart.service';


export abstract class AbstractFlowchartModels<
  T extends IConnector | IVertex | IEdge
> {
  protected constructor(protected _flowchartService: FlowchartService) {}

  /**
   * Mark a flowchart model as selected.
   *
   * @param model - The model to mark as selected
   */
  select(model: T): void {
    this._flowchartService.selectModel(model);
  }

  /**
   * Deselect a flowchart model.
   *
   * @param model - Flowchart model to deselect
   */
  deselect(model: T): void {
    this._flowchartService.deselectModel(model);
  }

  /**
   * Toggle the selection of given flowchart model
   *
   * @param model - Model to toggle selection on.
   */
  toggle(model: T): void {
    this._flowchartService.toggleSelected(model);
  }

  /**
   * Check if the flowchart model is selected.
   *
   * @param model - Flowchart model to check.
   */
  isSelected(model: T): boolean {
    return this._flowchartService.isSelected(model);
  }

  /**
   * Check if the flowchart model is in edit mode.
   *
   * @param model - Flowchart model to check.
   */
  isEdit(model: T): boolean {
    return this._flowchartService.isEdit(model);
  }
}

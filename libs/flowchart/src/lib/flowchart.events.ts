import { IVertex, IEdge, IPoint2D } from './flowchart.interfaces';

export class SelectEvent {
  constructor(
    private _type: 'vertex' | 'edge',
    private _id: string,
    private _key: boolean
  ) {}

  get type(): string {
    return this._type;
  }

  get id(): string {
    return this._id;
  }

  get key(): boolean {
    return this._key;
  }
}

export class RenderEvent {
  constructor(
    private _id: string,
    private _pt1: IPoint2D,
    private _pt2?: IPoint2D
  ) {}

  get id(): string {
    return this._id;
  }

  get pt1(): IPoint2D {
    return this._pt1;
  }

  get pt2(): IPoint2D {
    return this._pt2;
  }
}

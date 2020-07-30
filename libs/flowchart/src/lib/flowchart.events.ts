import { IVertex, IEdge } from './flowchart.interfaces';

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

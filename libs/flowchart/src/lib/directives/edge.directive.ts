import { Directive, Input, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { IEdge } from '../flowchart.interfaces';
import { SelectEvent } from '../flowchart.events';
import { colorLuminance } from '../color.helpers';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit {
  @Input() edge: IEdge;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _originalColor: string;
  private readonly _lumChange = 0.12;

  constructor() {}

  ngOnInit(): void {
    if (!this.edge.color) {
      this.edge.color = '#fff';
    }
  }

  deselect(): void {
    this.edge.selected = false;
    this.changeFillColor(true);
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  onDbclick($event: MouseEvent): void {}

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent): void {}

  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {}

  @HostListener("mousemove", ["$event"])
  onMouseMove($event: MouseEvent): void {}

  private changeFillColor(original = false) {
    if (!this._originalColor) this._originalColor = this.edge.color;

    if (!original) {
      this.edge.category.color = colorLuminance(
        this._originalColor,
        this._lumChange
      );
    } else {
      this.edge.color = this._originalColor;
    }
  }

}

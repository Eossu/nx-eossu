import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerComponent } from './components/tower/tower.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TowerComponent],
  exports: [TowerComponent],
})
export class UiLoadersModule {}

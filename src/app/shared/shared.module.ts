import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, MatIconModule,FormsModule],
  exports: [TableViewComponent, MatIconModule]
})
export class SharedModule {}

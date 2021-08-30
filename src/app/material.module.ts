import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';


const modules = [
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule
]


@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }

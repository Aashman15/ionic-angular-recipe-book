import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrEditRecipePageRoutingModule } from './add-or-edit-recipe-routing.module';

import { AddOrEditRecipePage } from './add-or-edit-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOrEditRecipePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddOrEditRecipePage]
})
export class AddOrEditRecipePageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrEditRecipePage } from './add-or-edit-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddOrEditRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrEditRecipePageRoutingModule {}

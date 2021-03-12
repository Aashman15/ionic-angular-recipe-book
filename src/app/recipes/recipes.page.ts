import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipesService} from './recipes.service';
import {SubSink} from 'subsink';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  private subs = new SubSink();
  recipes: Recipe[];

  constructor(private recipesService: RecipesService, private router: Router) {
  }

  ngOnInit() {
    this.subs.sink = this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onAddRecipe(){
    this.router.navigate(['/recipes/add-new']).then();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesObs = new BehaviorSubject<Recipe[]>([
    {
      id: '1',
      title: 'Chicken',
      imageUrl: '../../assets/images/chicken.png',
      ingredients: ['masala', 'tel']
    },
    {
      id: '2',
      title: 'Momo',
      imageUrl:'../../assets/images/momo.png',
      ingredients: ['maida', 'golveda']
    }
  ]);

  constructor() {
  }

  getAllRecipes() {
    return this.recipesObs;
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipesObs.getValue().find(recipe => {
        return recipe.id === recipeId;
      })
    }
  }

  deleteRecipe(recipeId: string) {
    const recipes = this.recipesObs.getValue().filter(recipe => {
      return recipe.id !== recipeId;
    });
    this.recipesObs.next(recipes);
  }

  addRecipe(recipe: Recipe) {
    const recipes = this.recipesObs.getValue();
    recipe.id = recipes[recipes.length - 1].id + 1;
    recipes.push(recipe);
    this.recipesObs.next(recipes);
  }

  updateRecipe(recipeId: string, recipe: Recipe) {
    const recipes = this.recipesObs.getValue();
    const index = recipes.findIndex(recipe => recipe.id === recipeId);
    recipes[index] = recipe;
    this.recipesObs.next(recipes);
  }
}

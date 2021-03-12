import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubSink} from 'subsink';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-add-or-edit-recipe',
  templateUrl: './add-or-edit-recipe.page.html',
  styleUrls: ['./add-or-edit-recipe.page.scss'],
})
export class AddOrEditRecipePage implements OnInit, OnDestroy {
  private subs = new SubSink();
  isEditMode = false;
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private recipesService: RecipesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.buildRecipeForm();
    this.patchRecipe();
  }

  patchRecipe() {
    this.subs.sink = this.activatedRoute.params.subscribe((params) => {
      const recipeId = params['recipeId'];
      if (recipeId) {
        this.isEditMode = true;
        const recipe = this.recipesService.getRecipe(recipeId);
        if (recipe.ingredients){
          recipe.ingredients.forEach(() => {
            this.addIngredient();
          });
        }
        this.recipeForm.patchValue(recipe);
      }
    });
  }

  buildRecipeForm() {
    this.recipeForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getIngredient(index: number) {
    return this.ingredients.controls[index] as FormControl;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.createInvalidFormAlert();
      return;
    }
    if (!this.isEditMode) {
      this.recipesService.addRecipe(this.recipeForm.value);
      this.router.navigate([`/recipes`]).then();
    } else {
      const recipeId = this.recipeForm.get('id').value;
      this.recipesService.updateRecipe(recipeId, this.recipeForm.value);
      this.router.navigate([`/recipes/${recipeId}`]).then();
    }
  }

  createInvalidFormAlert() {
    this.alertCtrl.create({
      header: 'Invalid form',
      message: 'Please fill all the details correctly.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    }).then(alertEl => {
      alertEl.present().then();
    });
  }

}

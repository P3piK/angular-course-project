import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipe: Recipe;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.recipe = this.recipeService.getRecipe(this.id);
      } else {
        this.recipe = {
          name: '',
          description: '',
          imagePath: '',
          ingredients: [],
        };
      }

      this.initForm();
    });
  }

  onSubmit() {
    this.recipe.name = this.form.value['name'];
    this.recipe.imagePath = this.form.value['url'];
    this.recipe.description = this.form.value['desc'];
    this.recipe.ingredients = this.form.value['ingredients'];

    if (this.editMode) {
      this.recipeService.editRecipe(this.id, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
    console.log(this.recipeService.getRecipes());
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    let recipeIngredients = new FormArray([]);
    for (let ingredient of this.recipe.ingredients) {
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      );
    }

    this.form = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      desc: new FormControl(this.recipe.description, Validators.required),
      url: new FormControl(this.recipe.imagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get ingredientControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
        ]),
      })
    );
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
}

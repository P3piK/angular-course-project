import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 5',
      'A description of Test Recipe 1',
      'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-375x445-c.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Pasta', 2)]
    ),
    new Recipe(
      'Test Recipe 6',
      'A description of Test Recipe 2',
      'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-375x445-c.jpg',
      [new Ingredient('Spinach', 2), new Ingredient('Cucumber', 3)]
    ),
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private httpsClient: HttpClient
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addItems(ingredients);
  }

}

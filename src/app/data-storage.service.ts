import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  fetchData() {
    this.httpClient.get(
      'https://udemy-angular-7bcfe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).subscribe(response => {
        console.log(response);
    });
  }

  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(
      'https://udemy-angular-7bcfe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(response => {
        console.log(response);
    });
  }
}

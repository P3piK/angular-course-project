import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubject: Subscription;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipesSubject = this.recipeService.recipesChanged.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
      console.log('recipes');
    })
    
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
      this.recipesSubject.unsubscribe();
  }
}

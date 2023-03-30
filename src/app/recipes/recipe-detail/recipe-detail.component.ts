import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.params['id'];
    this.route.params.subscribe((param) => {
      this.recipe = this.recipeService.getRecipe(+param['id']);
    });
  }
  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onDeleteItem() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }
}

import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  itemsChanged = new Subject<Ingredient[]>();
  itemEdited = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  addItem(item: Ingredient) {
    this.ingredients.push(item);
    this.itemsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  editItem(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.itemsChanged.next(this.ingredients.slice());
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.itemsChanged.next(this.ingredients.slice());
  }
}

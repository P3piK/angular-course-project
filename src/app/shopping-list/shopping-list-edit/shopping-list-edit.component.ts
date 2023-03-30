import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editMode = false;
  subription: any;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subription.unsubscribe();
  }

  ngOnInit(): void {
    this.subription = this.shoppingListService.itemEdited.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const ingredient = {
      name: this.form.value.name,
      amount: this.form.value.amount,
    };

    if (this.editMode) {
      this.shoppingListService.editItem(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addItem(ingredient);
    }
  }

  onClearForm() {
    this.reset();
  }

  onDeleteItem() {
    this.shoppingListService.deleteItem(this.editedItemIndex);
    this.reset();
  }

  reset() {
    this.editMode = false;
    this.form.reset();
  }
}

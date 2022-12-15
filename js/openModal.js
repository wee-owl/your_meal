import {modalProduct,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsList,
  ingredientsCalories,
  modalProductPriceCount,
  modalProductBtn}
from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";


export const openModal = async (id) => {
  const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);

  modalProductTitle.textContent = product.title;
  modalProductImage.src = `${API_URL}/${product.image}`;
  modalProductDescription.textContent = product.description;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  modalProductPriceCount.textContent = product.price;
  modalProductBtn.dataset.idProduct = product.id;

  ingredientsList.textContent = '';
  // 1 вариант заполнения поля Состав
  /*
  for (let i = 0; i < product.ingredients.length; i++) {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = product.ingredients[i];
    ingredientsList.append(li);
  }
  */

  // 2 вариант заполнения поля Состав
  /*
  product.ingredients.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    ingredientsList.append(li);
  })
  */
  // 3 вариант заполнения поля Состав
  const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li
  })
  ingredientsList.append(...ingredientsListItems);

  modalProduct.classList.add('modal_open');
}
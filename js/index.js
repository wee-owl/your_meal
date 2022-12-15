import { catalogList, modalProduct } from "./elements.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from "./navigationListController.js";
import { cartInit } from "./cart.js";


catalogList.addEventListener('click', (e) => {
  if (e.target.closest('.product__detail') || e.target.closest('.product__image')) {
    const id = e.target.closest('.product').dataset.idProduct;
    openModal(id);
  }
});


modalProduct.addEventListener('click', (e) => {
  if (e.target.closest('.modal__close') || (e.target === modalProduct)) {
    modalProduct.classList.remove('modal_open');
  }
});


const init = () => {
  renderListProduct();
  navigationListController(renderListProduct);
  cartInit();
};

init();
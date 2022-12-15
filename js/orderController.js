import { clearCart } from "./cart.js";
import { modalRadioDelivery, modalFieldsetInput, modalRadioPickup, modalFieldsetRadio, modalDeliveryForm, modalDeliveryContainer } from "./elements.js";


export const orderController = (getCart) => {
  modalFieldsetRadio.addEventListener('click', () => {
    if (modalRadioPickup.checked === true) {
      modalFieldsetInput.disabled = true;
    } else if (modalRadioDelivery.checked === true) {
      modalFieldsetInput.disabled = false;
    }
  });

  modalDeliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(modalDeliveryForm);
    const data = Object.fromEntries(formData);
    data.order = getCart();

    fetch('https://reqres.in/api/users', {
      method: 'post',
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(response => {
        clearCart()
        modalDeliveryForm.reset()
        modalDeliveryContainer.innerHTML = `
          <h2>Спасибо за заказ!</h2>
          <h3>Номер заказа ${response.id}</h3>
          <p>Состав заказа:</p>
        `;

        const ul = document.createElement('ul');
        data.order.forEach(item => {
          ul.insertAdjacentHTML('beforeend', `<li>${item.id}</li>`);
        });

        modalDeliveryContainer.insertAdjacentElement('beforeend', ul);
      });
  })
};
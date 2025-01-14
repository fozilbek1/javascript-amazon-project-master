import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, Cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll(async () => {
    await loadProductsFetch();   //.then(() => {
      // done(); //let's us control when to go to the next step
    //});
  });

  beforeEach(() => { 
    // Spy on localStorage methods before the class instantiation
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2' 
      }]);
    });

    // Initialize the DOM container
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-checkout-header-middle-section"></div>
    <div class="js-payment-summary"></div>
  `;

    // Create a new instance of Cart to ensure loadFromStorage is triggered
    const testCart = new Cart('cart');

    // Replace the existing cart with the test cart instance
    Object.assign(cart, testCart);

    // Render the order summary
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container')
    .innerHTML = '';
  });

  it('displays the cart', () => {
      expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(2);
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 2');
      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1');
      expect(
        document.querySelector(`.js-product-name-${productId1}`).innerText
      ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toEqual('Intermediate Size Basketball');
      expect(
        document.querySelector(`.js-product-price-${productId1}`).innerText
      ).toContain('$');
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toContain('$');
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  })
});






// import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
// import { cart } from "../../data/cart.js";

// describe('test suite: rednerOrderSummary', () => {
//   const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
//   const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

//   beforeEach(() => {
//     spyOn(localStorage, 'setItem');

//     document.querySelector('.js-test-container')
//     .innerHTML = `
    
//     <div class="js-order-summary"></div>
//     <div class="js-checkout-header-middle-section"></div>
//     <div class="js-payment-summary"></div>
    
//     `;

//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: productId1,
//         quantity: 2,
//         deliveryOptionId: '1'
//       },
//       {
//         productId: productId2,
//         quantity: 1,
//         deliveryOptionId: '2' 
//       }]);
//     });
//     loadFromStorage();

//     renderOrderSummary();
//   });

//   afterEach(() => {
//     document.querySelector('.js-test-container')
//     .innerHTML = '';
//   });

//   it('displays the cart', () => {
//       expect(
//         document.querySelectorAll('.js-cart-item-container').length
//       ).toEqual(2);
//       expect(
//         document.querySelector(`.js-product-quantity-${productId1}`).innerText
//       ).toContain('Quantity: 2');
//       expect(
//         document.querySelector(`.js-product-quantity-${productId2}`).innerText
//       ).toContain('Quantity: 1');
//       expect(
//         document.querySelector(`.js-product-name-${productId1}`).innerText
//       ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
//       expect(
//         document.querySelector(`.js-product-name-${productId2}`).innerText
//       ).toEqual('Intermediate Size Basketball');
//       expect(
//         document.querySelector(`.js-product-price-${productId1}`).innerText
//       ).toContain('$');
//       expect(
//         document.querySelector(`.js-product-price-${productId2}`).innerText
//       ).toContain('$');
//   });

//   it('removes a product', () => {
//     document.querySelector(`.js-delete-link-${productId1}`).click();
//     expect(
//       document.querySelectorAll('.js-cart-item-container').length
//     ).toEqual(1);
//     expect(
//       document.querySelector(`.js-cart-item-container-${productId1}`)
//     ).toEqual(null);
//     expect(
//       document.querySelector(`.js-cart-item-container-${productId2}`)
//     ).not.toEqual(null);
//     expect(cart.length).toEqual(1);
//     expect(cart[0].productId).toEqual(productId2);
//   });

//   it('updates the delivery option', () => {
//     document.querySelector(`.js-delivery-option-${productId1}-3`).click();

//     expect(
//       document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
//     ).toEqual(true);

//     expect(cart.length).toEqual(2);
//     expect(cart[0].productId).toEqual(productId1);
//     expect(cart[0].deliveryOptionId).toEqual('3');

//     expect(
//       document.querySelector('.js-payment-summary-shipping').innerText
//     ).toEqual('$14.98');
//     expect(
//       document.querySelector('.js-payment-summary-total').innerText
//     ).toEqual('$63.50');
//   })
// });
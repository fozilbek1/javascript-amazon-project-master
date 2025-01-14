import { cart, Cart } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    // Create a new instance of Cart to ensure loadFromStorage is triggered
    const testCart = new Cart('cart');

    // Replace the existing cart with the test cart instance
    Object.assign(cart, testCart);
  });

  it('adds an existing product to the cart', () => {
    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    // Reinitialize the cart to pick up the mocked getItem value
    const testCart = new Cart('cart');
    Object.assign(cart, testCart);

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '1'
      }])
    );
  });

  it('adds a new product to the cart', () => {
    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([]);
    });

    // Reinitialize the cart to pick up the mocked getItem value
    const testCart = new Cart('cart');
    Object.assign(cart, testCart);

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]'
    );
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    const testCart = new Cart('cart');
    Object.assign(cart, testCart);
  });

  it('removes a product from the cart', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('does nothing if product is not in the cart', () => {
    cart.removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});

describe('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    const testCart = new Cart('cart');
    Object.assign(cart, testCart);
  });

  it('updates the delivery option of a product', () => {
    cart.updateDeliveryOption(productId1, '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '3'
    }]));
  });

  it('returns a warning if the delivery option does not exist', () => {
    cart.updateDeliveryOption(productId1, 'does-not-exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});




// import { cart, Cart  } from "../../data/cart.js";

// describe('test suite: addToCart', () => {
//   beforeEach(() => {
//     spyOn(localStorage, 'setItem');

//     const testCart = new Cart('cart');

//     Object.assign(cart, testCart);
//   });


//   it('adds an existing product to the cart', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: '1'
//       }]);
//     });

//     cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems[0].quantity).toEqual(3);
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       'cart', 
//       JSON.stringify([{
//       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity: 3,
//       deliveryOptionId: '1'
//     }])
//   );
//   });

//   it('adds a new product to the cart', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([]);
//     });
    

//     cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     console.log(cart)
//     expect(cart.cartItems.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems[0].quantity).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       'cart', 
//       '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]'
//     );
//   });
// });

// describe('test suite: removeFromCart', () => {
//   beforeEach(() => {
//     spyOn(localStorage, 'setItem');
//   });

//   it('removes a product from the cart', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 1,
//         deliveryOptionId: '1'
//       }]);
//     });

//     cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems.length).toEqual(0);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
//   });

//   it('does nothing if product is not in the cart', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 1,
//         deliveryOptionId: '1'
//       }]);
//     });

//     cart.removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
//     expect(cart.cartItems.length).toEqual(1);
//     expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
//       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity: 1,
//       deliveryOptionId: '1'
//     }]));
//   });
// });

// describe('test suite: updateDeliveryOption', () => {
//   const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
//   const fakeProductId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c64';

//   beforeEach(() => {
//     spyOn(localStorage, 'setItem');
//   });


//   it('updates the delivery option of a product', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: productId1,
//         quantity: 1,
//         deliveryOptionId: '1'
//       }]);
//     });

//     cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
//     expect(cart.cartItems.length).toEqual(1);
//     expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems[0].quantity).toEqual(1);
//     expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
//       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity: 1,
//       deliveryOptionId: '3'
//     }]));
//   })

//   it('returns a warning if the delivery option does not exist', () => {
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 1,
//         deliveryOptionId: '1'
//       }]);
//     });

//     cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
//     expect(cart.cartItems.length).toEqual(1);
//     expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.cartItems[0].quantity).toEqual(1);
//     expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
//     expect(localStorage.setItem).toHaveBeenCalledTimes(0);
//   });
// });
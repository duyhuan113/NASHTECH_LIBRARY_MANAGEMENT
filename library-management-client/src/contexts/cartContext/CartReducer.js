const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  const { cartItems } = state;
  switch (action.type) {
    case "ADD_ITEM":
      if (!cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(cartItems.filter((item) => item.id !== action.payload.id)),
        cartItems: [
          ...cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "INCREASE":
      cartItems[cartItems.findIndex((item) => item.id === action.payload.id)]
        .quantity++;
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case "DECREASE":
      cartItems[cartItems.findIndex((item) => item.id === action.payload.id)]
        .quantity--;
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};

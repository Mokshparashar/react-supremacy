// import CartItem from "./CartItem";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    const newRemovedDataSet = new Map(state.cart);
    newRemovedDataSet.delete(action.payload.id);
    return { ...state, cart: newRemovedDataSet };
  }
  if (action.type === INCREASE) {
    const newIncreasedSet = new Map(state.cart);
    const targetedId = action.payload.id;
    const getTheElement = newIncreasedSet.get(targetedId);

    const increasedUpdatedSet = {
      ...getTheElement,
      amount: getTheElement.amount + 1,
    };

    newIncreasedSet.set(targetedId, increasedUpdatedSet);

    return { ...state, cart: newIncreasedSet };
  }
  if (action.type === DECREASE) {
    const newDecreasedSet = new Map(state.cart);
    const targetedId = action.payload.id;
    const getTheElement = newDecreasedSet.get(targetedId);

    if (getTheElement.amount === 1) {
      // newDecreasedSet.delete(targetedId);
      // return { ...state, newDecreasedSet };
      const newRemovedDataSet = new Map(state.cart);
      newRemovedDataSet.delete(action.payload.id);
      return { ...state, cart: newRemovedDataSet };
    }
    const decreaseUpdatedSet = {
      ...getTheElement,
      amount: getTheElement.amount - 1,
    };

    newDecreasedSet.set(targetedId, decreaseUpdatedSet);

    return { ...state, cart: newDecreasedSet };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newTypeItems = action.payload.jsonData.map((item) => [item.id, item]);

    const mappedItems = new Map(newTypeItems);
    return { ...state, loading: false, cart: mappedItems };
  }
};
export default reducer;

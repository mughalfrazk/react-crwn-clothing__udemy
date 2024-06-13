import { useDispatch, useSelector } from 'react-redux';

import {
  addProductToCart,
  removeProductToCart,
  clearProductFromCart,
} from '../../redux/cart/cart.action';
import './checkout-item.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  const addProductToCartHandler = () =>
    dispatch(addProductToCart(cartItems, cartItem));
  const removeProductToCartHandler = () =>
    dispatch(removeProductToCart(cartItems, cartItem));
  const clearProductFromCartHandler = () =>
    dispatch(clearProductFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeProductToCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addProductToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearProductFromCartHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;

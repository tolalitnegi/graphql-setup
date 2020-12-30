
// Muation component instead of query component from react Apollo
// The purpose of this container is to pass a mutaion method (toggleCartHidden)
//  to the react cart icon component, 
import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

// same as in resolver
const TOGGLE_CART_HIDDEN = gql`
mutation ToggleCartHidden {
  toggleCartHidden @client
}
`;

const CartIconContainer = () =>  (
<Mutation mutation={TOGGLE_CART_HIDDEN}>
    {
      toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} />
    }
  </Mutation>);


export default CartIconContainer;
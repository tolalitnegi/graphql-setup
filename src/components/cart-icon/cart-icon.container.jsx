
// Muation component instead of query component from react Apollo
// The purpose of this container is to pass a mutaion method (toggleCartHidden)
//  to the react cart icon component, 
import React from 'react';
// import { Query, Mutation } from 'react-apollo';

import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';

import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

// same as in resolver
const TOGGLE_CART_HIDDEN = gql`
mutation ToggleCartHidden {
  toggleCartHidden @client
}
`;

const GET_CART_ITEM_COUNT = gql`
{
  itemCount @client
}
`;


// const CartIconContainer = () => (
//   <Query query={GET_CART_ITEM_COUNT}>

//     {
//     ({data: { itemCount }}) => 
//       (
//         <Mutation mutation={TOGGLE_CART_HIDDEN}>
//           {
//             toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//           }
//         </Mutation>
//       )
//     }

//   </Query>
// );

// Using Compose / Flow instead of Query Mutation Pattern
// which is quite closer to redux HOC connect 
const CartIconContainer = (props) => {
  const { data: { itemCount }, toggleCartHidden } = props;

  console.log('CartIconContainer props after flowRight', props);
  /*
    data: {variables: {…}, refetch: ƒ, fetchMore: ƒ, updateQuery: ƒ, startPolling: ƒ, …}
    toggleCartHidden: ƒ (mutationFunctionOptions)
    toggleCartHiddenResult: {called: false, loading: false, client: ApolloClient}
  */
  return (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
  );
};



// hoc component method:  to wrap and pass props query and mutation outcomes as Props to the component
export default flowRight(
  graphql(GET_CART_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' }) 
  // 2nd arg is configuration, different  name else data by default
)(CartIconContainer);
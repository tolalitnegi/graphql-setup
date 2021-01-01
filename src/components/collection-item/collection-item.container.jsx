import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionItem from './collection-item.component';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!){
    addItemToCart(item: $item) @client
  }
`;
// the addItemToCart(item: $item) @client is the same mutationd defined in the resolver file

// passing variable to mutation
const CollectionItemContainer = (props) => {
  return (
    <Mutation mutation={ADD_ITEM_TO_CART}>
      {
        addItemToCart => // muation function  
          <CollectionItem
            {...props}
            addItem={item => addItemToCart( // addItem prop is now changed to call the mutation
              {
                variables: {
                  item // pass the item as a varible to the mutation
                }
              })}
          />
      }
    </Mutation>
  )
};

export default CollectionItemContainer;

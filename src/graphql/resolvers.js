// same as reducer

import { gql } from 'apollo-boost';
import {addItemToCart, getCartItemCount } from './cart.utils';


// define the  schema attributes 
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }

`;
// the ToggleCartHidden mutation always(!) returns Boolean
// the AddItemToCart mutation always(!) takes items as parameter and always(!) returns Array of Items



//@client is client side for apollo
const GET_CART_HIDDEN_QUERY = gql`
{
  cartHidden @client
}
`;
const GET_CART_ITEMS = gql`
{
  cartItems @client
}
`;

const GET_CART_ITEM_COUNT = gql`
{
  itemCount @client
}
`;


// resolver : type of cache Apollo has access on client side
// Kind of a reducer
export const resolvers = {
  Mutation: {
    /**
     * 
     * @param {*} _root : top level object which holds everything like Collection, empty in our case 
     * @param {*} _args : Arguments we can get access to inside our muation or query like {title: title}
     * @param {*} _context : Cache and client which apollo has access to _context = {cache, client}
     * @param {*} _info : either query or mutation, not in use.
     */
    toggleCartHidden: (_root, _args, _context, _info) => {

      const { cache } = _context;

      const data = cache.readQuery({
        query: GET_CART_HIDDEN_QUERY,
        variable: {}
      });

      const { cartHidden } = data; // we get from the query above , now toggle

      cache.writeQuery({
        query: GET_CART_HIDDEN_QUERY,
        data: {
          cartHidden: !cartHidden // like setState
        }
      });

      return !cartHidden; // also return the toggled value from the mutation
    },

    //another mutation
    addItemToCart: (_root, _args, _context, _info) => {
      const { item } = _args; // new item to add to cart
      const { cache } = _context;

      const {cartItems}  = cache.readQuery({ // existing items in the cart
        query: GET_CART_ITEMS,
      });

      const newCartItems = addItemToCart(cartItems, item);
      cache.writeQuery({
        query: GET_CART_ITEM_COUNT,
        data: {itemCount: getCartItemCount(newCartItems)}
      })

      cache.writeQuery({ // updating the cache with new list
        query: GET_CART_ITEMS,
        data: {
          cartItems : newCartItems
        }
      });

      return newCartItems;

    }
  }
}
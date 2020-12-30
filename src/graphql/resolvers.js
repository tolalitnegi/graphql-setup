// same as reducer

import {gql} from 'apollo-boost';

// define the smae schema

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;
// the ToggleCartHidden mutation always(!) returns Boolean



//@client is client side for apollo
const GET_CART_HIDDEN_QUERY = gql`
{
  cartHidden @client
}
`;


// resolver : type of cache Apollo has access on client side
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

      const {cache } = _context;

      const data = cache.readQuery({
        query: GET_CART_HIDDEN_QUERY,
        variable: {}
      });

      const {cartHidden} = data; // we get from the query above , now toggle

      cache.writeQuery({
        query: GET_CART_HIDDEN_QUERY,
        data: {
          cartHidden: !cartHidden // like setState
        }
      });

      return !cartHidden; // also return the toggled value from the mutation

    }
  }
}
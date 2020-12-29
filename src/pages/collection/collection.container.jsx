import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';


//query jql
/**
 * Define query which takes dynamically passed title (titlePassed)
 */
const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($titlePassed: String!) { 
    getCollectionsByTitle(title : $titlePassed) {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
    }
  }
`;

const CollectionPageContainer = ({ match }) => {
  return (
    <Query query={GET_COLLECTIONS_BY_TITLE} variables={{ titlePassed: match.params.collectionId }}>
      {
        ({ loading, error, data }) => {

          if (loading) return <Spinner />;

          const { getCollectionsByTitle } = data; // data is undefined till loading is false

          return <CollectionPage collection={getCollectionsByTitle} />
        }
      }
    </Query>
  )
}

export default CollectionPageContainer;
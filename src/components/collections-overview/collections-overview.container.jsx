// graphql container component

import React from 'react';
import { Query } from 'react-apollo';
// react component for Graphql Query

import { gql } from 'apollo-boost';
// to write the query

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
{
  collections {
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

/**
 * Callback method of the <Query> element 
 * loading - query in progress
 * error
 * data - if success results are wrapped inside data 
 * @param {*} param0 
 */
const callbackMethod = ({ loading, error, data }) => {
  console.log({ loading });
  console.log({ error });
  console.log({ data });
  if (loading) {
    return <Spinner />
  }
  return <CollectionsOverview collections={data.collections} />
};


const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {callbackMethod}
    </Query>);
}

export default CollectionsOverviewContainer;
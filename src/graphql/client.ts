import { InMemoryCache, ApolloClient } from '@apollo/client';

const apolloClient = new ApolloClient({
     uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
     cache: new InMemoryCache({
          typePolicies: {
               AttributeSet: {
                    //specify custom id to avoid attribute sets being overriden
                    keyFields: ['id', 'items', ['id']],
               },
          },
     }),
});

export default apolloClient;

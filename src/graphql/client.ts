import { InMemoryCache, ApolloClient } from '@apollo/client';

const apolloClient = new ApolloClient({
     uri: 'http://localhost:4000/graphql',
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

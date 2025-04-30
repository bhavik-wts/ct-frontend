import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy/graphql`, // Update to use environment variable for base URL
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
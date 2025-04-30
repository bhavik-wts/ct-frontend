import { print } from "graphql"; // Import print function
import { handleGraphQLErrors } from "../utils/error-handling";

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy/graphql`;

export async function fetchData(query, variables = {}) {
    try {
        console.log("GRAPHQL_ENDPOINT", GRAPHQL_ENDPOINT);

        // Convert GraphQL AST to string if needed
        const queryString = typeof query === "string" ? query : print(query);

        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
            body: JSON.stringify({ query: queryString, variables }),
            cache: "no-store", // 💡 This tells Next.js to never cache responses
        });

        const responseData = await response.json();

        console.log("responseData --", responseData);

        const { data, errors } = responseData;
        handleGraphQLErrors(errors);

        return data;
    } catch (error) {
        console.error("GraphQL query failed:", error);
        throw error;
    }
}

export async function executeMutation(mutation, variables = {}) {
    try {
        // Convert GraphQL AST to string if needed
        const mutationString = typeof mutation === "string" ? mutation : print(mutation);

        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: mutationString, variables }),
            cache: "no-store", // 💡 This tells Next.js to never cache responses

        });

        const responseData = await response.json();
        console.log("response --", responseData);

        const { data, errors } = responseData;
        handleGraphQLErrors(errors);

        return data;
    } catch (error) {
        console.error("GraphQL mutation failed:", error);
        throw error;
    }
}

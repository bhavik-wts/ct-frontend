// src/utils/error-handling.js

import { ApolloError } from '@apollo/client';

// Define custom error types
export const ErrorType = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    GRAPHQL_ERROR: 'GRAPHQL_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Function to create custom errors
export function createCustomError(message, type, details) {
    const error = new Error(message);
    error.type = type;
    if (details) error.details = details;
    return error;
}

// Function to handle GraphQL errors
export function handleGraphQLErrors(error) {
    if (error instanceof ApolloError) {
        // Handle network errors
        if (error.networkError) {
            return createCustomError('Network error occurred', ErrorType.NETWORK_ERROR, error.networkError);
        }

        // Handle GraphQL errors
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            const graphQLError = error.graphQLErrors[0];
            // You can add more specific error handling based on the error codes or messages
            return createCustomError(graphQLError.message, ErrorType.GRAPHQL_ERROR, graphQLError);
        }
    }

    // Handle other types of errors
    return createCustomError(error?.message, ErrorType.UNKNOWN_ERROR, error);
}

// Function to log errors
export function logError(error) {
    console.error(`[${error.type}] ${error.message}`, error.details || '');
    // You can add more sophisticated logging here, such as sending to a logging service
}

// Function to get user-friendly error message
export function getUserFriendlyErrorMessage(error) {
    switch (error.type) {
        case ErrorType.NETWORK_ERROR:
            return 'Unable to connect to the server. Please check your internet connection.';
        case ErrorType.GRAPHQL_ERROR:
            return 'An error occurred while fetching data. Please try again later.';
        case ErrorType.VALIDATION_ERROR:
            return 'Please check your input and try again.';
        case ErrorType.NOT_FOUND:
            return 'The requested resource was not found.';
        case ErrorType.UNAUTHORIZED:
            return 'You are not authorized to perform this action.';
        case ErrorType.INTERNAL_SERVER_ERROR:
            return 'An internal server error occurred. Please try again later.';
        default:
            return 'An unexpected error occurred. Please try again later.';
    }
}

// Example usage in a component or page
export async function fetchDataSafely(fetchFunction) {
    try {
        return await fetchFunction();
    } catch (error) {
        const customError = handleGraphQLErrors(error);
        logError(customError);
        throw customError;
    }
}

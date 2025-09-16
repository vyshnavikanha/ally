# Ally GraphQL API

A GraphQL API built with TypeScript and GraphQL Yoga.  
Implementation demonstrates managing user addresses, creating new records, validating requests, logging details, and returning responses with request metadata.  

## Features Implemented

### Ticket 1: Address Schema Update
- Added a `state` field to the address schema
- Updated TypeScript types to stay consistent with the GraphQL schema

### Ticket 2: Create Address Mutation
- Implemented a mutation to save a username and address into `addresses.json`
- New records are appended without overwriting existing ones
- GraphQL inputs and TypeScript interfaces provide strong typing

### Ticket 3: Client Header Validation
- Required client header for every request
- Requests without this header are rejected with consistent error messages

### Ticket 4: Logging Enhancement
- Logs now include the client header along with `requestId`
- Improves observability and traceability for debugging

### Ticket 5: Response Metadata
- Added `requestId` from the context object to all responses
- Provides traceable responses with both data and metadata

## Database Layer
- Dedicated layer manages all read and write operations to `addresses.json`
- Resolvers interact only with this layer instead of directly modifying the file
- Keeps code modular and allows easy migration to a real database in the future

## useHeaderValidator Plugin
- Reusable Envelop plugin validates the presence of the client header
- Centralized validation avoids duplication across resolvers
- Includes a skip option for introspection queries so GraphQL Playground is not blocked

## Implementation Notes

### 1. Ensuring GraphQL schema types and TypeScript types match
- GraphQL Code Generator was used to generate TypeScript types from the schema
- Guarantees consistency between schema and code, preventing runtime mismatches

### 2. Returning consistent, user-friendly error messages
- Shared error-handling pattern ensures all resolvers return clear and consistent messages
- Invalid inputs or missing headers are handled gracefully without exposing internal details

### 3. Nesting the address object inside a larger schema
- Schema defines a `User` type that includes `address` as one of its fields

### 4. Avoiding duplication across resolvers
- Common functionality such as header validation, logging, and error handling is implemented with Envelop plugins
- This eliminates repeated code and keeps resolvers focused on business logic


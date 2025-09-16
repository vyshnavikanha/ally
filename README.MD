#### Database Layer
- Dedicated layer manages all read and write operations to `addresses.json`
- Resolvers interact only with this layer instead of directly modifying the file
- Keeps code modular and allows easy migration to a real database in the future
- A `Table` interface is defined to provide structure and consistency for interacting with different data sets, making the layer reusable and extendable

#### useHeaderValidator Plugin
- Reusable Envelop plugin validates the presence of the client header
- Includes a skip option for introspection queries so GraphQL Playground is not blocked

#### Implementation Notes

##### 1. Ensuring GraphQL schema types and TypeScript types match
- GraphQL Code Generator could be used to generate TypeScript types from the schema
- This ensures consistency between schema and code, preventing runtime mismatches

##### 2. Returning consistent, user-friendly error messages
- A shared error-handling pattern could be applied so all resolvers return clear and consistent messages
- Invalid inputs or missing headers can be handled gracefully without exposing internal details

##### 3. Nesting the address object inside a larger schema
- The schema can define a `User` type that includes `address` as one of its fields
- GraphQL fragments can then be used in queries to reuse the address selection across multiple operations

##### 4. Avoiding duplication across resolvers
- Common functionality such as header validation, logging, and error handling can be implemented with Envelop plugins
- This avoids repeated code and keeps resolvers focused on business logic

##### Ticket 1: Address Schema Update
- Added a `state` field to the address schema
- Updated TypeScript types to stay consistent with the GraphQL schema

##### Ticket 2: Create Address Mutation
- Implemented a mutation to save a username and address into `addresses.json`
- New records are appended without overwriting existing ones
- GraphQL inputs and TypeScript interfaces provide strong typing

##### Ticket 3: Client Header Validation
- Required client header for every request
- Requests without this header are rejected with consistent error messages

##### Ticket 4: Logging Enhancement
- Logs now include the client header along with `requestId`
- Improves observability and traceability for debugging

##### Ticket 5: Response Metadata
- Added `requestId` from the context object to all responses
- Provides traceable responses with both data and metadata



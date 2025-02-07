# Phantom-Token-Architecture-Example
An example of phantom token architecture for OAuth for https://www.tylerpinho.com/blog/phantom-token-architecture

## Getting Started
To run all 3 solutions: the Auth Server, the Orders API, and the Client Call Example, you will need to run the 'npm start' command in the root of the directory. This will spin up the two APIs and then make the API call to the Orders API and output the results.

You can also use Postman to hit the APIs directly instead of using the Client Call Example as well.

## How It All Works Together
1. The client gets a reference token from the Identity Server.
2. The client sends the reference token to the API.
3. The API exchanges the reference token for a JWT by calling the Identity Server’s introspection endpoint.
4. The API uses the JWT to authorize the request and return the appropriate data.
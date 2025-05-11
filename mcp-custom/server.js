import { Server } from 'http';
import { GraphQLServer } from 'graphql-tools';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthenticationError } from 'apollo-server';
import { Client } from '@mcp/client';

const mcpClients = {
  client1: new Client('http://mcpserver1.com'),
  client2: new Client('http://mcpserver2.com')
};

const mcpClientMap = {
  client1: mcpClients.client1,
  client2: mcpClients.client2
};

const graphqlServer = new GraphQLServer({
  typeDefs: `
    type Query {
      auth: String
      user(id: ID!): User
    }
    type Mutation {
      createUser(name: String!): User
    }
    type User {
      id: ID!
      name: String!
    }
  `,
  resolvers: {
    Query: {
      async auth(_, { client }) {
        if (!client) throw new AuthenticationError('Client not specified');
        const token = await mcpClientMap[client].getToken();
        return token;
      },
      user(_, { id }) {
        return users.find(user => user.id === id);
      }
    },
    Mutation: {
      async createUser(_, { name }) {
        const newUser = {
          id: users.length + 1,
          name
        };
        users.push(newUser);
        return newUser;
      }
    }
  },
  context: ({ client }) => ({
    client
  })
});

const server = new Server({
  httpServer: graphqlServer.expressApp,
  port: 4000
});

server.listen(4000, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
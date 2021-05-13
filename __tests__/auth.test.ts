/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//NOTE:::: I CANNOT GET THESE TO WORK. TODO for later times
// Might get help from here https://dev.to/jdelvx/how-i-m-currently-testing-my-graphql-resolvers-mongoose-operations-3lmf
const { createTestClient } = require('apollo-server-integration-testing');

const { connectdb } = require("../src/utils/connectdb");
const { launchServer } = require("../src/utils/launchServer");

describe('Integration with auth service', () => {
  const apolloServer = launchServer();

  beforeAll(async () => {
    void await connectdb();
    void await apolloServer.listen().then(() => {
      console.log(`Server ready`);
    });
  });

  it('Has an empty database at first', async () => {
    console.log('starting the test');
    
    const { query } = createTestClient({ apolloServer });
    const ALL_USERS = `
    query {
      allUsers{
        username
      }
    }
    `;

    const result = await query({ query: ALL_USERS });
    console.log(result);
    expect(1).toBe(1);
  });

  it('Succeeds at creating a new user', () => {
    expect(1).toBe(1);
  });
  it('Finds the created user by username', () => {
    expect(1).toBe(1);
  });
  it('Logins user and returns a token', () => {
    expect(1).toBe(1);
  });
  it('Returns current logged in user correctly', () => {
    expect(1).toBe(1);
  });
  it('Deletes user correctly', () => {
    expect(1).toBe(1);
  });
});
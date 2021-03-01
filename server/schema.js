
const {gql} = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type User{
    id:ID!
    name:String
    bio:String
    photo:String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getUserDetails(id: String!):User!,
    # getUserDetailsusingname(name:String!):User!,
  }
  type Mutation {
    addProfilePicture(
    id:ID!,
    photo:String!
    ):User!,
  }
`;
module.exports = typeDefs
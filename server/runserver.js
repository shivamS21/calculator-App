const {ApolloServer, gql} = require('apollo-server');
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shivam@123',
    database: 'student',
});
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected!');
});
const typeDefs = require('./schema');
function queryUsingID(uid) {
    return new Promise(function (resolve, reject) {
        con.query(
          `SELECT * FROM final where id=${uid};`,
          (error, result) => {
              if (error) {
                  return reject(error);
              } else {
                  return resolve(result[0]);
              }
          },
        );
    });
}
function changeDPusingID(uid, newRoute) {
    return new Promise(function (resolve, reject) {
        con.query(
          `UPDATE final set photo='${newRoute}' where id=${uid};`,
          (error, result) => {
              if (error) {
                  return reject(error);
              } else {
                  return resolve('Success');
              }
          },
        );
    });
}
const resolvers = {
    Query: {
      getUserDetails: async (parent, args) => {
            let ReturnedRow = await queryUsingID(args.id);
            return ReturnedRow;
        },
    },
    Mutation: {
        addProfilePicture: async (parent, args) => {
            let ReturnedString = await changeDPusingID(args.id, args.photo);
            if (ReturnedString === 'Success') {
                let ReturnedRowAM = await queryUsingID(args.id);
                return ReturnedRowAM;
            }
        },
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀✨  Server ready at ${url}`);
});
// server.listen(4000);

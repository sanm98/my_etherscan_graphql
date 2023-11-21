const { ApolloServer } = require("apollo-server"); // Import Apollo Server 
const { importSchema } = require("graphql-import"); // Import graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource 

require("dotenv").config(); // Load environment variables

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server instance
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Create EtherDataSource instance
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => { // Start Apollo Server
  console.log(`🚀 Server ready at ${url}`); 
});

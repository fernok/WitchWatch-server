// const express = require("express");
// const { postgraphile } = require("postgraphile");

// const app = express();

// app.use(
//     postgraphile(
//         process.env.RDS_URL || "postgres://postgres:ccpklpdb@ccp-klp-db-01.ckftskuwgris.us-east-1.rds.amazonaws.com/witchwatch",
//         "app",
//         {
//             watchPg: true,
//             graphiql: true,
//             enhanceGraphiql: true,
//         }
//     )
// );

// app.listen(process.env.PORT || 3000);

const pg = require("pg");
const { ApolloServer } = require("apollo-server");
const { makeSchemaAndPlugin } = require("postgraphile-apollo-server");

const pgPool = new pg.Pool({
    connectionString: process.env.DB_URL
});

async function main() {
    const { schema, plugin } = await makeSchemaAndPlugin(
        pgPool,
        'app',
        {
            dynamicJson: true,
            watchPg: true
        }
    );
  
    const server = new ApolloServer({
        schema,
        plugins: [plugin]
    });
  
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
}
  
main().catch(e => {
    console.error(e);
    process.exit(1);
});
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
        }
    );
  
    const server = new ApolloServer({
        schema,
        plugins: [plugin],
        playground: true,
    });
  
    // const { url } = await server.listen();
    const { url } = await server.listen(process.env.PORT || 5000);
    console.log(`🚀 Server ready at ${url}`);
}
  
main().catch(e => {
    console.error(e);
    process.exit(1);
});
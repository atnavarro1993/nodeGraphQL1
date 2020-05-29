const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql"); 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "holaMundo",
        fields:()=>({
            message:{
                type: GraphQLString,
                resolve:()=>"hola mundo"
            }
        })
    })
});

const port = 3000;
app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}));
app.listen(port,()=>{
    console.log("server is up");
});
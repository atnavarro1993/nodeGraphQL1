const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql"); 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql");
const authors = require("./authors.json");
const books = require("./books.json");



const BookType = new GraphQLObjectType({
    name:"books",
    description:"represent books",
    fields: ()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        authorId:{type:GraphQLNonNull(GraphQLInt)},
        author:{
            type:AuthorType,
            resolve:(book)=>{
                return authors.find(author=>author.id === book.authorId);
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name:"Author",
    description:"represent authors",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        books:{
            type:BookType,
            resolve:(author)=>{
                return books.find(book=>book.authorId == author.id);
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
        name:"Query",
        description:"Root Query",
        fields:()=>({
            books:{
                type:new GraphQLList(BookType),
                description:"list of all books",
                resolve:()=>books
            },
            authors:{
                type:new GraphQLList(AuthorType),
                description:"list of all authors",
                resolve:()=>authors
            }
        })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

const port = 3000;




app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}));
app.listen(port,()=>{
    console.log("server is up");
});
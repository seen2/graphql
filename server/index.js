import express, { query } from 'express';
import {expressMiddleware} from '@apollo/server/express4'
import {ApolloServer} from '@apollo/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

async function startServer(){
  const app=express()
  const server=new ApolloServer({
    
    typeDefs:`
    type User{
      id:ID!
      name:String!
      username:String!
      phone:String!
      website:String!

    }
    type Todo{
      id:ID!
      title:String
      completed:Boolean!
      userId:ID!
      user:User
    }
    type Query{
      getTodos:[Todo]
      getAllUser:[User]
      getUserById(id:ID!):User
    }
    `,
    resolvers:{
      Todo:{
        user:async (todo)=>(await axios.get(`http://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
      },
      Query:{
        getTodos:async ()=>(await axios.get('http://jsonplaceholder.typicode.com/todos/')).data,
        getAllUser:async ()=>(await axios.get('http://jsonplaceholder.typicode.com/users/')).data,
        getUserById:async (parent,{id})=>(await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)).data,
      }
      
    }
  });
  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use('/graphql',expressMiddleware(server));
  app.listen(8000,()=>{
    console.log("server started at http://127.0.0.1:8000");
  })
  
}

startServer()


# Use Mongoose for DataBase Structuring

## Context and Problem Statement

We want to have consistently formatted data sent to our DB so using it on the client side is less of a hassle
What API/middleware allows for easily formatted schema and data modeling?

## Considered Options

N/A
  
## Decision Outcome

Chosen option: Mongoose, because

* originally we were going to use just base MongoDB, but with the addition of Express to our tech stack, mongoose became an almost necessary addition
* having the ability to define schema to keep inputted data uniform and easily retrievable makes accessing it on the client side almost trivial
* Our backend team has experience using Mongoose concurrently with Node and Mongo so development would be faster and cause less issues.
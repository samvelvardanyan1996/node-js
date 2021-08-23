import React     from "react";
import ReactDOM  from "react-dom";
import App       from "./App";

import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache()
})

let div = document.createElement('div');
div.setAttribute("id", "root");
document.body.appendChild(div);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
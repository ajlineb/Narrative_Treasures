// importing dependencies
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages Import
import Market from "./Pages/Market";
import Inventory from "./Pages/Inventory";
import Home from "./Pages/Home";
import UserProfile from "./Pages/UserProfile";
import Monsters from "./Pages/Monsters";
import Signup from "./Pages/Signup";

// making GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App1() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/monsters" element={<Monsters />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App1;

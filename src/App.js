import React, { Component } from "react";
import HomePage from "./Components/HomePage/HomePage";
import AdoptionPage from "./Components/AdoptionPage/AdoptionPage";
import Cats from "./Components/AdoptionPage/Cats";
import Dogs from "./Components/AdoptionPage/Dogs";
import Context from "./Components/Context/Context";
import Confirmation from "./Components/ConfirmationPage/ConfirmationPage";
import { Route } from "react-router-dom";
import { API_ENDPOINT } from "./config";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

class App extends Component {
  state = {
    dogs: [],
    cats: [],
    people: [],
    error: "",
    name: "",
    dogNode: null,
    catNode: null,
    personNode: null,
    getCats: () => {
      fetch(`${API_ENDPOINT}/cat`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            cats: data,
            catNode: data[0],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDogs: () => {
      fetch(`${API_ENDPOINT}/dog`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            dogs: data,
            dogNode: data[0],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPeople: () => {
      fetch(`${API_ENDPOINT}/people`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            people: data,
          });
        });
    },
    addPeople: (name) => {
      fetch(`${API_ENDPOINT}/people`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(name),
      })
        .then((res) => res.json())
        .then(() => {
          this.setState({
            people: [...this.state.people, name.name],
          });
        });
    },
    deletePeople: () => {
      fetch(`${API_ENDPOINT}/people`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            people: this.state.people.slice(1),
          });
        })
        .catch((e) => {
          throw new Error("person wasnt deleted");
        });
    },
    adoptCat: () => {
      fetch(`${API_ENDPOINT}/cat`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            cats: data,
          });
        })
        .catch((e) => {
          throw new Error("cat wasnt adopted");
        });
    },
    adoptDog: () => {
      fetch(`${API_ENDPOINT}/dog`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((data) => {
          this.setState({
            dogs: this.state.dogs.slice(1),
          });
        })
        .catch((e) => {
          throw new Error("dog adoption failed");
        });
    },
    setCatNode: (nextCat) => this.setState({ catNode: nextCat }),
    setDogNode: (nextDog) => this.setState({ dogNode: nextDog }),
    setPeopleNode: (nextPerson) => this.setState({ peopleNode: nextPerson }),
    setError: (error) => this.setState({ error: error }),
    setName: (name) => this.setState({ name: name }),
  };

  componentDidMount() {
    this.state.getCats();
    this.state.getDogs();
    this.state.getPeople();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <ErrorBoundary>
          <div className="app">
            <Route exact path="/" component={HomePage} />
            <Route path="/adoption" component={AdoptionPage} />
            <Route path="/dog" component={Dogs} />
            <Route path="/cat" component={Cats} />
            <Route
              path="/confirmation"
              render={(props) => <Confirmation {...props} />}
            />
          </div>
        </ErrorBoundary>
      </Context.Provider>
    );
  }
}

export default App;

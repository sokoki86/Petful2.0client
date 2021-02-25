import React, { Component } from "react";
import Context from "../Context/Context";

export default class Confirmations extends Component {
  static contextType = Context;

  timeout = 0;
  componentDidMount() {
    this.timeout = setInterval(() => {
      if (this.context.people.length < 5) {
        this.context.addPeople({ name: "Aran D. Omperson" });
        return;
      }
      if (this.context.people[0] !== this.context.name) {
        const name = this.context.people[0];
        this.context.deletePeople(name);
        return;
      }

      if (this.context.error === "You're next!!") {
        this.context.setError(null);
        this.props.history.push("/adoption");
        return;
      }

      if (
        this.context.name === this.context.people[0] &&
        this.context.people.length === 5
      ) {
        this.context.setError("You're next!!");
        return;
      }
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          console.log(context);
          return (
            <div>
              <h1>You're in line!</h1>
              <h3>You will be redirected when you are up.</h3>
              <p className="error">{context.error}</p>
              <ol>
                {this.context.people.map((person, i) => {
                  return <li key={i}>{person}</li>;
                })}
              </ol>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
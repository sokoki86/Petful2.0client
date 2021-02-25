import React, { useState } from 'react';
import Context from '../Context/Context';

export default function HomePage(props) {
  const [started, setStarted] = useState(false);

  const handleClick = (e, context) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    const nameData = {
      name: name,
    };
    if (!name) {
      context.setError('Please enter your name');
      return;
    } else {
      context.setName(name);
      context.addPeople(nameData);
      context.setError('');
      console.log(context.name);
      props.history.push('/confirmation');
    }
  };
  return (
    <Context.Consumer>
      {(context) => {
        return (
          <div className="home">
            <div className="homeSection">
             {!started ? <><h1>Welcome To F.I.F.O FIDO</h1>
              <p>
                We are an animal shelter dogs and cats too! We do
                things a little differently here. Adoption is on a
                first come first serve basis. If you are lucky, you
                may be first in line! If not, you will be put in a
                queue before you can take your new pet home.
                Additionally, the only pets up for adoption at any
                given time are the dog and cat who have been in our
                shelter the longest. First In, First Out! FIFO FIDO!
              </p> </> : null }
              {!started ? (
                <button onClick={() => setStarted(true)}>
                  Let's start!
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    handleClick(e, context);
                  }}
                >
                  <p>
                    <label>What's your name?</label>
                  </p>
                  <p>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Smith"
                    />
                  </p>
                  <p className="error">{context.error}</p>
                  <button type="submit">
                    Find your furrever friend!
                  </button>
                </form>
              )}
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}
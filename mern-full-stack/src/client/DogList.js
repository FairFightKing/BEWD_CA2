import React, {Component} from 'react';
// import the Link component to handle React Router
import {Link} from 'react-router-dom';
import Dog from './Dog';
// Axios is a lightweight HTTP client based on the $http service within Angular.js
// Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
// MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the users array
class DogList extends Component {
  constructor(props) {
    super(props);
    // store the users array in the state
    this.state = {dogs: []};

    // this binding is necessary to make `this` work in the callback
    //  generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.updateDogs = this.updateDogs.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // fetch all user data from the server when the component mounts
  componentDidMount() {
    this.updateDogs();
  }

  //
  updateDogs() {
    // get the users API using axios GET request to the server 
    axios.get('api/dogs')
      .then(response => {
        // store the response in the state
        this.setState({dogs: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(dogId) {
    // make a DELETE request to the server which will handle the removal of the user with the specific userId
    axios
      .delete('api/dogs', {
        data: {
          id: dogId
        }
      })
      .then(response => {
        // if the deletion was successful then re-render the list of users
        this.updateDogs();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // produce a Dog component for each user object
    const dogList = this.state.dogs.map(d => (
      // map through each element in the array and set to the value received from the server
      <Dog
        key={d._id}
        id={d._id}
        name={d.name}
        gender={d.gender}
        neuter={d.neuter}
        age={d.age}
        race={d.race}
        // you must include the handleDelete method to use in child components
        handleDelete={this.handleDelete}
      />
    ));

    // return the list of users
    return (
      <div className="is-fluid">
        {/* Navigation bar*/}
        <nav className="navbar">
          <h1 className="navbar-item title is-1 has-text-primary">List of Dogs</h1>
          {/* when this button is pressed, CreateDog component will be rendered by using React Router*/}
          <Link to={'/create-dog'} className="navbar-item navbar-end">
            <button className="button is-warning" type="button">Create new dog</button>
          </Link>
        </nav>
        <hr/>
        {/* USER LIST*/}
        <div>
          <div className="columns is-multiline">
            {dogList}
          </div>
        </div>
        {/* FOOTER*/}
        <footer className="footer has-background-primary">
          <div className="content has-text-centered">
            <p className="has-text-white-bis"><strong>Random Dog API</strong> styled with Bulma.</p>
          </div>
        </footer>
      </div>

    );
  }
}

export default DogList;

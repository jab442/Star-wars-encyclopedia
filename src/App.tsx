import React from 'react';

import './App.css';
import IPerson from './IPerson'
import PersonComponent from './PersonComponent'
import { observer } from 'mobx-react';
import State from './State'
import { PushSpinner } from "react-spinners-kit";



@observer
class App extends React.Component<{ appState: State }, {}> {
 
  incrementFetchPerson() {
    this.props.appState.incrementPersonCount();
    this.fetchPerson();
  }
  decrementFetchPerson() {
    this.props.appState.decrementPersonCount();
    this.fetchPerson();
  }
  fetchPerson() {
    this.props.appState.isLoading = true;
    fetch(`https://swapi.co/api/people/` + this.props.appState.personNumber + '/')
      .then(res => res.json())
      .then(res => {
        let p: IPerson = res as IPerson;
        this.props.appState.person = p;
        //try get the main image of a star wars character from the wikipedia article using its api, include copywrited images
        let res2 = encodeURI("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&pilicense=any&titles=" + p.name)
        fetch(res2)
          .then(res2 => res2.json())
          .then(res2 => {
            try {
              this.props.appState.imgURL = res2.query.pages[0].original.source             
            }
            catch (e) {
              this.props.appState.imgURL = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"
            }
          }).catch((e) => {
            console.log(e);
          });
      }).catch(e => {       
        console.log(e);
      }).finally(()=>{
        this.props.appState.isLoading = false;
      })
  }

  componentDidMount() {
    this.fetchPerson();
  }
  render() {
    const decrementClass: string = (this.props.appState.personNumber >= 2) ? "" : "hidden";
    return (
      <div className="App">
        <header className="App-header">
          <PersonComponent name={this.props.appState.person.name} gender={this.props.appState.person.gender} />
          <div id="spinnerDiv">
            <PushSpinner size={30} color="#686769" loading={this.props.appState.isLoading} />
          </div>
          <div id="personImageDiv">
            <img id="personImage" src={this.props.appState.imgURL} />
          </div>
          <div>
            <span className={decrementClass}>
              {<button onClick={this.decrementFetchPerson.bind(this)} 
                disabled={this.props.appState.isLoading}>Prev</button>}
            </span>
            <span>
              <button onClick={this.incrementFetchPerson.bind(this)} 
              disabled={this.props.appState.isLoading}>Next</button>
            </span>
          </div>
        </header>
      </div>
    );
  }
}
export default App;

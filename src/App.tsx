import React from 'react';

import './App.css';
import IPerson from './IPerson'
//import Person from './Person'
import PersonComponent from './PersonComponent'
import { observer } from 'mobx-react';
import State from './State'
import { PushSpinner } from "react-spinners-kit";



@observer
class App extends React.Component<{ appState: State }, {}> {
  /*
    constructor(props: any) {
      super(props);
      
      const person: IPerson = { name: "jarjar" }
      this.state = {
        person: person,
        imgURL: "https://en.wikipedia.org/wiki/C-3PO#/media/File:C-3PO_droid.png",
        personNumber:1
      }
    }
  */

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
        let b: IPerson = res as IPerson;
        //console.log(b);
        
        //try get the main image of a star wars character from the wikipedia article using its api, include copywrited images
        let res2 = encodeURI("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&pilicense=any&titles=" + b.name)
        fetch(res2)
          .then(res => res.json())
          .then(response => {
            try {
              this.props.appState.isLoading = false;
              this.props.appState.imgURL = response.query.pages[0].original.source
              this.props.appState.person = b;
            }
            catch (e) {
              this.props.appState.imgURL = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"
            }
          }).catch((error) => {
            this.props.appState.isLoading = false;
            this.props.appState.person = b;
          });
        /*let res2 = encodeURI("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q="+b.name+"&safeSearch=false");
        fetch(res2, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key": "1311b8f2d5mshbd9b7ae2edcde0fp1ae31ajsne2443347e794"
          }
        })
        .then(res => res.json())
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });*/
      }).catch(err => {
        this.props.appState.isLoading = false;
        console.log(err);
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
              {<button onClick={this.decrementFetchPerson.bind(this)}>Prev</button>}
            </span>
            <span>
              <button onClick={this.incrementFetchPerson.bind(this)}>Next</button>
            </span>
          </div>
        </header>
      </div>
    );
  }
}
// gender={this.props.appState.person.gender} 
//this.handleClick.bind(this)
export default App;

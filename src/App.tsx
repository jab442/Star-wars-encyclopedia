import React from 'react';

import './App.css';
import IPerson from './IPerson'
import Person from './Person'
import PersonComponent from './PersonComponent'

interface IProps{

}
 interface IState {
  person: IPerson,
  imgURL:string
}
class App extends React.Component <IProps, IState> {

  constructor(props:any) {
    super(props);
    const person :IPerson={name:"jarjar"}
    this.state = {person:person,
                  imgURL:"https://en.wikipedia.org/wiki/C-3PO#/media/File:C-3PO_droid.png"
                  }
  }
  
  componentDidMount(){
    fetch(`https://swapi.co/api/people/3/`)
      .then(res => res.json())
      .then(res => {
          let b:IPerson = res as IPerson;
          console.log(b);
          this.setState({person:b})
          let res2 = encodeURI("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&pilicense=any&titles="+b.name)
          fetch(res2)
          .then(res => res.json())
          .then(response => {
            console.log(response);
            //.query.pages[0].original.source
            this.setState({imgURL:response.query.pages[0].original.source})
          })
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
      })

  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <PersonComponent name={this.state.person.name}/>
          <div>
            <img src={this.state.imgURL} alt={"loading image.."}/> 
          </div>
        </header>
      </div>
    );
  }
}
export default App;

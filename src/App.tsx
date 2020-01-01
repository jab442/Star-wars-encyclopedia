import React from 'react';

import './App.css';
import IPerson from './IPerson'
import div from './PersonComponent'
import { observer } from 'mobx-react';
import State from './State'
import { PushSpinner } from "react-spinners-kit";
import { Container, Row, Col, Button } from 'reactstrap'
import PersonComponent from './PersonComponent';



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
    /*
       birth_year: "19BBY"
      created: "2014-12-09T13:50:51.644000Z"
      edited: "2014-12-20T21:17:56.891000Z"
      eye_color: "blue"
      films: (5) […]
      gender: "male"
      hair_color: "blond"
      height: "172"
      homeworld: "https://swapi.co/api/planets/1/"
      mass: "77"
      name: "Luke Skywalker"
      skin_color: "fair"
      species: (1) […]
      starships: (2) […]
      url: "https://swapi.co/api/people/1/"
      vehicles: (2) […]*/
    fetch(`https://swapi.co/api/people/` + this.props.appState.personNumber + '/')
      .then(res => res.json())
      .then(res => {
        let p: IPerson = res as IPerson;
        this.props.appState.person = p;
        if(p.homeworld){  
          fetch(p.homeworld).then(res => res.json())
          .then(res =>{
            p.homeworldName=res.name
            this.props.appState.person = p;
            debugger;
          })
        }
        if(p.vehicles){
            
            const attributeArray:string[] = p.vehicles;
            this.extractNameAttributes(attributeArray, p);
        }
        
        //try get the main image of a star wars character from the wikipedia article using its api, include copywrited images
        //https://stackoverflow.com/questions/8363531/accessing-main-picture-of-wikipedia-page-by-api#20311613
        let res2 = encodeURI("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&pilicense=any&titles=" + p.name)
        return fetch(res2);
      }).then(res2 => res2.json())
      .then(res2 => {
        try {
          this.props.appState.imgURL = res2.query.pages[0].original.source
        }
        catch (e) {
          this.props.appState.imgURL = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"
        }
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        this.props.appState.isLoading = false;
      })
  }

  private extractNameAttributes(attributeArray: string[], p: IPerson) {
    let vehicleNames: string[] = [];
    attributeArray.map((v) => {
      fetch(v).then(res => res.json())
        .then(res => {
          vehicleNames.push(res.name);
        });
    });
    p.vehicleNames = vehicleNames;
    this.props.appState.person = p;
  }

  fetchAtrributeName(url: string) {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  componentDidMount() {
    this.fetchPerson();
  }
  render() {
    const decrementClass: string = (this.props.appState.personNumber >= 2) ? "" : "hidden";
    return (
      <div id="outsideDiv">
        <Row id="nameHeader">
          <Col className="col-sm-11">
            <h1>{this.props.appState.person.name} </h1>
          </Col>
          <Col className="col-sm-1">
            <PushSpinner size={30} color="#686769" loading={this.props.appState.isLoading} />
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-8">
            <div id="personImageDiv">
              <img id="personImage" src={this.props.appState.imgURL} />
            </div>
          </Col>
          <Col className="col-sm-4">
            <PersonComponent name={this.props.appState.person.name}
              gender={this.props.appState.person.gender}
              hair_color={this.props.appState.person.hair_color}
              mass={this.props.appState.person.mass}
              height={this.props.appState.person.height}
              skin_color={this.props.appState.person.skin_color}
              eye_color={this.props.appState.person.eye_color}
              birth_year={this.props.appState.person.birth_year}
              homeworldName={this.props.appState.person.homeworldName}
              vehicleNames={this.props.appState.person.vehicleNames}
            />
          </Col>
        </Row>
        <Row>
          <Col id="buttonFooter">
            <span className={decrementClass}>
              {<Button onClick={this.decrementFetchPerson.bind(this)}
                disabled={this.props.appState.isLoading}>Prev</Button>}
            </span>
            <span>
              <Button onClick={this.incrementFetchPerson.bind(this)}
                disabled={this.props.appState.isLoading}>Next</Button>
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}
export default App;

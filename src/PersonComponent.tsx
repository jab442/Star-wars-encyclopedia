import React from 'react';
import IPerson from './IPerson';


interface Props {
    name:string
  }

const PersonComponent: React.SFC<Props> = (props) => {
    return <h1>Hello, {props.name}</h1>;
   }
export default PersonComponent
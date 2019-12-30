import React from 'react';
import IPerson from './IPerson';


interface Props {
  name: string
  gender?: string
}

const PersonComponent: React.SFC<IPerson> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>{(props.gender)?"Gender:" + props.gender:""}</div>
    </div>
  );
}
export default PersonComponent
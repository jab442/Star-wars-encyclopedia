import React from 'react';
import IPerson from './IPerson';



const PersonComponent: React.SFC<IPerson> = (props) => {
  return (
    <div>
      <div> <strong>Gender: </strong>{props.gender}</div>
      <div> <strong>Birth year: </strong>{props.birth_year}</div>
      <div> <strong>Mass: </strong>{props.mass}</div>
      <div> <strong>Height: </strong>{props.height}</div>
      <div> <strong>Eye color: </strong>{props.eye_color}</div>
      <div> <strong>Skin color: </strong>{props.skin_color}</div>
      <div> <strong>Hair color: </strong>{props.hair_color}</div>
    </div>
  );
}
export default PersonComponent
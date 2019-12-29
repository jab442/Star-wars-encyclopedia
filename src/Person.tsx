
import * as React from 'react';
import IPerson from './IPerson'
interface PersonState{
    something: number;
  }

 class Person extends React.Component<IPerson,PersonState> {
    constructor(props:IPerson) {
        super(props);
    }

	public render() {
        console.log(this.props);
        console.log(this.props.name);
		return (
            <div>
                Hello {this.props.name}!
            </div>
        );
	}
}
export default Person
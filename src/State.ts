import IPerson from './IPerson';
import { observable, action } from 'mobx';
class State {

  @observable person: IPerson = { name: "" };
  @observable imgURL: string = "";
  @observable personNumber: number = 1;

  @action setPerson(person: IPerson) {
    console.log("person name" + person.name)
    this.person = person;
  }
  @action setImgURL(imgURL: string) {
    this.imgURL = imgURL;
    console.log(imgURL);
  }
  @action incrementPersonCount() {
    this.personNumber++;
  }
  @action decrementPersonCount() {
    if (this.personNumber >= 2)
      this.personNumber--;
  }
}
export default State
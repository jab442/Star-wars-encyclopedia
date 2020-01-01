import IPerson from './IPerson';
import { observable, action } from 'mobx';
class State {

  @observable person: IPerson = { name: "" ,
                                  vehicleNames:[],
                                  starshipNames:[],
                                  filmNames:[]
                                };
  @observable imgURL: string = "";
  @observable personNumber: number = 1;
  @observable isLoading:boolean = false;

  @action setPerson(person: IPerson) {
    this.person = person;
  }
  @action setImgURL(imgURL: string) {
    this.imgURL = imgURL;
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
import IPerson from './IPerson';
import {observable,action,computed} from 'mobx';
class State{

    @observable person: IPerson={ name: "jarjar" };
    @observable imgURL: string="https://en.wikipedia.org/wiki/C-3PO#/media/File:C-3PO_droid.png";
    @observable personNumber:number=1;
    
    @action setPerson(person:IPerson){
      console.log("person name" + person.name)
      this.person=person;
    }
    @action setImgURL(imgURL:string){
      this.imgURL=imgURL;
      console.log(imgURL);
    }
    @action incrementPersonCount(){
        this.personNumber++;
    }
  }
  export default State
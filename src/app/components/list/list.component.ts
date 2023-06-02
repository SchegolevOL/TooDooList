import { Component } from '@angular/core';
import { Guid } from 'src/app/helpers/guide';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  edit = false;
  add = false;
  person:Person = {
    id: "",
    name: "",
    surname: "",
    nick: ""
  };
  persons: Array<Person>=[];
  constructor(){
    this.load();
  }
  save():void{
    localStorage.setItem("persons",JSON.stringify(this.persons));
  }

  load():void{
    let json = localStorage.getItem("persons");
    if (json) {
      this.persons = JSON.parse(json);
    }
}

  addPerson():void{
    if (this.person.name==""||this.person.surname==""||this.person.nick=="") return;
    this.person.id = Guid.newGuid();
    this.persons.push(this.person);
    this.person={
      id: "",
      name: "",
      surname: "",
      nick: ""
    };
    this.save();
    this.add=false;
  }

  removePerson(id:string):void{
    this.persons = this.persons.filter(x=>x.id!=id);

  this.save();
}

  clearPersons(): void{
    this.persons = [];
    this.save();
  }

  editPerson(selectPerson:Person): void{
    this.person = selectPerson;
    this.edit=!this.edit;
  }
  addEditPerson(): void{
    if (this.person.name==""||this.person.surname==""||this.person.nick=="") return;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.person.id==this.persons[i].id) {
        this.persons[i].name = this.person.name;
        this.persons[i].surname = this.person.surname;
        this.persons[i].nick = this.person.nick;

      }
      
    }

    this.person={
      id: "",
      name: "",
      surname: "",
      nick: ""
    };
    this.save();
    this.edit = !this.edit;
  }
}

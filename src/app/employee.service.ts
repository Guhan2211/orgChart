import { Injectable } from '@angular/core';
import {Employee} from './employee.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  teamChanged = new Subject<Employee[]>();
  managerChanged = new Subject<Employee[]>();
  empClicked = new Subject<number>();
  // employeeList:Employee[]=[
  //   {
  //     "id":1,
  //     "name":"Guhan",
  //     "designation":"CEO",
  //     "team":"corporate",
  //     "manager":null,
  //     "image":"https://cdn.balkan.app/shared/1.jpg"
  //   },
  //   {
  //     "id":2,
  //     "name":"faiyaz",
  //     "designation":"COO",
  //     "team":"corporate",
  //     "manager":1,
  //     "image":"https://cdn.balkan.app/shared/5.jpg"
  //   },

  //   {
  //     "id":3,
  //     "name":"Aravind",
  //     "designation":"Manager",
  //     "team":"Frontend",
  //     "manager":2,
  //     "image":"https://cdn.balkan.app/shared/7.jpg"
  //   },
  //   {
  //     "id":4,
  //     "name":"Rahul",
  //     "designation":"Frontend Dev",
  //     "team":"Frontend",
  //     "manager":3,
  //     "image":"https://cdn.balkan.app/shared/3.jpg"
  //   },
  //   {
  //     "id":5,
  //     "name":"Magna",
  //     "designation":"Frontend Dev - Intern",
  //     "team":"Frontend",
  //     "manager":3,
  //     "image":"https://cdn.balkan.app/shared/6.jpg"
  //   },
  //   {
  //     "id":6,
  //     "name":"Sreena",
  //     "designation":"Manager",
  //     "team":"Backend",
  //     "manager":2,
  //     image:"https://cdn.balkan.app/shared/2.jpg"
  //   },
  //   {
  //     "id":7,
  //     "name":"Kailas",
  //     "designation":"Backend Dev",
  //     "team":"Backend",
  //     "manager":6,
  //     "image":"https://cdn.balkan.app/shared/11.jpg"
  //   },
  //   {
  //     "id":8,
  //     "name":"Suganya",
  //     "designation":"Backend Dev - Intern",
  //     "team":"Backend",
  //     "manager":6,
  //     "image":"https://cdn.balkan.app/shared/4.jpg"
  //   }
  // ];

  //filteredEmployees:Employee[]=[...this.employeeList];
  team:string="";

  constructor(private httpClient:HttpClient) { }

  getemployees(){
    return this.httpClient.get<{"status":string,"list":Employee[]}>("/api/employees");
    //return this.employeeList.slice();
  }

  getTeams(eList:Employee[]){
    let teams:string[]=[];

    eList.forEach(emp => {
      if(!teams.includes(emp.team)){
        teams.push(emp.team);
      }
    });

    return teams;


  }

  filterEmps(searchStirng:string,eList:Employee[]){
    // this.filteredEmployees=this.employeeList.filter(emp=>{
    //  return emp.designation.toLowerCase().includes(searchStirng.toLowerCase()) ||
    //   emp.name.toLowerCase().includes(searchStirng.toLowerCase()) ||
    //   emp.team.toLowerCase().includes(searchStirng.toLowerCase())
    // });

    // return this.filteredEmployees;

    return eList.filter(emp=>{
      return emp.designation.toLowerCase().includes(searchStirng.toLowerCase()) ||
       emp.name.toLowerCase().includes(searchStirng.toLowerCase()) ||
       emp.team.toLowerCase().includes(searchStirng.toLowerCase())
     });



  }

  filterTeams(team:string,eList:Employee[]){
    this.team=team;
    //console.log(team,eList);
    // this.filteredEmployees=this.employeeList.filter(emp=>{
    //   return emp.team.toLowerCase().includes(team.toLowerCase())

    //  });
    //  return this.filteredEmployees;

    return eList.filter(emp=>{
      return emp.team.toLowerCase().includes(team.toLowerCase())

     });


  }

  changeManager(draggedNode:any,droppedNode:any){
    //console.log(draggedNode,droppedNode);

      // const index=eList.findIndex(obj=>obj.id===draggedNode);
      // if(index!==-1){
      //   eList[index].manager=droppedNode;
      // }

      // this.teamChanged.next(this.filterTeams(this.team,eList));


      return this.httpClient.post('/api/changeManager',{
        "draggedNode":draggedNode,
        "droppedNode":droppedNode
      })


    }

    getTeam(){
      return this.team;
    }




}

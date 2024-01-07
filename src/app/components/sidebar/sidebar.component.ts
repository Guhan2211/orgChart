import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  ngOnInit(){
      this.eService.managerChanged.subscribe(arg=>{
        this.initSide();
      })
      this.initSide();
  }

  constructor(public eService:EmployeeService){

  }

  employees:any=[];
  filteredEmployees:Employee[]=[];
  teams:string[]=[];
  searchStirng:string="";
  team="";

  initSide(){
    this.eService.getemployees().subscribe(
      (data:any)=>{
        //console.log(data.list);
        this.employees=data.list;
        this.filteredEmployees=[...this.employees];


        this.teams=this.eService.getTeams(this.employees);
      }
    )
      // this.employees=this.eService.getemployees();
      // this.filteredEmployees=[...this.employees];
      // this.teams=this.eService.getTeams();
  }


  filterEmps(){
    this.filteredEmployees=this.eService.filterEmps(this.searchStirng,this.employees);


  }

  filterTeams(team:string){
    // this.searchStirng="";
    // this.team=team;
    // //this.filteredEmployees=this.eService.filterTeams(team);
    // this.eService.teamChanged.next(this.filteredEmployees);

    this.searchStirng="";
    this.team=team;

    this.filteredEmployees=this.eService.filterTeams(team,this.employees);
    this.eService.teamChanged.next(this.filteredEmployees);
  }


  empClicked(id:number){
    this.eService.empClicked.next(id);
  }



}

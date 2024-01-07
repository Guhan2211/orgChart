import { Component, OnInit } from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";
import { Employee } from 'src/app/employee.model';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit{

  employees:Employee[]=[];
  chartArr:any=[];

  chart:any;


  constructor(public eSer:EmployeeService){

  }


  ngOnInit() {

    this.eSer.getemployees().subscribe(
      (data:any)=>{
        //console.log(data.list);
        this.employees=data.list;
        this.initChart();
      }
    )
    //this.filteredEmployees=[...this.employees];
    OrgChart.templates['ana' ]['field_0'] = '<text class="field_2"  style="font-size: 18px;font-weight: bold;" fill="#ffffff" x="110" y="40" text-anchor="bottom">{val}</text>';
    OrgChart.templates['ana' ]['field_1'] = '<text class="field_2"  style="font-size: 14px;" fill="#ffffff" x="110" y="65" text-anchor="bottom">{val}</text>';
    OrgChart.templates['ana' ]['field_2'] = '<text class="field_2"  style="font-size: 14px;" fill="#ffffff" x="110" y="85" text-anchor="bottom">{val}</text>';

    OrgChart.templates['ana' ]['img_0'] =
    '<clipPath id="ulaImg">'
    + '<circle cx="50" cy="50" r="40"></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="10" y="10" width="80" height="80">'
    + '</image>';


    this.eSer.teamChanged
      .subscribe(arg => {
        this.employees=arg;
        this.initChart();
      });


    this.eSer.empClicked.subscribe(
      id=>this.chart.ripple(id)
    )

}


initChart(){

  //let filteredEmployees=filterEmp;
  //console.log(this.filteredEmployees);

  this.chartArr=this.employees.map((emp:Employee)=>{
    return {
      ...emp,
      pid:emp.manager,
      img:emp.image
    }
    })



  let tree = document.getElementById('tree');
  if (tree) {
     this.loadChart(tree);
  }
}


loadChart(tree:any){
  this.chart = new OrgChart(tree, {
    nodeBinding: {
    field_0: "name",
    field_1:"designation",
    field_2:"team",
    img_0: "img",
    },
    enableSearch:false,
    enableDragDrop: true
});

  this.chart.on('click', function(sender:any, args:any){
    return false;
  });

  this.chart.on('drop', (sender:any, draggedNodeId:any, droppedNodeId:any) =>{

    if(draggedNodeId && droppedNodeId){

      let dragNode=this.employees.find(emp=>emp.id==draggedNodeId)
      let dropNode=this.employees.find(emp=>emp.id==droppedNodeId)

      if(dropNode?.manager==draggedNodeId){
        return false
      }

      this.eSer.changeManager(draggedNodeId,droppedNodeId).subscribe(
        (data:any)=>{
          this.eSer.managerChanged.next(data.list);

        }
      )

    }
    return true;
  });



  this.chart.load(this.chartArr);
}

}

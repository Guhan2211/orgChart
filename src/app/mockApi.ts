import { createServer } from "miragejs";

let employeeList=[
  {
    "id":1,
    "name":"Guhan",
    "designation":"CEO",
    "team":"Corporate",
    "manager":null,
    "image":"https://cdn.balkan.app/shared/1.jpg"
  },
  {
    "id":2,
    "name":"Faiyaz",
    "designation":"COO",
    "team":"Corporate",
    "manager":1,
    "image":"https://cdn.balkan.app/shared/5.jpg"
  },

  {
    "id":3,
    "name":"Aravind",
    "designation":"Manager",
    "team":"Frontend",
    "manager":2,
    "image":"https://cdn.balkan.app/shared/7.jpg"
  },
  {
    "id":4,
    "name":"Rahul",
    "designation":"Frontend Dev",
    "team":"Frontend",
    "manager":3,
    "image":"https://cdn.balkan.app/shared/3.jpg"
  },
  {
    "id":5,
    "name":"Magna",
    "designation":"Frontend Dev - Intern",
    "team":"Frontend",
    "manager":3,
    "image":"https://cdn.balkan.app/shared/6.jpg"
  },
  {
    "id":6,
    "name":"Sreena",
    "designation":"Manager",
    "team":"Backend",
    "manager":2,
    image:"https://cdn.balkan.app/shared/2.jpg"
  },
  {
    "id":7,
    "name":"Kailas",
    "designation":"Backend Dev",
    "team":"Backend",
    "manager":6,
    "image":"https://cdn.balkan.app/shared/11.jpg"
  },
  {
    "id":8,
    "name":"Suganya",
    "designation":"Backend Dev - Intern",
    "team":"Backend",
    "manager":6,
    "image":"https://cdn.balkan.app/shared/4.jpg"
  }
];

export default function  runMock(){
  createServer({
    routes(){

      this.passthrough('https://s-ind-balkangraph.azurewebsites.net/api/OrgChartJS');

      this.namespace = '/api';
      this.get('/employees',()=>{
        return {
          "status":"200",
          "list":employeeList
        }
      })
      this.post("/changeManager", (schema, request):any => {
        let attrs = JSON.parse(request.requestBody)
        //console.log(attrs);

      const index=employeeList.findIndex(obj=>obj.id===attrs.draggedNode);

      if(index!==-1){
        employeeList[index].manager=attrs.droppedNode;
        //console.log(employeeList);
        return {
          "status":"200",
          "list":employeeList
        }
      }
      return{
        "status":"500",
          "list":employeeList
      }

      })
    }
  })
}

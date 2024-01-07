export class Employee {
  constructor(
    public id: number,
    public name: string,
    public designation: string,
    public team: string,
    public manager:number|null,
    public image:string

    )

    {}
}

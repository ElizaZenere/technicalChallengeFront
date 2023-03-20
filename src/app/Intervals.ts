export class Intervals {
  idInterval: number;
  intervalName: string;
  months: number;

  constructor(id: number, name: string, months:number) {
    this.idInterval = id;
    this.intervalName = name;
    this.months = months;
  }
}

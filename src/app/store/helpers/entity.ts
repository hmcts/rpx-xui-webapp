export class Entity {
  public id: string | string[] ;
  public value: {id: string; [key: string]: any};
  [key: string]: {id: string; [key: string]: any} | string[] | string;
  constructor(obj: any) {
    this.value = obj;
    if (obj instanceof Array) {
      this.id = [];
      for (const o of obj) {
        this.id.push(o.id);
        this[o.id] = o;
      }
    } else {
      this.id = obj.id;
      this[obj.id] = obj;
    }
  }
}


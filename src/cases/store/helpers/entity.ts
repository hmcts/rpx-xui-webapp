export class Entity {
  id: string | Array<string>  | null;
  value: {id: string; [key: string]: any} | any;
  [key: string]: {id: string; [key: string]: any} | Array<string> | string | any ;
  constructor(obj: any) {
    this.value = obj;
    if (obj instanceof Array) {
      this.id = [];
      for (const o of obj) {
        this.id.push(o.id);
        this[o.id] = o;
      }
    } else if (typeof obj === 'string') {
    } else {
      this.id = obj.id;
      this[obj.id] = obj;
    }
  }
}


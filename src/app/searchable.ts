import { Listable } from './listable';

export abstract class Searchable extends Listable {
  constructor(public id: string, public name: string) {
    super();
  }
}
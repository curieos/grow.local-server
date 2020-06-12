import { IListable } from '../listable.interface';

export class Module implements IListable {
  id: string;
  name: string;
  moduleName: string;
  ipAddress: string;
}

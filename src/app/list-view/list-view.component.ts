import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Searchable } from '../searchable';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent<T extends Searchable> implements OnInit {
  @Input() public emptyMsg: string;
  @Input() public showPaging = true;
  public listItems: Array<T>;
  private items: Array<T>;
  public pageSize = 10;
  public page = 1;
  public model: any;

  @ContentChild(TemplateRef) public itemTemplate: TemplateRef<Element>;

  readonly search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.items.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  formatter = (x: { name: string }) => x.name;

  constructor() { }

  ngOnInit(): void { }

  @Input()
  set _listItems(data: Array<T>) {
    this.listItems = data;
    this.items = this.listItems;
  }

  getItemsByName(name: string) {
    return this.items.filter(v => v.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }
}

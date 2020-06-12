import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { IListable } from '../listable.interface';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent<T extends IListable> implements OnInit {
  @Input() public emptyMsg: string;
  @Input() public showFilters = true;
  @Input() public showSorter = true;
  @Input() public showPaging = true;
  @Input() public listItems: Array<T>;

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<Element>;

  constructor() { }

  ngOnInit(): void {
    
  }
}

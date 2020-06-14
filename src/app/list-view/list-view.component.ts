import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Listable } from '../listable';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent<T extends Listable> implements OnInit {
  @Input() public emptyMsg: string;
  @Input() public showPaging = true;
  @Input() public listItems: Array<T>;
  public pageSize = 10;
  public page = 1;

  @ContentChild(TemplateRef) public itemTemplate: TemplateRef<Element>;

  constructor() { }

  ngOnInit(): void {
    
  }
}

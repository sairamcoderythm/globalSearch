import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilteredList } from './filteredlist.component';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.html'
})

export class AppComponent implements OnInit {
    public items: Observable<Array<any>>;
    private _items: Array<any>;
    private _lipsum: any;
  
    constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
        declare var LoremIpsum: any;
        this._lipsum = new LoremIpsum();
        this._items = [];
        this.items = Observable.of(this._items);
    }
    
    createItems() {
      this._items.length = 0;
      var numItems: int = Math.random() * (200 - 10) + 10;
      console.log("Adding " + numItems.toString() + " items");
      var i: int;
      for (i =0; i < numItems; i++) {
        var label: string = this._lipsum.singleWord(); 
        this._items.push({ label: label, value: i.toString()});
      }
    }
    
    ngOnInit() {
      this.createItems();
    }
}

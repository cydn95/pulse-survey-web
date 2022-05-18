//
//     Angular components KeyLines v6.9.2-2264518215
//
//     Copyright © 2011-2022 Cambridge Intelligence Limited.
//     All rights reserved.
//

import {
  Component, ElementRef, Input, Output, EventEmitter, Injectable, AfterViewInit, OnDestroy,
  OnChanges, SimpleChange, ContentChildren, ViewChild
} from '@angular/core';

// This file works with these ways of using the KeyLines library:
// - Installing 'keylines' as an npm package
// - Including keylines.js as a script tag in the page. For this, you will also need to add a paths
//   entry to tsconfig that resolves 'keylines' to the file keylines.d.ts

declare const KeyLines: import('keylines').KeyLines;

// Promisify KeyLines
KeyLines.promisify();

@Injectable()
export class KlComponentsService {
  create(componentDefinitions: KeyLines.Component[], pathToImages: string) {
    // KeyLines paths configuration
    KeyLines.paths({ images: pathToImages });
    // KeyLines create components
    return KeyLines.create(componentDefinitions);
  }
}

@Component({
  selector: 'kl-component',
  template: '<div #container [ngClass]="containerClass" [ngStyle]="style"></div>'
})
export class KlComponent implements OnChanges, OnDestroy {
  @Input() id: string = ""; //optional

  @Input('ngStyle') style: any; //optional

  @Input('klType') type: "chart" | "timebar" = "chart"; // optional
  @Input('klOptions') options: KeyLines.ChartOptions | KeyLines.TimeBarOptions = {}; // optional

  @Input('klContainerClass') containerClass: string = ""; // optional

  @Output('klReady') klReady = new EventEmitter(); // optional
  @Output('klEvents') klEvents = new EventEmitter(); // optional

  // Save the reference of the container element: see #container in the template
  @ViewChild('container', { static: false })
  private containerElement?: ElementRef;
  // The KeyLines component
  private component?: KeyLines.Chart | KeyLines.TimeBar;

  isChart(component: KeyLines.Chart | KeyLines.TimeBar): component is KeyLines.Chart {
    return this.type === "chart";
  }

  // lifecycle hooks
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    const { options } = changes;
    // Refresh the options when necessary
    if (options && !options.isFirstChange()) {
      this.refreshOptions(options.currentValue);
    }
  }
  ngOnDestroy() {
    if (this.component) {
      // ensure the component cleans up its resources
      this.component.destroy();
    }
  }

  // Kl instructions
  getHeader(): KeyLines.Component {
    return { 
      container: this.containerElement ? this.containerElement.nativeElement : undefined,
      type: this.type,
      options: this.options 
    };
  }

  setUpComponent(component: KeyLines.Chart | KeyLines.TimeBar) {
    // save the reference of the component
    this.component = component;
    // trigger a klReady event with the component reference
    this.klReady.emit(component);
    // attach the component events
    this.registerEvent();
  }

  registerEvent() {
    function emitEvent(this: KlComponent, props: any): void {
      const klEvent = { name: props.name, args: props.event, preventDefault: false };
      // dispatch the event to the parent
      this.klEvents.emit(klEvent);
      if (klEvent.preventDefault && props.event && props.event.preventDefault) {
        props.event.preventDefault();
      }
    }
    if (this.component) {
      if (this.isChart(this.component)) {
        this.component.on('all', emitEvent.bind(this));
      } else {
        this.component.on('all', emitEvent.bind(this));
      }
    }
  }

  refreshOptions(options: KeyLines.ChartOptions | KeyLines.TimeBarOptions) {
    if (this.component) {
      // Use type guard to allow TypeScript to infer type and prevent errors
      if (this.isChart(this.component)) {
        this.component.options(options);
      }
      else {
        this.component.options(options);
      }
    }
  }
}

@Component({
  selector: 'kl-components',
  template: '<ng-content></ng-content>'
})
export class KlComponents implements AfterViewInit {
  @Input('klImagesPath') pathToImages = ''; // optional
  @Output('klReady') klReady = new EventEmitter(); // optional

  // save the KeyLines service
  private KlComponentsService: KlComponentsService;
  // get the list of the children components
  // http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html
  @ContentChildren(KlComponent)
  private components?: KlComponent[];

  // constructor
  constructor(KlComponentsService: KlComponentsService) {
    this.KlComponentsService = KlComponentsService;
  }

  // lifecycle hooks
  ngAfterViewInit() {
    if (!this.components) throw 'Could not find kl-component declaration';
    // iterate over the list of children components to create the KeyLines definition of components
    const componentDefinitions = this.components.map((component) => component.getHeader());
    this.createComponents(componentDefinitions);
  }

  // KL instructions
  createComponents(componentDefinitions: KeyLines.Component[]) {
    // use the KeyLines service to create the components
    this.KlComponentsService.create(componentDefinitions, this.pathToImages)
      .then((components) => this.notifyComponents(components))
      .catch((error: any) => error);
  }

  notifyComponents(components: (KeyLines.Chart | KeyLines.TimeBar)[] | KeyLines.Chart | KeyLines.TimeBar) {
    // ensure that we have an array of components
    if (!Array.isArray(components)) {
      components = [components];
    }
    this.klReady.emit(components);
    // finalise the set up of registered components
    if (this.components){
      this.components.forEach((component, index) => { 
        component.setUpComponent((components as (KeyLines.Chart | KeyLines.TimeBar)[])[index])
      });
    }
  }
}

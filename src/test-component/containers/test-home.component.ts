import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exui-test-hom',
    templateUrl: './test-home.component.html'
  })

export class TestHomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('TestHomeComponent');
  }

}

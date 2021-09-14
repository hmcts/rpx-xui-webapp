import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswersComponent } from './answers.component';

@Component({
  template: `<exui-answers [caption]="caption" [heading]="heading" [hint]="hint" [answers]="answers" (navigate)="onNavigate($event)"></exui-answers>`
})
class WrapperComponent {
  @ViewChild(AnswersComponent) public ref: AnswersComponent;
}

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersComponent, WrapperComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.ref;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

});

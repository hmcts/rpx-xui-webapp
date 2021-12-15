import { async } from '@angular/core/testing';
import { DescribeExclusionComponent } from './describe-exclusion.component';
import { Validators } from '@angular/forms';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { UpdateDescribeExclusionText } from '../../../store';

describe('DescribeExclusionComponent', () => {
  let component: DescribeExclusionComponent;
  let mockStore: any;
  let mockFormBuilder: any;
  let formGroup: any;
  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('mockFormBuilder', ['pipe', 'dispatch']);
    mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group']);
    formGroup = jasmine.createSpyObj('formGroup', ['get']);
    mockFormBuilder.group.and.returnValue(formGroup);
    component = new DescribeExclusionComponent(mockStore, mockFormBuilder);
  }));

  it('should create and initialise FormGroup', () => {
    expect(component).toBeTruthy();
    expect(mockFormBuilder.group).toHaveBeenCalledWith({['text']: ['', [Validators.required]]});
    expect(component.formGroup).not.toBeNull();
  });

  it('navigationHandler should handleError', () => {
    formGroup.get.and.returnValue(jasmine.createSpyObj('control', ['markAsTouched']));
    formGroup.valid = false;
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(component.error).toEqual({
      title: 'There is a problem',
      description: 'Enter exclusion',
      fieldId: 'exclusion-description'
    });
  });

  it('navigationHandler should dispatch action UpdateDescribeExclusionText', () => {
    formGroup.get.and.returnValue(jasmine.createSpyObj('control', ['markAsTouched']));
    formGroup.valid = true;
    formGroup.value = {text: 'some text'};
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new UpdateDescribeExclusionText(ExclusionState.CHECK_ANSWERS, 'some text'));
  });
});

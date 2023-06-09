import { FormControl, FormGroup } from '@angular/forms';
import { noPrimaryLocationValidator } from './no-primary-location.validator';

describe('noPrimaryLocationValidator', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup({
      locations: new FormControl([], [noPrimaryLocationValidator()])
    });
  });

  it('should return error when locations is empty', () => {
    form.controls.locations.setValue([]);
    expect(form.controls.locations.hasError('noPrimaryLocation')).toBe(true);
  });

  it('should return error when no primary location exists', () => {
    form.controls.locations.setValue([
      { name: 'Location A', is_primary: false },
      { name: 'Location B', is_primary: false },
      { name: 'Location C', is_primary: false }
    ]);
    expect(form.controls.locations.hasError('noPrimaryLocation')).toBe(true);
  });

  it('should not return error when primary location exists', () => {
    form.controls.locations.setValue([
      { name: 'Location A', is_primary: false },
      { name: 'Location B', is_primary: true },
      { name: 'Location C', is_primary: false }
    ]);
    expect(form.controls.locations.hasError('noPrimaryLocation')).toBe(false);
  });
});

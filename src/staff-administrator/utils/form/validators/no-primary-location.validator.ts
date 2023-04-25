import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noPrimaryLocationValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const locations = control.value;
    if (!locations || !locations.length) {
      return { noPrimaryLocation: true };
    }
    const primaryLocation = locations.find((location) => location.is_primary);

    if (!primaryLocation) {
      return { noPrimaryLocation: true };
    }

    return null;
  };
}

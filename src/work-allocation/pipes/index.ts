import { CaseworkerDisplayName } from './caseworker-display-name.pipe';
import { DaysFromTodayPipe } from './days-from-today.pipe';
import { IntegerPipe } from './integer.pipe';
import { TwoDPPipe } from './two-dp.pipe';
import { YesNoPipe } from './yes-no.pipe';

export const pipes: any[] = [
  CaseworkerDisplayName,
  DaysFromTodayPipe,
  IntegerPipe,
  TwoDPPipe,
  YesNoPipe
];

export {
  CaseworkerDisplayName,
  DaysFromTodayPipe,
  IntegerPipe,
  TwoDPPipe,
  YesNoPipe
};

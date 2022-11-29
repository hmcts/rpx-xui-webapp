import { AcceptTcEffects } from './acceptTC.effects';
import {AppEffects} from './app.effects';
import { RouterEffects } from './router.effect';

export const effects: any[] = [RouterEffects, AppEffects, AcceptTcEffects];


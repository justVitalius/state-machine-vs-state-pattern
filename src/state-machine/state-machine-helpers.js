// @flow

import type { Model } from './model';
import type { State } from './error-state';

export type States = {
  [key: string]: State,
}

export type Transitions = {
  [key: string]: Array<string>,
}

module.exports = {
  calculateNextState,
};

function calculateNextState(possibleNames:Array<string> = [], states:States = {}, model: Model): ?State {
  if (possibleNames.length && states) {
    const nextStateName = possibleNames.filter(possibleName => states[possibleName].canApply(model))[0];
    if (nextStateName) {
      return states[nextStateName];
    }
  }
}
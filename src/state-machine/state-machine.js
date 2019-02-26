// @flow
const { calculateNextState } = require('./state-machine-helpers');
const ErrorState = require('./error-state');
const FirstState = require('./first-state');
const SecondState = require('./second-state');
const ThirdState = require('./third-state');
const FourthState = require('./fourth-state');

import type {State} from './error-state';
import type { Model } from './model';

// const states: {
//   [key: string]: State,
// } = {
//   error: new ErrorState(),
//   first: new FirstState(),
//   second: new SecondState(),
//   third: new ThirdState(),
//   fourth: new FourthState(),
// };
//
// const transitions = {
//   first: ['second', 'error'],
//   second: ['third', 'error'],
// };

module.exports = class StateMachine {

  states: Object;
  transitions: Object;

  constructor(states:Object = {}, transitions:Object = {}) {
    this.states = states;
    this.transitions = transitions;
  }

  handle(model: Model): State {
    const { states, transitions } = this;
    const { currentStateName } = model;
    const currentState = states[currentStateName];

    if (!currentState) {
      throw new Error(`Not exists state for ${currentStateName}`)
    }

    currentState.onExecute(model);
    if (currentState.canExit(model)) {
      const possibleStateNames = transitions[currentStateName].map( stateName =>
        states[stateName].getName()
      );

      const nextState = calculateNextState(possibleStateNames, states, model) || currentState;
      currentState.onExit(model);
      nextState.onStart(model);

      return nextState;
    }

    return currentState;
  }
};

// @flow

import type { State } from './error-state';

module.exports = class FourthState implements State {
  name: string;

  constructor() {
    this.name = 'fourth';
  }

  getName() {
    return this.name;
  }

  canExit() {
    return false;
  }

  canApply() {
    return true;
  }

  onStart() {
    console.log('FourthState onStart')
  }

  onExecute() {
    console.log('FourthState onExecute')
  }

  onExit() {
    console.log('FourthState onExit')
  }

}

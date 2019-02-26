// @flow

import type { State } from './error-state';
import type { Model } from './model';

module.exports = class FirstState implements State {
  name: string;

  constructor() {
    this.name = 'first';
  }

  getName() {
    return this.name;
  }

  canExit(model: Model = {}) {
    return true;
  }

  canApply(model: Model = {}) {
    return false;
  }

  onStart(model: Model = {}) {
    console.log('FirstState onStart')
  }

  onExecute(model: Model = {}) {
    console.log('FirstState onExecute')
  }

  onExit(model: Model = {}) {
    console.log('FirstState onExit')
  }

}

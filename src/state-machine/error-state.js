// @flow

import type {Model} from './model';

export interface State {
  name: string,
  canExit(model: Model): boolean,
  canApply(model: Model): boolean,
  onStart(model: Model): void,
  onExecute(model: Model): void,
  onExit(model: Model): void,
  getName(): string,
}

module.exports = class ErrorState implements State {
  name: string;

  constructor() {
    this.name = 'error';
  }

  getName() {
    return this.name;
  }

  canExit() {
    return false;
  }

  canApply(model: Model = {}) {
    const { meta = {} } = model;
    return !!meta.integrationHasError;
  }

  onStart() {
    console.log('ErrorState onStart')
  }

  onExecute() {
    console.log('ErrorState onExecute')
  }

  onExit() {
    console.log('ErrorState onExit')
  }

}

// @flow

import type { Model } from '../state-machine/model';
import type { State } from './state';

module.exports = class Box {
  state: State;
  model: Model;

  constructor(model: Model, initialState: Class<State>) {
    this.model = model;
    this.state = new initialState(this);
  }

  getState(): State {
    return this.state;
  }

  getModel(): Model {
    return this.model;
  }

  changeState(state: State) {
    this.state = state;
  }

  create() {
    this.state.create();
  }

  fillByUserData(model: Model = {}) {
    this.state.fillByUserData(model);
  }
  fillByEgrData() {
    this.state.fillByEgrData();
  }
  fillByEKSData(){
    this.state.fillByEKSData();
  }
  fillByStopListData() {
    this.state.fillByStopListData();
  }
  reserveAccount(){
    this.state.reserveAccount();
  }

};

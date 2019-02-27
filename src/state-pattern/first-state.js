// @flow

import type { State } from './state';

const Box = require('./box');
const SecondState = require('./second-state');

module.exports = class FirstState implements State {
  box: Box;

  constructor(box: Box) {
    this.box = box;
  }

  getName() {
    return 'first';
  }

  create() {
    this.box.getModel().currentStateName = 'first';
    this.box.changeState(new SecondState(this.box));
  }

  getAvailableActions(): Array<string> {
    return ['create'];
  }

  fillByUserData() {
    console.warn('empty method for this state');
  }
  fillByEgrData() {
    console.warn('empty method for this state');
  }
  fillByEKSData() {
    console.warn('empty method for this state');
  }
  fillByStopListData() {
    console.warn('empty method for this state');
  }
  reserveAccount() {
    console.warn('empty method for this state');
  }
}
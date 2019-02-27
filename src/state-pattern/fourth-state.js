// @flow

import type { State } from './state';

const Box = require('./box');

module.exports = class SecondState implements State {
  box: Box;

  constructor(box: Box) {
    this.box = box;
  }

  getName() {
    return 'fourth';
  }

  create() {
    console.warn('empty method for this state');
  }

  getAvailableActions(): Array<string> {
    return ['reserveAccount'];
  }

  fillByUserData(obj: any = {}) {
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
    // async code
  }
}
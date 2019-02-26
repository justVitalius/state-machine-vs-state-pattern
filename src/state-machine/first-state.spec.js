const initialModel = require('./model');
const FirstState = require('./first-state');

describe('FirstState',  () => {
  describe('canExit()', () => {
    it('true всегда', () => {
      const state = new FirstState();

      expect(
        state.canExit(initialModel)
      ).toEqual(true)

      expect(
        state.canExit({})
      ).toEqual(true)
    });
  });

  describe('canApply()', () => {
    it('false всегда', () => {
      const state = new FirstState();

      expect(
        state.canApply(initialModel)
      ).toEqual(false)

      expect(
        state.canApply({})
      ).toEqual(false)
    });
  });
});

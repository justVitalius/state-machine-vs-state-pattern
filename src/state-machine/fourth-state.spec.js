const initialModel = require('./model');
const FourthState = require('./fourth-state');

describe('FourthState',  () => {
  describe('canExit()', () => {
    it('false всегда', () => {
      const state = new FourthState();

      expect(
        state.canExit(initialModel)
      ).toEqual(false)

      expect(
        state.canExit({})
      ).toEqual(false)
    });
  });

  describe('canApply()', () => {
    it('true всегда', () => {
      const state = new FourthState();

      expect(
        state.canApply(initialModel)
      ).toEqual(true)

      expect(
        state.canApply({})
      ).toEqual(true)
    });
  });
});

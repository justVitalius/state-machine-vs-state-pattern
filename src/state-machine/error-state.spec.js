const initialModel = require('./model');
const ErrorState = require('./error-state');

describe('ErrorState',  () => {
  describe('canExit()', () => {
    it('false всегда', () => {
      const state = new ErrorState();

      expect(
        state.canExit(initialModel)
      ).toEqual(false);

      expect(
        state.canExit({})
      ).toEqual(false);
    });
  });

  describe('canApply()', () => {
    it('Возвращает true, если присутствует флаг об ошибках', () => {
      const state = new ErrorState();
      const model = {
        ...initialModel,
        meta: {
          integrationHasError: true,
        },
      };

      expect(
        state.canApply(model)
      ).toEqual(true)
    });

    it('Возвращает false, если вообще нет флагов об ошибках', () => {
      const state = new ErrorState();

      expect(
        state.canApply({})
      ).toEqual(false)
    })
  });
});

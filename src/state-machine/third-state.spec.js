const initialModel = require('./model');
const ThirdState = require('./third-state');

jest.useFakeTimers();

describe('ThirdState',  () => {
  describe('canExit()', () => {
    describe('Выставлен флаг окончания асинхронной работы', () => {
      it('Возврашает true', () => {
        const model = {
          ...initialModel,
          meta: {
            asyncIntegraionsWasDone: true,
          },
        };
        const state = new ThirdState();

        expect(
          state.canExit(model)
        ).toEqual(true)
      });
    });
  });

  describe('Есть асинхронная работа не закончена', () => {
    it('Возврашает false, если флаг = false', () => {
      const model = {
        ...initialModel,
        meta: {
          asyncIntegraionsWasDone: false,
        },
      };

      const state = new ThirdState();

      expect(
        state.canExit(model)
      ).toEqual(false);
    });

    it('Возврашает false, если состояние флага не известно', () => {
      const state = new ThirdState();

      expect(
        state.canExit({})
      ).toEqual(false);
    })
  });

  describe('canApply()', () => {
    it('Возврашает true если нет ошибок интеграции', () => {
      const state = new ThirdState();

      expect(
        state.canApply(initialModel)
      ).toEqual(true);
    });

    it('Возвращает true, если не известно об ошибках', () => {
      const state = new ThirdState();

      expect(
        state.canApply({})
      ).toEqual(true)
    });

    it('Возвращает false, если известно об ошибках интеграции', () => {
      const state = new ThirdState();
      const model = {
        ...initialModel,
        meta: {
          integrationHasError: true,
        }
      }
      expect(
        state.canApply(model)
      ).toEqual(false)
    })
  });


  describe('Эмулируем работу асинхронщины', function () {
    beforeEach(() => {
      jest.clearAllTimers();
    });

    it('Метод onStart() вначале выставляет флаг в false', () => {
      const state = new ThirdState();
      const model = { ...initialModel };
      state.onStart(model);
      expect(model.meta.asyncIntegrationsWasDone).toBeFalsy();
    });

    it('Метод onStart запускает асинхронщину и выставляет флаг окончания в true', () => {
      const state = new ThirdState();
      const model = { ...initialModel };
      state.onStart(model);

      expect(setTimeout).toHaveBeenCalled();

      // крутим стрелки часов вперед
      jest.runAllTimers();

      expect(model.meta.asyncIntegrationsWasDone).toBeTruthy();
    });
  });

});

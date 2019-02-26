const initialModel = require('./model');
const SecondState = require('./second-state');

describe('SecondState',  () => {
  describe('canExit()', () => {
    it('true если заполнены все обязательные атрибуты и ошибок нет', () => {
      const state = new SecondState();
      const model = {
        corporate: {
          name: 'name',
          inn: 123,
          ogrn: 321
        },
        request: {
          accountNumber: 'accountNumber'
        },
        meta: {
          integrationHasError: false,
        },
      };

      expect(
        state.canExit(model)
      ).toEqual(true)
    });

    it('true если все заполнено, но есть ошибки', () => {
      const state = new SecondState();
      const model = {
        corporate: {
          name: 'name',
          inn: 123,
          ogrn: 321
        },
        request: {
          accountNumber: 'accountNumber'
        },
        meta: {
          integrationHasError: true,
        },
      };

      expect(
        state.canExit(model)
      ).toEqual(true)
    });

    it('false если заполнены не все атрибуты и ошибок нет', () => {
      const state = new SecondState();
      const model = {
        corporate: {
          name: null,
          inn: 123,
          ogrn: 321
        },
        request: {
          accountNumber: 'accountNumber'
        },
        meta: {
          integrationHasError: false,
        },
      };

      expect(
        state.canExit(model)
      ).toEqual(false)
    });
  });

  describe('canApply()', () => {
    it('Возвращает true, если нет ошибок интеграций', () => {
      const state = new SecondState();
      const model = {
        ...initialModel,
        meta: {
          integrationHasError: false,
        }
      };
      expect(
        state.canApply(model)
      ).toEqual(true);
    });

    it('Возвращает true, если вообще нет информации в заявке', () => {
      const state = new SecondState();

      expect(
        state.canApply({})
      ).toEqual(true);
    })
  })
});

import { ActionTypes } from "../types/action-types";
import { v4 as uuidv4 } from "uuid";
import { Action, IExchange } from "../types/types";
import { save_exchanges, get_exchanges } from "../services/index";

export interface RootState {
  exchanges: IExchange[];
}

const initialState: RootState = {
  exchanges: get_exchanges() || [
    {
      id: uuidv4(),
      from: {
        code: "USD",
        value: 1,
      },
      to: [{ id: uuidv4(), code: "UZS" }],
    },
  ],
};

export default function (
  state: RootState = initialState,
  action: Action
): RootState {
  const { exchanges } = state;
  switch (action.type) {
    case ActionTypes.ADD_EXCHANGE: {
      const lastExchange = exchanges[exchanges.length - 1];
      const newExchange = {
        id: uuidv4(),
        from: lastExchange.from,
        to: lastExchange.to.map((currency) => ({
          ...currency,
          id: uuidv4(),
        })),
      };
      const exchangeList = [...exchanges, newExchange];
      save_exchanges(exchangeList);

      return { exchanges: exchangeList };
    }
    case ActionTypes.ADD_TO_BY_EID: {
      const exchangeList = exchanges.map((exchange) => {
        if (exchange.id === action.payload) {
          return {
            ...exchange,
            to: [...exchange.to, { id: uuidv4(), code: "UZS" }],
          };
        }
        return exchange;
      });
      save_exchanges(exchangeList);
      return { exchanges: exchangeList };
    }
    case ActionTypes.REMOVE_TO_BY_CID_AND_EID: {
      const { currencyId, exchangeId } = action.payload;
      const exchangeList = exchanges.map((exchange) => {
        if (exchange.id === exchangeId) {
          return {
            ...exchange,
            to: exchange.to.filter((currency) => currency.id !== currencyId),
          };
        }
        return exchange;
      });
      save_exchanges(exchangeList);
      return { exchanges: exchangeList };
    }
    case ActionTypes.EDIT_TO_CODE_BY_CID_AND_EID: {
      const { code, currencyId, exchangeId } = action.payload;
      const exchangeList = exchanges.map((exchange) => {
        if (exchange.id === exchangeId) {
          return {
            ...exchange,
            to: exchange.to.map((currency) => {
              if (currency.id === currencyId) {
                return {
                  ...currency,
                  code,
                };
              }
              return currency;
            }),
          };
        }
        return exchange;
      });
      save_exchanges(exchangeList);
      return { exchanges: exchangeList };
    }
    case ActionTypes.EDIT_FROM_CODE_BY_EID: {
      const { code, exchangeId } = action.payload;
      const exchangeList = exchanges.map((exchange) => {
        if (exchange.id === exchangeId) {
          return {
            ...exchange,
            from: {
              ...exchange.from,
              code,
            },
          };
        }
        return exchange;
      });
      save_exchanges(exchangeList);
      return { exchanges: exchangeList };
    }
    case ActionTypes.EDIT_FROM_VALUE_BY_EID: {
      const { value, exchangeId } = action.payload;
      const exchangeList = exchanges.map((exchange) => {
        if (exchange.id === exchangeId) {
          return {
            ...exchange,
            from: {
              ...exchange.from,
              value,
            },
          };
        }
        return exchange;
      });
      save_exchanges(exchangeList);
      return { exchanges: exchangeList };
    }
    default:
      return state;
  }
}

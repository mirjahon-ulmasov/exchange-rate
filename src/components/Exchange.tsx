import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrencyByEId,
  addExchange,
  editFromCodeByEId,
  editFromValueByEId,
  editToCodeByCIdAndEId,
  removeCurrencyByCIdAndEId,
} from "../store/action-creator";
import { RootState } from "../store/reducer";

import trashImg from "../assets/icons/trash.svg";
import plusImg from "../assets/icons/plus.svg";
import equalImg from "../assets/icons/equal.svg";

import Dropdown from "./Dropdown";

const Exchange = () => {
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState<any>(null);
  const [error, setError] = useState("");
  const dispatch: Dispatch<any> = useDispatch();
  const state = useSelector((state: RootState) => state.exchanges);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v3/latest?apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (response.status !== 200) {
          throw new Error("Could not fetch data");
        }
        const currency = response.data;
        setCodes(currency.data);
        setError("");
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
        else setError(String(error));
        setCodes(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrency();
  }, []);

  const addCurrencyHandler = (id: string) => {
    dispatch(addCurrencyByEId(id));
  };

  const addExchangeHandler = () => {
    dispatch(addExchange());
  };

  const getValue = (
    fromCode: string,
    amount: number,
    toCode: string
  ): number => {
    const fromValueInUSD = codes[fromCode].value;
    const toValueInUSD = codes[toCode].value;

    const exchangeRate = toValueInUSD / fromValueInUSD;
    return Math.round(exchangeRate * amount * 100) / 100;
  };

  return (
    <>
      {loading && <div className="state">Loading...</div>}
      {error && <div className="state">{error}</div>}
      {state && codes && (
        <form>
          <h1>
            <span>From</span>
            <span>To</span>
          </h1>
          {state.map((exchange) => {
            return (
              <div className="row" key={exchange.id}>
                <div className="field">
                  <Dropdown
                    options={Object.keys(codes)}
                    defaultVal={exchange.from.code}
                    onSelect={(code) => {
                      dispatch(editFromCodeByEId(code, exchange.id));
                    }}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={exchange.from.value}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      dispatch(editFromValueByEId(value, exchange.id));
                    }}
                  />
                </div>
                <span className="equal">
                  <img src={equalImg} alt="equal" />
                </span>
                {exchange.to.map((currency, index) => {
                  return (
                    <div className="field" key={currency.id}>
                      <Dropdown
                        options={Object.keys(codes)}
                        defaultVal={currency.code}
                        onSelect={(code) => {
                          dispatch(
                            editToCodeByCIdAndEId(
                              code,
                              currency.id,
                              exchange.id
                            )
                          );
                        }}
                      />
                      <input
                        type="text"
                        readOnly
                        inputMode="decimal"
                        autoComplete="off"
                        value={getValue(
                          exchange.from.code,
                          exchange.from.value,
                          currency.code
                        )}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(
                              removeCurrencyByCIdAndEId(
                                currency.id,
                                exchange.id
                              )
                            );
                          }}
                        >
                          <img src={trashImg} alt="trash" />
                        </button>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="add"
                  onClick={() => addCurrencyHandler(exchange.id)}
                >
                  <img src={plusImg} alt="plus" />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="add"
            style={{ marginTop: "1rem" }}
            onClick={addExchangeHandler}
          >
            <img src={plusImg} alt="plus" />
          </button>
        </form>
      )}
    </>
  );
};

export default Exchange;

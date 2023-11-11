import { createContext, useReducer } from "react";

export const BalancesContext = createContext();

export const balanceReducer = (state, action) => {
    switch (action.type) {
        case "SET_BALANCES":
            return {
                balances: action.payload,
            };
        case "CREATE_BALANCES":
            return {
                balances: [action.payload, ...state.balances],
            };
        case "DELETE_BALANCE":
            return {
                balances: state.balances.filter(
                    (b) => b._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
};

export const BalanceContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(balanceReducer, {
        balances: null,
    });

    return (
        <BalancesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BalancesContext.Provider>
    );
};

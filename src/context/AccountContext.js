import { createContext, useReducer } from "react";

export const AccountContext = createContext();

export const accountReducer = (state, action) => {
    switch (action.type) {
        case "SET_ACCOUNTS":
            return {
                accounts: action.payload,
            };
        case "CREATE_ACCOUNT":
            return {
                accounts: [action.payload, ...state.accounts],
            };
        case "DELETE_ACCOUNT":
            return {
                accounts: state.accounts.filter(
                    (a) => a._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
};

export const AccountContextProvider = ({ children }) => {
    const [state, dispatchTwo] = useReducer(accountReducer, {
        accounts: null,
    });

    return (
        <AccountContext.Provider value={{ ...state, dispatchTwo }}>
            {children}
        </AccountContext.Provider>
    );
};

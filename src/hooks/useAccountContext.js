import { AccountContext } from "../context/AccountContext";
import { useContext } from "react";

export const useAccountContext = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw Error("useAccountContext inside an AccountContextProvider");
    }

    return context;
};

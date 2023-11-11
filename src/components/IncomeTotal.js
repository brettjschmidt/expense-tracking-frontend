import React, { useEffect } from "react";
import { useAccountContext } from "../hooks/useAccountContext";

const IncomeTotal = () => {
    const { accounts, dispatchTwo } = useAccountContext();

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch("/api/accounts");
            const json = await response.json();

            if (response.ok) {
                dispatchTwo({ type: "SET_ACCOUNTS", payload: json });
            }
        };

        fetchAccounts();
    }, []);

    const calculateTotalIncome = () => {
        if (accounts) {
            const totalIncome = accounts.reduce((total, account) => {
                return total + account.amount;
            }, 0);
            console.log(totalIncome);
            return totalIncome.toFixed(2);
        }
        return 0.0;
    };
    return (
        <div className="income-total">
            {accounts && <p>Income Total: ${calculateTotalIncome()}</p>}
        </div>
    );
};

export default IncomeTotal;

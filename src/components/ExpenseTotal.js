import React, { useEffect } from "react";
import { useBalancesContext } from "../hooks/useBalanceContext";

const ExpenseTotal = () => {
    const { balances, dispatch } = useBalancesContext();

    useEffect(() => {
        const fetchBalances = async () => {
            const response = await fetch("/api/balances");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BALANCES", payload: json });
            }
        };

        fetchBalances();
    }, []);

    const calculateTotalExpense = () => {
        if (balances) {
            const totalExpense = balances.reduce((total, balance) => {
                return total + balance.amount;
            }, 0);
            console.log(totalExpense);
            return totalExpense.toFixed(2);
        }
        return 0.0;
    };

    return (
        <div className="expense-total">
            {balances && <p>Expense Total: ${calculateTotalExpense()}</p>}
        </div>
    );
};

export default ExpenseTotal;

import React from "react";
import IncomeTotal from "./IncomeTotal";
import ExpenseTotal from "./ExpenseTotal";
import { useAccountContext } from "../hooks/useAccountContext";
import { useBalancesContext } from "../hooks/useBalanceContext";

const BalanceTotal = () => {
    const { accounts } = useAccountContext();
    const { balances } = useBalancesContext();

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

    const calculateBalance = () => {
        const totalIncome = parseFloat(calculateTotalIncome());
        const totalExpense = parseFloat(calculateTotalExpense());
        return (totalIncome - totalExpense).toFixed(2);
    };

    return (
        <div className="balance-total-wrapper">
            <IncomeTotal />
            <ExpenseTotal />
            <div className="balance-total">
                <p>Balance Total: ${calculateBalance()}</p>
            </div>
        </div>
    );
};

export default BalanceTotal;

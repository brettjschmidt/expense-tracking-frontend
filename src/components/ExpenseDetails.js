import React from "react";
import { useBalancesContext } from "../hooks/useBalanceContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const ExpenseDetails = ({ balance }) => {
    const { dispatch } = useBalancesContext();

    const handleClick = async () => {
        const response = await fetch("/api/balances/" + balance._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_BALANCE", payload: json });
        }
    };

    const alert = () => toast("Expense Deleted");

    return (
        <div className="expense-details">
            <h4>{balance.title}</h4>
            <p>
                <strong>Amount $</strong>
                {balance.amount}
            </p>
            <p>
                <strong>Category: </strong>
                {balance.category}
            </p>
            <p>
                {formatDistanceToNow(new Date(balance.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span
                className="delete-icon"
                onClick={() => {
                    handleClick();
                    alert();
                }}
            >
                <MdDeleteForever />
            </span>
        </div>
    );
};

export default ExpenseDetails;

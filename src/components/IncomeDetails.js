import React from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const IncomeDetails = ({ account }) => {
    const { dispatchTwo } = useAccountContext();

    const handleClick = async () => {
        const response = await fetch("/api/accounts/" + account._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatchTwo({ type: "DELETE_ACCOUNT", payload: json });
        }
    };

    const income = () => toast("Income Deleted");

    return (
        <div className="income-details">
            <h4>{account.category}</h4>
            <p>
                <strong>Amount $</strong>
                {account.amount}
            </p>
            <p>
                {formatDistanceToNow(new Date(account.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span
                className="income-delete-icon"
                onClick={() => {
                    handleClick();
                    income();
                }}
            >
                <MdDeleteForever />
            </span>
        </div>
    );
};

export default IncomeDetails;

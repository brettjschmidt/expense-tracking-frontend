import React, { useState } from "react";
import { useBalancesContext } from "../hooks/useBalanceContext";
import { toast } from "react-toastify";

const ExpenseForm = () => {
    const { dispatch } = useBalancesContext();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const balance = { title, amount, category };

        const response = await fetch("/api/balances", {
            method: "POST",
            body: JSON.stringify(balance),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle("");
            setAmount("");
            setCategory("");
            setError(null);
            setEmptyFields([]);
            console.log("new expense added", json);
            dispatch({ type: "CREATE_BALANCES", payload: json });
        }
    };

    const notify = () => toast("Expense added");

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="expense-form-text">
                <h3>Add a New Expense</h3>
            </div>
            {error && <div className="error">{error}</div>}
            <label>Expense Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Amount ($0.00)</label>
            <input
                type="numbers"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes("amount") ? "error" : ""}
            />

            <label>Category:</label>
            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes("category") ? "error" : ""}
            >
                <option value=""></option>
                <option value="Cell Phone">Cell Phone</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food/Groceries">Food/Groceries</option>
                <option value="Housing/Rent">Housing/Rent</option>
                <option value="Insurance">Insurance</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Personal Grooming">Personal Grooming</option>
                <option value="School">School</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Transportation">Transportation</option>
                <option value="Utility Bills">Utility Bills</option>
            </select>

            <button onClick={notify}>
                <strong>Add Expense</strong>
            </button>
        </form>
    );
};

export default ExpenseForm;

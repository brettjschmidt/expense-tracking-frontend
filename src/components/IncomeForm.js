import React, { useState } from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import { toast } from "react-toastify";

const IncomeForm = () => {
    const { dispatchTwo } = useAccountContext();
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const account = { category, amount };

        const response = await fetch("/api/accounts", {
            method: "POST",
            body: JSON.stringify(account),
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
            setCategory("");
            setAmount("");
            setError(null);
            setEmptyFields([]);
            console.log("new income added", json);
            dispatchTwo({ type: "CREATE_ACCOUNT", payload: json });
        }
    };

    const profits = () => toast("Income added");

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="income-form-text">
                <h3>Add a New Income</h3>
            </div>
            {error && <div className="error">{error}</div>}
            <label>Category:</label>
            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes("category") ? "error" : ""}
            >
                <option value=""></option>
                <option value="Paycheck">Paycheck</option>
                <option value="Side Hustle">Side Hustle</option>
                <option value="Gift">Gift</option>
            </select>

            <label>Amount ($0.00)</label>
            <input
                type="numbers"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes("amount") ? "error" : ""}
            />

            <button onClick={profits}>
                <strong>Add Income</strong>
            </button>
        </form>
    );
};

export default IncomeForm;

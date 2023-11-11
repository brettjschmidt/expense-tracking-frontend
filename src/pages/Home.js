import { useEffect } from "react";
import { useBalancesContext } from "../hooks/useBalanceContext";
import { useAccountContext } from "../hooks/useAccountContext";

// Components
import BalanceDetails from "../components/ExpenseDetails";
import AccountDetails from "../components/IncomeDetails";
import ExpenseForm from "../components/ExpenseForm";
import AccountForm from "../components/IncomeForm";

const Home = () => {
    const { balances, dispatch } = useBalancesContext();
    const { accounts, dispatchTwo } = useAccountContext();

    useEffect(() => {
        const fetchBalances = async () => {
            const response = await fetch("/api/balances");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BALANCES", payload: json });
            }
        };
        const fetchAccounts = async () => {
            const response = await fetch("/api/accounts");
            const json = await response.json();

            if (response.ok) {
                dispatchTwo({ type: "SET_ACCOUNTS", payload: json });
            }
        };

        fetchAccounts();

        fetchBalances();
    }, [dispatch, dispatchTwo]);

    return (
        <div className="home">
            <div className="left-side-wrapper">
                <div className="balances">
                    {balances &&
                        balances.map((balance) => (
                            <BalanceDetails
                                key={balance._id}
                                balance={balance}
                            />
                        ))}
                    <div className="input-forms">
                        <ExpenseForm />
                    </div>
                </div>
            </div>

            <div className="right-side-wrapper">
                <div className="accounts">
                    {accounts &&
                        accounts.map((account) => (
                            <AccountDetails
                                key={account._id}
                                account={account}
                            />
                        ))}
                    <div className="input-forms">
                        <AccountForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

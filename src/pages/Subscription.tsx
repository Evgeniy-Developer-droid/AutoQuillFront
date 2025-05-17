import { useEffect, useState } from "react";
import apiRequest from "../requests";

function Subscription(props) {
    const [error, setError] = useState("");
    const [subscription, setSubscription] = useState({});
    const [paymentHistory, setPaymentHistory] = useState([]);

    const getSubscription = () => {
        apiRequest({
            url: "/api/v1/billing/subscription",
            method: "GET",
        })
            .then((response) => {
                setSubscription(response.data);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch subscription");
                console.error(error);
            });
    }

    const getPaymentHistory = () => {
        apiRequest({
            url: "/api/v1/billing/payments",
            method: "GET",
        })
            .then((response) => {
                setPaymentHistory(response.data.payments);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch payment history");
                console.error(error);
            });
    }

    useEffect(() => {
        getSubscription();
        getPaymentHistory();
    }, []);

    return <>
        {error && <div className="alert alert-error shadow-sm">
            <div>
                <span>{error}</span>
            </div>
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="card bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Subscription Plan</h2>
                    <p>Plan: <span className={"font-bold text-lg"}>{subscription?.plan?.name}</span></p>
                    <p>Price: <span className={"font-bold text-lg"}>{subscription?.plan?.price} $</span></p>
                    {!subscription?.plan?.is_trial && <p>Last payment at: {subscription?.last_payment_at}</p>}
                </div>
            </div>

            <div className="card bg-base-300 shadow-xl">
                <div className="card-body">
                    <div className={"flex-row items-center justify-between w-full flex"}>
                        <div className="text-xl basis-1/3"></div>
                        <div className="text-xl basis-1/3">Usage</div>
                        <div className="text-xl basis-1/3">Limit</div>
                    </div>
                    <div className={"flex-row items-center justify-between w-full flex"}>
                        <div className="basis-1/3">AI generation</div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-success">{
                            subscription?.usages ?
                                subscription?.usages.filter((usage) => usage.action_type === "ai").length
                                : 0
                        }</span></div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-primary">{subscription?.plan?.ai_generation_limit}</span></div>
                    </div>
                    <div className={"flex-row items-center justify-between w-full flex"}>
                        <div className="basis-1/3">Post sending</div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-success">{
                            subscription?.usages ?
                                subscription?.usages.filter((usage) => usage.action_type === "post").length
                                : 0
                        }</span></div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-primary">{subscription?.plan?.send_post_limit}</span></div>
                    </div>
                    <div className={"flex-row items-center justify-between w-full flex"}>
                        <div className="basis-1/3">Total</div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-success">{subscription?.usages ? + subscription?.usages.length : 0}</span></div>
                        <div className="basis-1/3"><span className="badge badge-outline badge-primary">{subscription?.plan?.send_post_limit + subscription?.plan?.ai_generation_limit}</span></div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Actions</h2>
                    <button className="btn btn-primary" onClick={() => alert("Upgrade Subscription")}>Upgrade Subscription</button>
                    <button className="btn btn-secondary" onClick={() => alert("Cancel Subscription")}>Cancel Subscription</button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
            <div className="card bg-base-300 shadow-xl">
                <div className="card-body">
                    <div className={"flex-row items-center justify-between w-full flex"}>
                        <div className="basis-1/3">Balance token <span className={"badge badge-outline badge-primary"}>{subscription?.balance_tokens}</span></div>
                        <div className="basis-1/3 align-middle">Referral code <span className={"text-xl font-bold p-2 bg-base-100 rounded-xl"}>{subscription?.referral_code}</span></div>
                        <div className="basis-1/3"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* payment history table */}
        <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Payment History</h2>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory && paymentHistory.map((payment) => (
                            <tr key={payment.id}>
                                <td>
                                    {payment.order_id}
                                </td>
                                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                                <td>{payment.amount}</td>
                                <td>
                                    {payment.is_successful ? (
                                        <span className="badge badge-success">Succeeded</span>
                                    ) : (
                                        <span className="badge badge-error">Failed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    </>;
}

export default Subscription;
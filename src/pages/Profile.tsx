import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../requests";


function Profile() {
    const { t } = useTranslation();
    const [user, setUser] = useState({
        email: "",
        full_name: "",
        last_login: "",
        role: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        apiRequest({
            url: "/api/v1/users/me",
            method: "GET",
        }).then(
            (response) => {
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setError(t(response.data.detail));
                }
            }
        )
    }, []);

    return <>
            {error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{t(error)}</span>
                </div>
            </div>}
        <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-2xl">{user.full_name}</h2>
                <p className={"text-xl"}>{user.email}</p>
                <p className={"text-xl"}>{t("Last login")}: {new Date(user.last_login).toLocaleString()}</p>
                <p className={"text-xl"}>{t("Role")}: {user.role}</p>
            </div>
        </div>
    </>
}
export default Profile;


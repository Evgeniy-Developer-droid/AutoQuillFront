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
    const [updatePassword, setUpdatePassword] = useState({
        old_password: "",
        password: "",
        password_repeat: ""
    });
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const [updateUser, setUpdateUser] = useState({
        full_name: ""
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
                    setUpdateUser({
                        full_name: response.data.full_name
                    });
                } else {
                    setToast(true);
                    setToastMessage(t(response.data.detail[0].msg));
                    setToastType("error");
                    setTimeout(() => {
                        setToast(false);
                        setToastMessage(null);
                    }, 2000);
                }
            }
        )
    }, []);

    const updatePasswordFetch = () => {
        if (updatePassword.password !== updatePassword.password_repeat) {
            setToast(true);
            setToastMessage(t("Passwords do not match"));
            setToastType("error");
            setTimeout(() => {
                setToast(false);
                setToastMessage(null);
            }, 2000);
            return;
        }
        apiRequest({
            url: "/api/v1/users/password",
            method: "PUT",
            body: updatePassword
        }).then(
            (response) => {
                console.log(response);
                if (response.status === 200) {
                    setToast(true);
                    setToastMessage(t("Password updated"));
                    setToastType("success");
                    setTimeout(() => {
                        setToast(false);
                        setToastMessage(null);
                    }, 2000);
                } else {
                    console.log(response);
                    setToast(true);
                    setToastMessage(t(response.data.detail[0].msg));
                    setToastType("error");
                    setTimeout(() => {
                        setToast(false);
                        setToastMessage(null);
                    }, 2000);
                }
            }
        )
    }

    const updateUserFetch = () => {
        apiRequest({
            url: "/api/v1/users/me",
            method: "PUT",
            body: updateUser
        }).then(
            (response) => {
                if (response.status === 200) {
                    setToast(true);
                    setToastMessage(t("User updated"));
                    setToastType("success");
                    setTimeout(() => {
                        setToast(false);
                        setToastMessage(null);
                    }, 2000);
                } else {
                    setToast(true);
                    setToastMessage(t(response.data.detail[0].msg));
                    setToastType("error");
                    setTimeout(() => {
                        setToast(false);
                        setToastMessage(null);
                    }, 2000);
                }
            }
        )
    }

    return <>
            {error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{error}</span>
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
        <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="card bg-base-200 shadow-sm mt-5">
                <div className="card-body">
                    <h2 className="card-title text-2xl">{t("Update user")}</h2>
                    <input type="text" placeholder={t("Full name")} className="input input-bordered w-full mb-5"
                    value={updateUser.full_name}
                           onChange={(e) => setUpdateUser({ ...updateUser, full_name: e.target.value })} />
                    <button className="btn btn-primary" onClick={updateUserFetch}>{t("Update")}</button>
                </div>
            </div>
            <div className="card bg-base-200 shadow-sm mt-5">
                <div className="card-body">
                    <h2 className="card-title text-2xl">{t("Update password")}</h2>
                    <input type="password" placeholder={t("Old password")} className="input input-bordered w-full mb-5"
                        value={updatePassword.old_password}
                           onChange={(e) => setUpdatePassword({ ...updatePassword, old_password: e.target.value })} />
                    <input type="password" placeholder={t("New password")} className="input input-bordered w-full mb-5"
                        value={updatePassword.password}
                           onChange={(e) => setUpdatePassword({ ...updatePassword, password: e.target.value })} />
                    <input type="password" placeholder={t("Repeat new password")} className="input input-bordered w-full mb-5"
                        value={updatePassword.password_repeat}
                           onChange={(e) => setUpdatePassword({ ...updatePassword, password_repeat: e.target.value })} />
                    <button className="btn btn-primary" onClick={updatePasswordFetch}>{t("Update")}</button>
                </div>
            </div>
        </div>
        {toast && <div className={`toast toast-top toast-end`}>
                <div className={`alert alert-${toastType}`}>
                    <div>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            </div>}
    </>
}
export default Profile;


import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../requests";


function Register() {
    const { t } = useTranslation();

    const [data, setData] = useState({
        email: "",
        password: "",
        full_name: "",
        confirm_password: "",
    });
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (data.password !== data.confirm_password) {
            setError(t("Passwords do not match"));
            return;
        }
        const params = {}
        if (referralCode) {
            params.referral_code = referralCode;
        }
        apiRequest({
            url: "/api/v1/auth/register",
            method: "POST",
            body: {
                email: data.email,
                password: data.password,
                full_name: data.full_name,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            params: params
        }).then(
            (response) => {
                if (response.status === 200) {
                    window.location.href = "/login?status=registered";
                } else {
                    setError(t(response.data.detail[0].msg));
                }
            }
        )
    }

  return <>
    <div className={"flex flex-col items-center justify-center h-screen bg-base-200"}>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{t("Sign Up")}</h2>
            {error && <div className="alert alert-error shadow-sm">
                <div>
                <span>{t(error)}</span>
                </div>
                </div>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("Email")}</legend>
            <input type="email" className="input" placeholder="user@email.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("Full name")}</legend>
            <input type="text" className="input" placeholder="John Dou"
                value={data.full_name}
                onChange={(e) => setData({ ...data, full_name: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("Password")}</legend>
            <input type="password" className="input" placeholder="********"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("Confirm Password")}</legend>
            <input type="password" className="input" placeholder="********"
                value={data.confirm_password}
                onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("Referral Code (optional)")}</legend>
            <input type="text" className="input" placeholder="Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
            />
          </fieldset>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>{t("Sign Up")}</button>
            <p className="text-sm text-center">
                {t("Already have an account?")} <a href="/login" className="link">{t("Sign In")}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}
export default Register;

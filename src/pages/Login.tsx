import { useEffect, useState } from "react";
import apiRequest from "../requests";

function Login() {

  const [data, setData] = useState({
    email: "",
    password: "",
  });
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");
        if (status === "registered") {
            setRegistered(true);
        }

    } , []);

    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        apiRequest({
            url: "/api/v1/auth/token",
            method: "POST",
            body: {
                email: data.email,
                password: data.password,
            },
        }).then(
            (response) => {
                if (response.status === 200) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("refresh_token", response.data.refresh_token);
                    window.location.href = "/dashboard";
                } else {
                  console.log(response);
                    setError(response.data.detail);
                }
            }
        )
    }


  return <>
    <div className={"flex flex-col items-center justify-center h-screen bg-base-200"}>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sign In</h2>
          {error && <div className="alert alert-error shadow-sm">
            <div>
              <span>{error}</span>
            </div>
            </div>}
            {registered && <div className="alert alert-success shadow-sm">
            <div>
              <span>Account created successfully, please sign in</span>
            </div>
            </div>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input type="email" className="input" placeholder="user@email.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" className="input" placeholder="********"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </fieldset>
          <div className="card-actions">
            <button className="btn btn-primary"
                onClick={handleSubmit}
            >Sign in</button>
            <p className="text-sm text-center">
              Don't have an account? <a href="/register" className="link">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login;
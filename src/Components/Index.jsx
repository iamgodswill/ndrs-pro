import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
// import usericon from '../images/user-icon.svg'

const Index = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const { twoFactorAuth, setTwoFactorAuth } = useContext(AppContext);
  console.log(twoFactorAuth);

  const onHandleChange = (e) => {
    setTwoFactorAuth({ ...twoFactorAuth, [e.target.name]: e.target.value });
    console.log(twoFactorAuth);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   //   try {
  //   //     const baseUrl = 'https://phpstack-1245936-4460801.cloudwaysapps.com/dev'
  //   //      const response = await fetch( baseUrl + '/api/two-factor-authentication', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json'
  //   //     },
  //   //     body: JSON.stringify(twoFactorAuth)
  //   //   });

  //   //   if (!response.ok) {
  //   //     throw new Error('two-factor-authentification-failed');
  //   //   }

  //   //   // Assuming the response contains a JSON object with a token
  //   //   const data = await response.json();
  //   //   console.log(data);
  //   //   navigate('/Verification2')
  //   // } catch (error) {
  //   //   console.error('Error logging in:', error);
  //   // }
  //   navigate("/LoginPassword");
  // };
  return (
    <>
      <div className="auth-container d-flex align-items-center justify-content-center vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="card border-0 custom-card">
                <div className="card-body">
                  <div className="text-center">
                    <img
                      src="/images/user-icon.svg"
                      className="img-fluid mb-3"
                      alt="create an account"
                    />
                  </div>
                  <h1 className="heading text-center mb-3">
                    Welcome to the Nigerian Dispute Resolution System
                  </h1>
                  <p className="mb-4 text-muted-2">
                    We’ll send a code for to your provided email or mobile
                    number for verification.
                  </p>

                  <form action="" method="post">
                    <div className="mb-3">
                      <label className="form-label">
                        Email or Mobile number
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-height"
                        placeholder="Type in your email or mobile number"
                        onChange={onHandleChange}
                      />
                    </div>

                    <div className="mt-4">
                      <button className="btn btn-size btn-main-primary w-100">
                        Verify
                      </button>
                    </div>
                  </form>

                  <p className="mt-4 text-center text-muted-3 mb-0">
                    Are you new here?{" "}
                    <a
                      href="/CreateAccount"
                      className="text-main-primary text-medium text-decoration-none"
                    >
                      Create account
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

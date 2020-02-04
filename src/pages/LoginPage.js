import React, {useEffect, useState, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    // for REGISTER !
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            console.log("data", data)
        } catch (e) {}
    };

    // for LOGIN !
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId);
            console.log("User login data: ", data)
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card grey darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Sign in</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email"
                                       type="email"
                                       className="validate"
                                       name="email"
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password"
                                       type="password"
                                       className="validate"
                                       minLength="6"
                                       maxLength="16"
                                       name="password"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action right-align">
                        <button className="btn waves-effect waves-light deep-orange"
                                type="submit"
                                name="action"
                                disabled={loading}
                                onClick={registerHandler}
                        >Register</button>
                        <button className="btn waves-effect waves-light deep-orange pulse"
                                type="submit"
                                name="action"
                                disabled={loading}
                                onClick={loginHandler}
                        >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
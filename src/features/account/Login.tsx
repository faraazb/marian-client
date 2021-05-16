import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, selectUser, selectUserLoginError, selectUserLoginStatus} from "./userSlice";
import {Button, Card, Checkbox, Elevation, FormGroup, Icon, InputGroup, Intent} from "@blueprintjs/core";
// @ts-ignore
import {Link, useHistory} from "react-router-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./Login.css"
import {LoginSuccessfulToast} from "../Toast";

export interface loginState {
    username: string;
    password: string;
    rememberMe: boolean;
}

// export class LoginForm extends React.PureComponent<loginState> {
//     private dispatch = useDispatch();
//     public state: loginState = {
//         username: "",
//         password: "",
//         rememberMe: true,
//     }
// }

export function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);
    const loginStatus = useSelector(selectUserLoginStatus);
    const loginError = useSelector(selectUserLoginError);
    const [username, setUsername] = useState("");
    const [usernameIntent, setUsernameIntent] = useState<Intent>(Intent.PRIMARY);
    const [usernameHelper, setUsernameHelper] = useState<string | null>(null)
    const [password, setPassword] = useState("");
    const [passwordIntent, setPasswordIntent] = useState<Intent>(Intent.PRIMARY);
    const [passwordHelper, setPasswordHelper] = useState<string | null>(null)
    const [rememberMe, setRememberMe] = useState(true);
    const [passwordFieldType, setPasswordFieldType] = useState("password");

    useEffect(() => {
        if (loginStatus === 'succeeded') {
            console.log("Login successful")
            if (user !== undefined) {
                console.log(user.username);
                LoginSuccessfulToast.show({message: "Login Successful!", intent:Intent.SUCCESS})
                if (rememberMe) {
                    localStorage.setItem("token", user.token);
                }
                history.push("/");
            }
        }
        else if (loginStatus === 'failed') {
            console.log("Login Failed!")
            console.log(loginError);
        }
    }, [loginStatus, dispatch])


    const formSubmit = (event: { preventDefault: () => void; }) => {
        console.log("Stage 1");
        event.preventDefault();
        console.log("Stage 2");
        if (username !== "" && password !== "") {
            console.log("Stage 3")
            dispatch(loginUser({username: username, password: password}));
        }
        if (username === "") {
            setUsernameIntent(Intent.DANGER)
            setUsernameHelper("A username is required")
            setTimeout(function () {
                setUsernameIntent(Intent.PRIMARY)
                setUsernameHelper(null)
            }, 4000);
        }
        if (password === "") {
            setPasswordIntent(Intent.DANGER)
            setPasswordHelper("A password is required")
            setTimeout(function () {
                setPasswordIntent(Intent.PRIMARY)
                setPasswordHelper(null)
            }, 4000);
        }
    }

    const eyeButton = <Button icon={"eye-off"} onClick={() => {
            if (passwordFieldType === "password")
                setPasswordFieldType("input")
            else if (passwordFieldType === "input") {
                setPasswordFieldType("password")
            }
        }
    }/>

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }
    window.addEventListener('popstate', () => {
        // history.push("/")
        history.push(document.referrer);
    })


    return (
        <div className="login-container">
            <Card elevation={Elevation.TWO}>
                <div className="login-card-content">
                    <div className="login-form-container">
                        <div className="login-header">
                            Log in
                        </div>
                        <FormGroup className="login-form-item"
                                   label={"Username"}
                                   intent={usernameIntent}
                                   labelFor={"input-username"}
                                   helperText={usernameHelper}
                        >
                            <InputGroup
                                id={"input-username"}
                                intent={usernameIntent}
                                placeholder={"You username.."}
                                onChange={(event => setUsername(event.target.value))}
                            />
                        </FormGroup>
                        <FormGroup className="login-form-item"
                                   label={"Password"}
                                   intent={passwordIntent}
                                   labelFor={"input-password"}
                                   helperText={passwordHelper}
                        >
                            <InputGroup
                                rightElement={eyeButton}
                                id={"input-password"}
                                intent={passwordIntent}
                                type={passwordFieldType}
                                placeholder={"Your password.."}
                                onChange={(event => setPassword(event.target.value))}
                            />
                        </FormGroup>
                        <FormGroup >
                            <Checkbox
                                label={"Remember Me"}
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                        </FormGroup>
                        <FormGroup
                            className="login-form-submit-button"
                        >
                            <Button
                                text={"Next"}
                                intent={Intent.PRIMARY}
                                fill={true}
                                onClick={formSubmit}
                            />
                        </FormGroup>
                    </div>
                    <Link to="/signup">New? Join us!</Link>
                    <Link to="/">Home</Link>
                </div>
            </Card>
        </div>
    )

}


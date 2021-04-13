import React, {useEffect, useState} from "react";
import {Button, FormGroup, InputGroup, Intent, PanelProps} from "@blueprintjs/core";


interface AccountDetailsInfo {
    firstname: string | null;
    lastname: string | null;
    phoneNumber: string | null;
    email: string | null;
}

export const AccountDetailsPanel: React.FC<PanelProps<AccountDetailsInfo>> = props => {
    const [username, setUsername] = useState<string | null>(null);
    const [usernameHelper, setUsernameHelper] = useState("Think of a username for yourself")
    const [passwordHelper, setPasswordHelper] = useState("Be Sharp! We haven't spent much " +
        "time on security! JK :P")
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPass, setConfirmPass] = useState<string | null>(null);
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [passwordFieldIntent, setPasswordFieldIntent] = useState<Intent>(Intent.PRIMARY)
    const [eye, setEye] = useState<string>("eye-open");


    // @ts-ignore
    const eyeButton = <Button icon={eye} onClick={() => {
            if (passwordFieldType === "password") {
                setPasswordFieldType("input")
                setEye("eye-off");
            }
            else if (passwordFieldType === "input") {
                setPasswordFieldType("password")
                setEye("eye-open");
            }
        }
    }/>


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>,
                                  setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        setter(event.target.value);
    }

    const validateForm = () => {
        const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/g
        if (password === "") {
            setPasswordHelper("Password is required!");
            setPasswordFieldIntent(Intent.DANGER)
        }
        else if (password === null) {
            //do nothing
        }
        else if (password && !password.match(passwordRegex)) {
            setPasswordHelper("Password must be of at least 8 characters and must " +
                "contain at least one number, one letter and one special character.");
            setPasswordFieldIntent(Intent.WARNING)
        }
        else if (password && confirmPass && password !== confirmPass) {
            setPasswordHelper("Passwords do not match");
            setPasswordFieldIntent(Intent.DANGER)
        }
        else {
            setPasswordHelper("Looks good!");
            setPasswordFieldIntent(Intent.SUCCESS)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => validateForm(), 500);
        return () => clearTimeout(timeout)
    }, [username, password, confirmPass]);

    const formSubmit = (event: { preventDefault: () => void; }) => {
        console.log("Signing up: Stage 1")
        event.preventDefault();
        validateForm();
    }

    return (
        <div>
            <Button
                intent={Intent.PRIMARY}
                onClick={() => props.closePanel()}
                icon={"arrow-left"}
                text="Back"
                className="back-button"
            />
            <div className="panel-content">
                <div className="header">
                    Credentials
                </div>
                <FormGroup className="panel-item"
                           label={"Username"}
                           helperText={usernameHelper}
                           intent={Intent.PRIMARY}
                           labelFor={"input-lastname"}
                >
                    <InputGroup
                        required={true}
                        id={"input-username"}
                        placeholder={"A clever username.."}
                        onChange={(event => setUsername(event.target.value))}
                    />
                </FormGroup>
                <FormGroup className="panel-item"
                           label={"Password"}
                           intent={passwordFieldIntent}
                           labelFor={"input-password"}
                           helperText={passwordHelper}
                >
                    <InputGroup
                        required={true}
                        intent={passwordFieldIntent}
                        rightElement={eyeButton}
                        id={"input-password"}
                        type={passwordFieldType}
                        placeholder={"An even clever password.."}
                        onChange={(event => handlePasswordChange(event, setPassword))}
                        onBlur={validateForm}
                    />
                </FormGroup>
                <FormGroup className="panel-item"
                           label={"Confirm Password"}
                           intent={passwordFieldIntent}
                           labelFor={"input-password-confirm"}
                >
                    <InputGroup
                        required={true}
                        intent={passwordFieldIntent}
                        id={"input-password-confirm"}
                        type={"password"}
                        placeholder={"Confirm password.."}
                        onChange={(event => handlePasswordChange(event, setConfirmPass))}
                        // onBlur={handlePasswordChange}
                    />
                </FormGroup>
                <Button className="panel-item"
                        intent={Intent.PRIMARY}
                        onClick={formSubmit}
                        text="Let's go!"
                />
            </div>
        </div>
    );
};
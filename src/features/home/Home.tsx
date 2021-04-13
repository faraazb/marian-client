import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserLoginError, selectUserLoginStatus} from "../account/userSlice";
import {LoginSuccessfulToast} from "../account/Toast";
import {Intent} from "@blueprintjs/core";
import {useHistory} from "react-router-dom";



export function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);
    const loginStatus = useSelector(selectUserLoginStatus);
    // const loginError = useSelector(selectUserLoginError);
    const hasToken = localStorage.getItem("token") ? true : false

    useEffect(() => {
        if (hasToken && loginStatus === "idle") {
            dispatch(fetchUser(localStorage.getItem('token') as string));
        }
    }, [hasToken]);

    useEffect(() => {
        if (loginStatus === "succeeded") {
            LoginSuccessfulToast.show({message: "Welcome Back!", intent:Intent.SUCCESS});
        }
        else if (loginStatus === "failed") {
            LoginSuccessfulToast.show({message: "Please login again!", intent:Intent.WARNING});
            history.push("/login")
        }
    }, [loginStatus, dispatch]);

    return (
        <div>
            <h2>
                Token Login Test - Current User:
            </h2>
            {user &&
            <div>
                <p>Username: {user.username}</p>
                <p>Phone Number: {user.phone_number}</p>
            </div>
            }
        </div>
    )
}
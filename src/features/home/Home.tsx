import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserLoginError, selectUserLoginStatus} from "../account/userSlice";
import {LoginSuccessfulToast} from "../Toast";
import {Button, Icon, Intent} from "@blueprintjs/core";
import {Link, useHistory} from "react-router-dom";
import "./Home.css"

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#003006'
};


const feedSomeone = {
    textDecoration: "none",
    color: '#5a994c'
};

export function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);
    const loginStatus = useSelector(selectUserLoginStatus);
    const [logOutButton, showLogOutButton] = useState(false)
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
            showLogOutButton(true)
        }
        else if (loginStatus === "failed") {
            LoginSuccessfulToast.show({message: "Please login again!", intent:Intent.WARNING});
            // history.push("/login")
        }
    }, [loginStatus, dispatch]);

    const logOut = () => {
        // showLogOutButton(false);
        localStorage.removeItem("token");
        window.location.reload();
    }

    // @ts-ignore
    return (
        <div className="home-container">
            {/*<h2>*/}
            {/*    Token Login Test - Current User:*/}
            {/*</h2>*/}
            {/*{user &&*/}
            {/*<div>*/}
            {/*    <p>Username: {user.username}</p>*/}
            {/*    <p>Phone Number: {user.phone_number}</p>*/}
            {/*</div>*/}
            {/*}*/}
            <div className="home-background">

            </div>
            <div className="home-top-navigation">
                <Link to={"/login"} style={linkStyle}>
                    LOGIN
                </Link>
                <Link to={"/signup"} style={linkStyle}>
                    SIGNUP
                </Link>
                <Link to={"/pickups"} style={linkStyle}>
                    DASHBOARD
                </Link>
            </div>
            {logOutButton && (
                <div className="home-logout">
                    {user && (
                        `Hey ${user.first_name}!`
                    )}
                    <Button className="home-logout-button" text="Log Out" onClick={logOut}/>
                </div>
            )}
            <div className="home-content">
                <div className="home-title">
                    ZeroWaste: A Companion to the<br/>
                    Zero Food Wastage Cause
                </div>
                <p className="home-description">
                    A prototype web app for NGOs working in the food
                    wastage reduction domain such as the Robinhood Army
                </p>
                <div className={"home-feed-someone"}>
                    <Link to={"/feed-someone"} style={feedSomeone}>
                        Feed Someone
                    </Link>
                    <Icon icon={"arrow-right"} iconSize={25}/>
                </div>
            </div>
        </div>
    )
}
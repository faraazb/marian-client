import React, {useEffect} from "react";
import {PickupList} from "./PickupList";
// import {PickupMap} from "./PickupMap";
import "./PickupDashboard.css"
import Map from "./Map";
import {fetchPickups, Pickup, selectPickupFetchStatus, selectPickups} from "./pickupSlice";
import {Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GenericToast} from "../../Toast";
import {Intent} from "@blueprintjs/core";
// import {PickupCard} from "./PickupCard";

const exampleList = [
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
    {
        name: "Faraaz",
        phoneNumber: "number"
    },
]

export function PickupDashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pickups = useSelector(selectPickups);
    const fetchPickupsStatus = useSelector(selectPickupFetchStatus);
    const hasToken = localStorage.getItem("token") ? true : false;

    useEffect(() => {
        if (fetchPickupsStatus === 'idle') {
            if (hasToken) {
                dispatch(fetchPickups(localStorage.getItem("token") as string))
            } else {
                GenericToast.show({message: "You need to be logged in!", intent: Intent.PRIMARY});
                history.push("/login")
            }
        }
    }, [fetchPickupsStatus, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
                dispatch(fetchPickups(localStorage.getItem("token") as string))
            }, 10000);
        return () => clearTimeout(timer);
    })

    // if (!hasToken) {
    //     return (
    //         <Redirect to={"/login"} />
    //     )
    // }

    // @ts-ignore
    return (
        <div className="pickup-dashboard">
            <div className="pickup-dashboard-list">
                <PickupList pickups={pickups}/>
            </div>
            <div className="pickup-dashboard-map">
                <Map pickups={pickups} />
            </div>
        </div>
    )
}
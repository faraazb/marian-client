import React from "react";
import {PickupList} from "./PickupList";
// import {PickupMap} from "./PickupMap";
import "./PickupDashboard.css"
import Map from "./Map";
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
    return (
        <div className="pickup-dashboard">
            <div className="pickup-dashboard-list">
                <PickupList />
            </div>
            <div className="pickup-dashboard-map">
                <Map />
            </div>
        </div>
    )
}
import React from "react";
import {PickupCard} from "./PickupCard";
import "./PickupList.css";
import {Card, Elevation} from "@blueprintjs/core";

export interface CardContent {
    name: string;
    phoneNumber: string;
}

const exampleList = [
    {
        name: "Faraaz",
        phoneNumber: "+918793791366"
    },
    {
        name: "Aditi",
        phoneNumber: "+918793791366"
    },
    {
        name: "Sheetal",
        phoneNumber: "+918793791366"
    },
    {
        name: "Pital",
        phoneNumber: "+918793791366"
    },
    {
        name: "Harambe",
        phoneNumber: "+918793791366"
    },
    {
        name: "Nubita",
        phoneNumber: "+918793791366"
    },
]

export function PickupList() {
    return (
        <div className="pickup-list">
            <div className="pickup-header">
                <h1>
                    Available Pickups
                </h1>
            </div>
            <Card className="pickup-list-container" elevation={Elevation.ONE}>
                {exampleList.map((pickup) => (
                    <div className="pickup-card-container">
                        <PickupCard name={pickup.name} phoneNumber={pickup.phoneNumber} />
                    </div>
                ))}
            </Card>
            <div>

            </div>
        </div>
    )
}
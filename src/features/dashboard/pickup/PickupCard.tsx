import React from "react";
import {CardContent} from "./PickupList";
import {Card, Elevation} from "@blueprintjs/core";

export function PickupCard(props: CardContent) {
    const {name, phoneNumber} = props

    return (
        <Card className="pickup-card" interactive={true} elevation={Elevation.TWO}>
            <h2>{name}</h2>
            <p>{phoneNumber}</p>
        </Card>
    )
}
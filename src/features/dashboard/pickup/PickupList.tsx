import React, {useEffect} from "react";
import {PickupCard} from "./PickupCard";
import "./PickupList.css";
import {Card, Elevation} from "@blueprintjs/core";
import {fetchPickups, Pickup, selectPickupFetchStatus, selectPickups} from "./pickupSlice";
import {useDispatch, useSelector} from "react-redux";
import  { Redirect } from 'react-router-dom'

export interface CardContent {
    id: string;
    created: string;
    name: string;
    phoneNumber: string;
    coordinates: number[];
    address: string;
    description: string;
}


interface IPickupListProp {
    pickups: Pickup[];
}

export function PickupList(props: IPickupListProp) {
    // const {pickups} = props

    return (
        <div className="pickup-list">
            <div className="pickup-header">
                <h1>
                    Available Pickups
                </h1>
            </div>
            <Card className="pickup-list-container" elevation={Elevation.ONE}>
                {props.pickups.map((pickup) => (
                    <div className="pickup-card-container">
                        <PickupCard
                            id = {pickup.id}
                            created={pickup.create_time}
                            name={pickup.name}
                            phoneNumber={pickup.phone_number}
                            coordinates={pickup.coordinates}
                            address={pickup.address}
                            description={pickup.description}
                        />
                    </div>
                ))}
            </Card>
            <div>

            </div>
        </div>
    )
}
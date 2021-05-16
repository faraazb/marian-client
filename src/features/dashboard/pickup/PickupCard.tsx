import React, {useState} from "react";
import {CardContent} from "./PickupList";
import {Card, ContextMenu, Elevation, Intent, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
// import {FlyToInterpolator} from "react-map-gl";
// import MapGL, {MapContext} from 'react-map-gl';
import axios from "axios";
import {DashboardToast} from "../../Toast";
import {useDispatch} from "react-redux";
import {removePickupById} from "./pickupSlice"

export function PickupCard(props: CardContent) {
    const dispatch = useDispatch();
    const {id, name, phoneNumber, address, coordinates, created, description} = props
    // const context = useContext(MapContext);
    const date = new Date(Date.parse(created));
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const token = localStorage.getItem("token")

    //Uses Mapbox's fly-to-interpolator to zoom to a report when the report card is clicked on.
    // const flyTo = useCallback((longitude, latitude) => {
    //     context.map.setViewport({
    //         longitude: longitude,
    //         latitude: latitude,
    //         zoom: 15,
    //         transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    //         transitionDuration: 'auto'
    //     });
    // }, []);

    // const doFlyTo = (longitude: number, latitude: number) => {
    //     context.map.flyTo()
    // }
    const markInactive = () => {
        axios.put(`http://localhost:8000/pickups/update/${id}`, {
            name: name,
            phone_number: phoneNumber,
            longitude: coordinates[0],
            latitude: coordinates[1],
            description: description,
            address: address,
            is_active: false
        }, {
            headers: {
                "Authorization": `JWT ${token}`
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch(removePickupById(String(id)));
                DashboardToast.show({message: "Marked Inactive", intent: Intent.PRIMARY});
            })
            .catch(function (error) {
                console.log(error);
                DashboardToast.show({message: "Failed", intent: Intent.DANGER});
            });
    }

    const markDone = () => {
        axios.put(`http://localhost:8000/pickups/update/${id}`, {
            name: name,
            phone_number: phoneNumber,
            longitude: coordinates[0],
            latitude: coordinates[1],
            description: description,
            address: address,
            is_done: true
        }, {
            headers: {
                "Authorization": `JWT ${token}`
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch(removePickupById(String(id)));
                DashboardToast.show({message: "Great!", intent: Intent.SUCCESS});
            })
            .catch(function (error) {
                DashboardToast.show({message: "Failed", intent: Intent.DANGER});
                console.log(error);
            });
    }

    const deletePickup = () => {
        axios.delete(`http://localhost:8000/pickups/delete/${id}`, {
            headers: {
                "Authorization": `JWT ${token}`
            }
        })
            .then(function (response) {
                dispatch(removePickupById(String(id)));
                DashboardToast.show({message: "Deleted!", intent: Intent.PRIMARY});
                // console.log(response);
            })
            .catch(function (error) {
                // console.log(error);
                DashboardToast.show({message: "Failed", intent: Intent.DANGER});
            });
    }


    const showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        // must prevent default to cancel parent's context menu
        e.preventDefault();
        // invoke static API, getting coordinates from mouse event
        ContextMenu.show(
            <Menu>
                <MenuItem icon="confirm" text="Mark as done" onClick={markDone}/>
                <MenuItem icon="outdated" text="Mark as inactive" onClick={markInactive}/>
                <MenuItem icon="delete" text="Delete" onClick={deletePickup}/>
                <MenuDivider />
                <MenuItem icon={"cross"} text="Close" />
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => setIsContextMenuOpen(false),
        );
        // indicate that context menu is open so we can add a CSS class to this element
        setIsContextMenuOpen(true);
    }

    return (
        <Card
            className="pickup-card"
            interactive={true}
            elevation={Elevation.TWO}
            onContextMenu={showContextMenu}
            // onClick={(event) => flyTo(coordinates[0], coordinates[1])}
        >
            <h3>{name}</h3>
            <p>{phoneNumber}</p>
            <p>When: {date.toLocaleString()}</p>
            <p>Where: {address}</p>
            <p>"{description}"</p>
        </Card>
    )
}
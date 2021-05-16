import React, {useEffect, useState} from "react";
import {Button, Card, Checkbox, Elevation, FormGroup, InputGroup, Intent, TextArea} from "@blueprintjs/core";
import {useHistory} from "react-router-dom";
import "./FeedSomeoneForm.css"
import {countryCodeMenu} from "./SelectCountryCode";
import {useDispatch, useSelector} from "react-redux";
import {requestPickup, selectPickupRequestStatus, setIdleRequest} from "../dashboard/pickup/pickupSlice";
import {PickupRequestToast} from "../Toast";

export function FeedSomeoneForm() {
    const dispatch = useDispatch();
    const requestStatus = useSelector(selectPickupRequestStatus);
    const history = useHistory();
    const [status, setStatus] = useState<string | null>("");
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [locationHelper, setLocationHelper] = useState<string>("Recommended: Press the locate button to " +
        "automatically determine your address");
    const [address, setAddress] = useState<string>("");


    const formSubmit = (event: {preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(requestPickup({name: name, phone_number: phoneNumber, longitude: longitude, latitude:latitude,
            description: description, address: address}));
    }

    useEffect(() => {
        if (requestStatus === "succeeded") {
            PickupRequestToast.show({message: "Success!Thank you :)", intent:Intent.SUCCESS});
            dispatch(setIdleRequest())
            history.push("/")
        }
        else if (requestStatus === "failed") {
            PickupRequestToast.show({message: "Please try again!", intent:Intent.WARNING});
            history.push("/")
        }
    }, [requestStatus, dispatch]);


    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Location: Unsupported');
        } else {
            setStatus('Locating');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLatitude(+position.coords.latitude.toFixed(5));
                setLongitude(+position.coords.longitude.toFixed(5));
                setLocationHelper("Amazing! Now it's fine if you don't add the specifics")
            }, () => {
                setStatus('Location: Failed');
            });
        }
    }

    return (
        <div className="feed-someone-container">
            <Card elevation={Elevation.TWO}>
                <div className="feed-someone-card-content">
                    <div className="feed-someone-form-container">
                        <div className="feed-someone-header">
                            Feed Someone
                        </div>
                        <FormGroup className="feed-someone-form-item"
                                   label={"Name"}
                                   // intent={usernameIntent}
                                   labelFor={"input-name"}
                                   labelInfo={"(required)"}
                                   // helperText={usernameHelper}
                        >
                            <InputGroup
                                required={true}
                                id={"input-name"}
                                placeholder={"Your name.."}
                                onChange={(event => setName(event.target.value))}
                            />
                        </FormGroup>
                        <FormGroup className="feed-someone-form-item"
                                   label={"Phone Number"}
                                   labelFor={"input-phone-number"}
                                   labelInfo={"(required)"}
                        >
                            <InputGroup
                                id={"input-phone_number"}
                                // placeholder={"+."}
                                leftElement={countryCodeMenu}
                                onChange={(event => setPhoneNumber(`+91${event.target.value}`))}
                            />
                        </FormGroup>
                        <FormGroup className="feed-someone-form-address"
                                   label={"Address"}
                                   labelFor={"input-address"}
                                   labelInfo={"(required)"}
                                   helperText={locationHelper}
                        >
                            <TextArea
                                required={true}
                                growVertically={true}
                                fill={true}
                                onChange={(event => setAddress(event.target.value))}
                            />
                            <Button text="Locate" icon={"locate"} onClick={getLocation} fill={true}/>
                        </FormGroup>
                        <FormGroup className="feed-someone-form-item"
                                   label={"Description and Quantity of Available Food"}
                                   labelFor={"input-food"}
                                   labelInfo={"(required)"}
                                   helperText={"Anything else? Add it above as well!"}
                        >
                            <TextArea
                                required={true}
                                // value={"Pulav and bhaji for at least 40 individuals"}
                                growVertically={true}
                                fill={true}
                                onChange={(event => setDescription(event.target.value))}
                            />
                        </FormGroup>
                        <FormGroup >
                            <Checkbox
                                label={"Some Agreement"}
                            />
                        </FormGroup>
                        <FormGroup
                            className="feed-someone-form-submit-button"
                        >
                            <Button
                                text={"Done"}
                                intent={Intent.PRIMARY}
                                fill={true}
                                onClick={formSubmit}
                            />
                        </FormGroup>
                    </div>
                </div>
            </Card>
        </div>
    )
}
import {Button, FormGroup, InputGroup, Intent, Panel, PanelProps} from "@blueprintjs/core";
import React, {useState} from "react";
import {AccountDetailsPanel} from "./AccountDetailsPanel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PersonalDetailsInfo {
    // empty
}

export const PersonalDetailsPanel: React.FC<PanelProps<PersonalDetailsInfo>> = props => {
    const [firstname, setFirstname] = useState<string | null>(null);
    const [lastname, setLastname] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const openNewPanel = () => {
        props.openPanel({
            props: {
                firstname: firstname,
                lastname: lastname,
                phoneNumber: phoneNumber,
                email: email,
            },
            renderPanel: AccountDetailsPanel,
            title: `Account Details`,
        });
    };

    return (
        <div className="panel-content">
            <div className="header">
                Sign up
            </div>
            <FormGroup className="panel-item"
                       label={"First Name"}
                       intent={Intent.PRIMARY}
                       labelFor={"input-firstname"}
                       labelInfo={"(required)"}
            >
                <InputGroup
                    id={"input-firstname"}
                    required={true}
                    placeholder={"Your first name.."}
                    onChange={(event => setFirstname(event.target.value))}
                />
            </FormGroup>
            <FormGroup className="panel-item"
                       label={"Last Name"}
                       intent={Intent.PRIMARY}
                       labelFor={"input-lastname"}
            >
                <InputGroup
                    id={"input-lastname"}
                    placeholder={"Your last name.."}
                    onChange={(event => setLastname(event.target.value))}
                />
            </FormGroup>
            <FormGroup className="panel-item"
                       label={"Phone Number"}
                       labelInfo={"(required)"}
                       intent={Intent.PRIMARY}
                       labelFor={"input-phone-number"}
            >
                <InputGroup
                    id={"input-phone-number"}
                    placeholder={"Your phone number.."}
                    required={true}
                    onChange={(event => setPhoneNumber(event.target.value))}
                />
            </FormGroup>
            <FormGroup className="panel-item"
                       label={"E-mail"}
                       labelInfo={"(required)"}
                       intent={Intent.PRIMARY}
                       labelFor={"input-email"}
            >
                <InputGroup
                    id={"input-email"}
                    type={"email"}
                    placeholder={"Your email.."}
                    required={true}
                    onChange={(event => setEmail(event.target.value))}
                />
            </FormGroup>
            <Button className="panel-item"
                    intent={Intent.PRIMARY}
                    onClick={openNewPanel}
                    text={`Next`}
            />
        </div>
    );
};

// const personalDetails: Panel<PersonalDetailsInfo> = {
//     props: {
//         panelNumber: 1,
//     },
//     renderPanel: Panel1,
//     title: "Personal Details",
// };
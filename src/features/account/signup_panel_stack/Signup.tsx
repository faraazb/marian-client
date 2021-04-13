import React from "react";
import {
    Card,
    Elevation,
    Panel,
    PanelStack2
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./Signup.css"
import {PersonalDetailsInfo, PersonalDetailsPanel} from "./PersonalDetailsPanel";


const initialPanel: Panel<PersonalDetailsInfo> = {
    props: {
    },
    renderPanel: PersonalDetailsPanel,
    title: "Personal Details",
};


export const SignupForm: React.FC = () => {

    return (
        <div className="container">
            <Card elevation={Elevation.TWO}>
                <div className="card-content">
                    <PanelStack2
                        className="panel"
                        initialPanel={initialPanel}
                        renderActivePanelOnly={false}
                        showPanelHeader={false}
                    />
                </div>
            </Card>
        </div>
    );
}
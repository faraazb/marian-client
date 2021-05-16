import {Button, Menu, MenuItem} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React from "react";

export const countryCodeMenu = (
    <Popover2
        content={
            <Menu>
                <MenuItem text="+91" />
                <MenuItem text="+95" />
                <MenuItem text="+97" />
            </Menu>
        }
        disabled={true}
        placement="bottom-end"
    >
        <Button disabled={true} minimal={true} rightIcon="caret-down">
            +91
        </Button>
    </Popover2>
);
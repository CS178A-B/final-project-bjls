import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

export default function ProfileDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(true);
    };
    return (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => {
                setDrawerOpen(false);
            }}
        ></Drawer>
    );
}

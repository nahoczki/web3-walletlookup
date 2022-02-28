import {alpha, styled} from "@mui/material/styles";
import {Menu, MenuProps} from "@mui/material";
import React from "react";

export const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 10,
        backgroundColor: "#111111",
        marginTop: theme.spacing(1),
        minWidth: 200,
        color:
            "white",
        border: "1px solid rgba(153,69,255,0.3)",
        boxShadow:
            '0 4px 15px 0 rgba(153,69,255,0.3)',
        '& .MuiMenu-list': {
            padding: '5px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: "#111111",
            },
        },
    },
}));

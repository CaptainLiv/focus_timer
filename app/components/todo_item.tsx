"use client";
import { ListItem, ListItemIcon, Checkbox, ListItemText } from "@mui/material";
import { useState } from "react";

type TodoItemProps = {
    todo: string;
    index: number;
};

export default function TodoItem({ todo, index }: TodoItemProps) {
    const [checked, setChecked] = useState(false);

    return (
        <ListItem key={index} className="text-xl text-black dark:text-white">
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText> {todo} </ListItemText>
        </ListItem>
    );
}
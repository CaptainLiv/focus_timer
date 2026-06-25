"use client";
import { ListItem, ListItemIcon, Checkbox, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

type TodoItemProps = {
    todo: string;
    index: number;
    removeFunc: (index: number) => Promise<void>
};

export default function TodoItem({ todo, index, removeFunc }: TodoItemProps) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            removeFunc(index)
            setChecked(false)
        }
    }, [checked])

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
"use client";
import { ListItem, ListItemIcon, Checkbox, ListItemText, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type todo = {
    id: string,
    content: string,
    done: boolean
}

type TodoItemProps = {
    todo: todo;
    removeFunc: (id: string) => void
    toggleFunc: (id: string) => void
};

export default function TodoItem({ todo, removeFunc, toggleFunc }: TodoItemProps) {
    const [checked, setChecked] = useState(todo.done);

    return (
        <ListItem key={todo.id} className="text-xl text-black dark:text-white text-wrap w-1/1" secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => { removeFunc(todo.id) }}>
                <DeleteIcon />
            </IconButton>
        }>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked}
                    onChange={(e) => { setChecked(e.target.checked); toggleFunc(todo.id) }}
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText >
                <Typography variant="body1">
                    {checked ? <s>{todo.content}</s> : todo.content}
                </Typography>
            </ListItemText>
        </ListItem>
    );
}
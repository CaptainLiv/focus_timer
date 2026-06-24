"use client";
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import TodoItem from "./todo_item";

export default function Todo() {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState("");

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTodo.trim() !== "") {
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black max-h-screen ">
            <h1 className="text-5xl font-bold text-black dark:text-white">Todo</h1>
            <List className="overflow-y-auto">
                <ListItem>
                    <TextField
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        label="Add Todo"
                        variant="outlined"
                        onKeyDown={onEnter} />
                </ListItem>
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} index={index} />
                ))}
            </List>
        </div>
    );
}
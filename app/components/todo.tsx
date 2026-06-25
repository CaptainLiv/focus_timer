"use client";
import { Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./todo_item";

export default function Todo() {

    const [todos, setTodos] = useState<Array<string>>([]);
    const [newTodo, setNewTodo] = useState("");

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTodo.trim() !== "") {
            addTodo();
        }
    };

    const addTodo = async () => {

        const updated = [...todos, newTodo];
        setTodos(updated);

        await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify(updated),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setNewTodo("");
    }

    const removeTodo = async (index: number) => {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated)
        await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify(updated),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }


    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {

        const res = await fetch("/api/todo");
        const data = await res.json();
        setTodos(data as string[])

    }


    return (
        <Paper className="flex flex-col flex-1 items-center justify-start font-sans    w-1/2 break-all p-8 m-4">
            <Typography variant="h1">Todo</Typography>
            <List className="overflow-y-auto w-1/1 scrollbar-thumb-gray-500">
                <ListItem>
                    <TextField
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        label="Add Todo"
                        variant="outlined"
                        onKeyDown={onEnter}
                        className="w-1/1" />
                </ListItem>
                {todos.map((todo, index) => (
                    <div>
                        <Divider />
                        <TodoItem key={index} todo={todo} index={index} removeFunc={removeTodo} />
                    </div>
                ))}
            </List>
        </Paper>
    );
}
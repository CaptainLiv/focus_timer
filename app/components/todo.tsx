"use client";
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
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
                    <TodoItem key={index} todo={todo} index={index} removeFunc={removeTodo} />
                ))}
            </List>
        </div>
    );
}
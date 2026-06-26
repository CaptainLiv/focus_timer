"use client";
import { Divider, List, ListItem, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./todo_item";

const COOKIE_SID = 'todo_session_id';
const COOKIE_DATA = 'todo_data';
const COOKIE_CREATED = 'todo_session_created';
const TTL = 24 * 60 * 60;

type todo = {
    id: string,
    content: string,
    done: boolean
}
type session = {
    name: string,
    value: string,
    maxAge: number
}


export default function Todo() {

    const [todos, setTodos] = useState<Array<todo>>([]);
    const [newTodo, setNewTodo] = useState("");
    const [session, setSession] = useState<string>("")

    useEffect(() => {
        setSession(getOrCreateSession().sid);
        setTodos(loadTodos());


    }, [])

    useEffect(() => {
        saveTodos(todos)
    }, [todos])

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTodo.trim() !== "") {
            addTodo();
        }
    };


    function getCookie(name: string) {
        const m = document.cookie.split('; ').find(r => r.startsWith(name + '='));
        return m ? decodeURIComponent(m.split('=')[1]) : null;
    }

    function setCookie({ name, value, maxAge }: session) {
        document.cookie = [
            `${name}=${encodeURIComponent(value)}`,
            `max-age=${maxAge}`,
            'path=/',
            'SameSite=Strict'   // prevents cross-site leakage
        ].join('; ');
    }

    function deleteCookie(name: string) {
        setCookie({ name: name, value: '', maxAge: 0 });
    }

    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function getOrCreateSession() {
        let sid = getCookie(COOKIE_SID);
        let born = getCookie(COOKIE_CREATED);

        if (!sid) {
            sid = generateSessionId();
            born = String(Date.now());
        }

        setCookie({ name: COOKIE_SID, value: sid, maxAge: TTL });
        setCookie({ name: COOKIE_CREATED, value: born ? born : "", maxAge: TTL });

        return { sid, createdAt: parseInt(born ? born : "", 10) };
    }

    function loadTodos() {
        const raw = getCookie(COOKIE_DATA);
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            deleteCookie(COOKIE_DATA);
            return [];
        }
    }

    function saveTodos(todos: todo[]) {
        const json = JSON.stringify(todos);
        if (json.length > 3800) {
            const trimmed = [
                ...todos.filter(t => !t.done),
                ...todos.filter(t => t.done).slice(-5)
            ];
            setCookie({ name: COOKIE_DATA, value: JSON.stringify(trimmed), maxAge: TTL });
            return;
        }
        setCookie({ name: COOKIE_DATA, value: json, maxAge: TTL });
    }

    function addTodo() {

        const updated = [...todos, { id: String(Date.now()), content: newTodo, done: false }];
        setTodos(updated);

        setNewTodo("");
    }

    function toggleTodo(id: string) {
        const updated = todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
        setTodos(updated);
    }

    function removeTodo(id: string) {
        const updated = todos.filter(t => t.id !== id);
        setTodos(updated)
    }



    return (
        <Paper className="flex flex-col flex-1 items-center justify-start font-sans    w-1/2 break-all p-8 m-2">
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
                    <div key={index}>
                        <Divider />
                        <TodoItem todo={todo} removeFunc={removeTodo} toggleFunc={toggleTodo} />
                    </div>
                ))}
            </List>
        </Paper>
    );
}
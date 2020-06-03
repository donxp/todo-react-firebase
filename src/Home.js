import React, { useState, useEffect } from 'react'

import { todos } from './firebase'

import TaskList from './TaskList'

export default function Home() {
    
    const [newTask, setNewTask] = useState('')
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const unsubscribe = todos.onSnapshot(snapshot => {
            const tmpTasks = [...tasks]
            snapshot.docs.forEach(doc => {
                tmpTasks.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setTasks(tmpTasks)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    function handleKeyPress(e) {
        if(e.key !== 'Enter') return
        if(!newTask) return
        setTasks([...tasks, newTask])
        setNewTask('')
    }

    function handleOnDelete(idx) {
        const tmp = [...tasks]
        tmp.splice(idx, 1)
        setTasks(tmp)
    }

    return (
        <div className="uk-width-1-3 uk-margin-auto uk-margin-top uk-card uk-card-default uk-card-body">
            <div className="uk-card-title">Your tasks</div>
            <input
                className="uk-input uk-margin"
                onKeyPress={handleKeyPress}
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Add a new task" />
            
            <div className="uk-margin">
                {
                    loading
                    ?
                    <div>Loading...</div>
                    :
                    <TaskList tasks={tasks} onDelete={handleOnDelete} />
                }
            </div>
        </div>
    )
}
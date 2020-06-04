import React, { useState, useEffect } from 'react'

import { todos } from './firebase'

import TaskList from './TaskList'

export default function Home() {
    
    const [newTask, setNewTask] = useState('')
    const [newTaskLoading, setNewTaskLoading] = useState(false)
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

        setNewTaskLoading(true)
        todos.add({
            task: newTask
        }).then(data => {
            setNewTaskLoading(false)
        }).catch(() => {
            setNewTaskLoading(false)
        })
        setNewTask('')
    }

    function handleOnDelete(idx) {
        if(tasks[idx] === undefined) return

        todos.doc(tasks[idx].id).delete()
    }

    return (
        <div className="uk-width-1-3 uk-margin-auto uk-margin-top uk-card uk-card-default uk-card-body">
            <div className="uk-card-title">Your tasks</div>
            <input
                className="uk-input uk-margin"
                onKeyPress={handleKeyPress}
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                disabled={newTaskLoading}
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
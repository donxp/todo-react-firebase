import React, { useState } from 'react'

import TaskList from './TaskList'

export default function Home() {
    
    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] = useState(['Buy milk', 'Cook dinner'])

    function handleKeyPress(e) {
        if(e.key !== 'Enter') return
        setTasks([...tasks, newTask])
        setNewTask('')
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
                <TaskList tasks={tasks} />
            </div>
        </div>
    )
}
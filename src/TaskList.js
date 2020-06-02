import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { todos } from './firebase'

export default function TaskList({ onDelete }) {
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        todos.get().then(result => {
            const _tasks = []
            result.forEach(task => {
                _tasks.push(task.data())
            })
            setTasks(_tasks)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            {
                loading
                ?
                <div>Loading...</div>
                :
                map(tasks, (task, idx) => (
                    <div className="uk-margin-bottom uk-flex uk-flex-between" key={idx}>
                        <div>{task.task}</div>
                        <ul className="uk-iconnav">
                            <li><button className="uk-icon-link" uk-icon="more"></button></li>
                            <div data-uk-dropdown data-mode="click">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Set Priority</a></li>
                                </ul>
                            </div>
                            <li><button className="uk-icon-link" onClick={() => onDelete(idx)} uk-icon="trash" type="button"></button></li>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}
import React from 'react'
import { map } from 'lodash'

export default function TaskList({ tasks, onDelete }) {
    return map(tasks, (task, idx) => (
        <div className="uk-margin-bottom uk-flex uk-flex-between" key={idx}>
            <div>{task}</div>
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
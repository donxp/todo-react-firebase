import React from 'react'
import { map } from 'lodash'

export default function TaskList({ tasks }) {
    return map(tasks, task => (
        <div className="uk-margin-bottom uk-flex uk-flex-between">
            <div>{task}</div>
            <ul className="uk-iconnav">
                <li><a className="uk-icon-link" uk-icon="more" type="button"></a></li>
                <li><a className="uk-icon-link" uk-icon="trash" type="button"></a></li>
            </ul>
        </div>
    ))
}
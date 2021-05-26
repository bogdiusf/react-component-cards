import React, { useState } from 'react';
import { produce } from 'immer';
import { generate } from 'shortid';

export default function Main() {

    const [info, setInfo] = useState([
        {
            id: '',
            firstName: '',
            lastName: ''
        }
    ])

    return (
        <div>
            <button onClick={() => {
                setInfo(currPers => [...currPers, {
                    id: generate(),
                    firstName: '',
                    lastName: ''
                }])
            }}>Add new person</button>

            { info.map((a, index) => {
                return (
                    <div key={a.id}>
                        <input onChange={(e) => {
                            const firstName = e.target.value;
                            setInfo(currPers => {
                                produce(currPers, (value) => {
                                    value[index].firstName = firstName;
                                })
                            })

                        }} value={a.firstName} placeholder="First name"></input>
                        <input onChange={(e) => {
                            const lastName = e.target.value;
                            setInfo(currPers => {
                                produce(currPers, (value) => {
                                    value[index].lastName = lastName;
                                })
                            })

                        }} value={a.lastName} placeholder="Last name"></input>
                        <button onClick={currPers => currPers.filter(x => x.id !== a.id)}>Delete</button>
                    </div>
                )
            })}
            <div>{JSON.stringify(info, null, 2)}</div>
        </div>
    )
}
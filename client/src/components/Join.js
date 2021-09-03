import React, { useState } from 'react'
import s from '../styles/Join.module.css'

export const Join = ({ history }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [warning, setWaring] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !room) {
            setWaring('Room or Name field is empty');
            return
        }
        history.push(`/chat?name=${name}&room=${room}`);
    }

    return (
        <div className={s.background}>
            <div className={s.container}>
                <h1>JOIN THE ROOM</h1>
                <hr />
                {warning && <p className={s.warning}>{warning}</p>}
                <form onSubmit={submitHandler}>
                    <div className={s.inputWrapper}>
                        <label>User name
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className={s.input}
                                type='text'
                                placeholder="Enter your name..."
                            />
                        </label>
                    </div>
                    <div className={s.inputWrapper}>
                        <label>Room name
                            <input
                                onChange={(e) => setRoom(e.target.value)}
                                value={room}
                                className={s.input}
                                type='text'
                                placeholder="Enter room, you want join..."
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className={s.submitButton}>Join</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

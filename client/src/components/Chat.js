import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import s from '../styles/Chat.module.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji'

let socket;

export const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => { });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [location.search, ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages([...messages, message])
        })
    }, [messages])

    const sendHandler = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        socket.emit('sendMessage', message, () => setMessage(''))
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                Room Name: {room}
            </div>
            <ScrollToBottom className={s.field}>
                {messages.map(mess => (
                    mess.user === name.trim().toLowerCase() ?
                        <div className={s.yourMessage} key={mess.text}>
                            <div className={s.username}>{mess.user}</div>
                            <div className={s.yourMessageItem} >
                                {ReactEmoji.emojify(mess.text)}
                            </div>
                        </div>
                        :
                        <div className={s.message} key={mess.text}>
                            <div className={s.messageItem} >
                                {ReactEmoji.emojify(mess.text)}
                            </div>
                            <div className={s.username}>{mess.user}</div>
                        </div>
                ))}
            </ScrollToBottom>
            <div className={s.inputPanel}>
                <input
                    onKeyPress={e => e.key === 'Enter' && sendHandler(e)}
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    className={s.input}
                />
                <button
                    onClick={sendHandler}
                    className={s.button}
                >SEND</button>
            </div>
        </div>
    )
}

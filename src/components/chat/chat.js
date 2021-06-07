import React, { useEffect, useState } from 'react';
import './chat.css';
import io from 'socket.io-client';

const socket = io.connect("wss://onlinechat-react.herokuapp.com");

export const Chat = (props) => {
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.length === 0) {
            setErr(true);
            return;
        }
        setErr(false);
        const msg = props.name + ": " + message;
        socket.emit("msg-from-client", msg);
        setMessage('');
        const div = document.getElementById('messages');
        if (div.lastChild !== null) {
            setTimeout(() => {
                div.lastChild.scrollIntoView();
            }, 1000);
        }
    }

    useEffect(() => {
        socket.on("msg-from-server", msg => {
            setMessages([...messages, msg]);
        });
    });

    return (
        <div className='chat'>
            <p>Hello {props.name} !</p>
            <div className='messages' id='messages'>
                {messages.length !== 0 ?
                    messages.map(m =>
                        <div className='messageDiv'>
                            <p className='message'>{m}</p>
                        </div>
                    )
                    : null}
            </div>
            {err ? <p className='err'>You cant send empty message</p> : null}
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="btn btn-primary" type="button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
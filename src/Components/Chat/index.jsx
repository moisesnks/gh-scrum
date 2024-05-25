// Chat.jsx
import React, { useEffect, useRef } from 'react';
import './Chat.css'; // Asegúrate de importar los estilos CSS
import { ArrowSendIcon } from '../../Icons';

function ChatMessage({ message, isCurrentUser }) {
    return (
        <div className={`message ${isCurrentUser ? 'mine' : 'yours'}`}>
            <div className="message-user">
                <img src={message.user.photoURL} alt={message.user.displayName} />
            </div>
            <div className="message-content">
                {message.content}
            </div>
        </div>
    );
}

function Chat({ messages, currentUser }) {
    const chatRef = useRef(null);

    useEffect(() => {
        // Scroll al final del chat cuando los mensajes cambian
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="chat" >
                <span className='h2'> Chat </span>
                <div className="content" ref={chatRef}>
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message}
                            isCurrentUser={message.user.uid === currentUser.uid}
                        />
                    ))}
                </div>
            </div>

            <div className="chat-input">
                <span className='emoji-button'> 😃 </span>
                <input type="text" placeholder="Escribe un mensaje" />
                <div className='send-button'>
                    <ArrowSendIcon size={14} />
                </div>
            </div>
        </>
    );
}

export default Chat;

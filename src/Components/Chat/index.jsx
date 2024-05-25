// Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Asegúrate de importar los estilos CSS
import { ArrowSendIcon } from '../../Icons';

function EmojiDropdown({ onClick }) {
    // los emojis son clickeables y se devuelven al emojiButton
    const handleEmojiClick = (emoji) => {
        onClick(emoji);
    }
    return (
        <div className='emoji-dropdown'>
            <div onClick={() => handleEmojiClick('😃')}>😃</div>
            <div onClick={() => handleEmojiClick('👍')}>👍</div>
            <div onClick={() => handleEmojiClick('❤️')}>❤️</div>
            <div onClick={() => handleEmojiClick('😂')}>😂</div>
            <div onClick={() => handleEmojiClick('😢')}>😢</div>
        </div>
    );
}

function EmojiButton({ onInputChange }) {
    // usa el estado para mostrar/ocultar el dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    const handleEmojiClick = (emoji) => {
        setShowDropdown(false);
        onInputChange(emoji);
    }

    return (
        <div className='emoji-button' onClick={() => setShowDropdown(!showDropdown)}>
            😃
            {showDropdown && <EmojiDropdown onClick={handleEmojiClick} />}
        </div>
    );
}

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
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Scroll al final del chat cuando los mensajes cambian
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        // Lógica para enviar el mensaje
        console.log('Mensaje enviado:', message);
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

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
                <EmojiButton onInputChange={(emoji) => setMessage(message + emoji)} />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyDown={handleKeyDown}
                />
                <div className='send-button' onClick={handleSendMessage}>
                    <ArrowSendIcon size={14} />
                </div>
            </div>
        </>
    );
}

export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Asegúrate de importar los estilos CSS
import { ArrowSendIcon } from '../../Icons';

function EmojiDropdown({ onClick }) {
    const handleEmojiClick = (emoji) => {
        onClick(emoji);
    };

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
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleEmojiClick = (emoji) => {
        onInputChange(emoji);
        setShowDropdown(true); // Mantenemos el dropdown abierto al seleccionar un emoji
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (e) => {
        e.stopPropagation(); // Evita que el clic se propague y se cierre el dropdown
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='emoji-button-wrapper' ref={dropdownRef}>
            <div className='emoji-button' onClick={toggleDropdown}>
                😃
            </div>
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
    const inputRef = useRef(null);
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

    const handleInputChange = (value) => {
        setMessage(message + value);
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="chat">
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
                <EmojiButton onInputChange={handleInputChange} />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <div className='send-button' onClick={handleSendMessage}>
                    <ArrowSendIcon size={14} />
                </div>
            </div>
        </>
    );
}

export default Chat;

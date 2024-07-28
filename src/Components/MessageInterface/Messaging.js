import React from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '../../CSS/Messaging.css'
import "../../CSS/About.css"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD6z0PXAZ8h5zt2xv_y3YEvDU3KcVKVrPk",
    authDomain: "macgpt-2acce.firebaseapp.com",
    databaseURL: "https://macgpt-2acce-default-rtdb.firebaseio.com",
    projectId: "macgpt-2acce",
    storageBucket: "macgpt-2acce.appspot.com",
    messagingSenderId: "830819513296",
    appId: "1:830819513296:web:a9f638fc7b8e8dd323ffd5",
    measurementId: "G-0QMSQFX3FR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class Messaging extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            messages:
            [
                {
                    message: "Hello, I'm MacGPT! Ask me anything about Macalester!",
                    sentTime: "just now",
                    sender: "assistant"
                }
            ],
            isTyping: false,
            threadId: null,
            newThreadId: null,
            isMenuOpen: false,
            userThreads: [],
            threadNames: {},
        };
        this.menuRef = React.createRef();
    }

    componentDidMount()
    {
        this.initializeThread();
        this.fetchUserThreads();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount()
    {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    updateUserThreadData = async () => {
        const userRef = ref(database, 'users/' + this.props.userNow[0].email.replace('.', ','));
        onValue(userRef, (snapshot) => {
            if (snapshot.exists())
            {
                const userData = snapshot.val();
                if (!userData.threads.includes(this.state.threadId))
                {
                    const updatedThreads = [...userData.threads, this.state.threadId];
                    set(userRef, { threads: updatedThreads });
                }
            }
            else
            {
                set(userRef, { threads: [this.state.threadId] });
            }
        }, { onlyOnce: true });
    };

    initializeThread = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/thread', { method: 'POST' });
            const data = await response.json();
            this.setState({ threadId: data.id });
            this.setState({ newThreadId: data.id });
        }
        catch (error)
        {
            console.error('Error initializing thread:', error);
        }
    };

    fetchUserThreads = () => {
        const userEmail = this.props.userNow[0].email.replace('.', ',');
        const userRef = ref(database, 'users/' + userEmail);

        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                this.setState({ userThreads: userData.threads || [] });
            }
        });
    };

    handleClickOutside = (event) => {
        if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
            this.setState({ isMenuOpen: false });
        }
    };


    handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...this.state.messages, newMessage];
        this.setState({ messages: newMessages, isTyping: true });

        try {
            console.log("response request made")
            const response = await fetch('http://localhost:3001/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userMessage: message,
                    threadId: this.state.threadId
                }),
            });
            console.log("response is here!")

            const data = await response.json();
            if (response.ok) {
                const responseMessage = {
                    message: data.message,
                    direction: 'incoming',
                    sender: "assistant"
                };
                this.setState({
                    messages: [...this.state.messages, responseMessage],
                    isTyping: false
                });
            } else {
                throw new Error(data.error);
            }
        }
        catch (error)
        {
            console.error("Error processing message:", error);
            this.setState({ isTyping: false });
        }
        this.updateUserThreadData();
    };

    toggleMenu = () => {
        this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    };

    fetchAndSetThreadName = async (threadId) => {
        try {
            const response = await fetch('http://localhost:3001/api/get-thread-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ threadId }),
            });
            const data = await response.json();

            if (response.ok && data.messages) {
                const firstUserMessage = data.messages.find(message => message.role === 'user');
                let threadName = 'Unnamed Thread';
                let fullFirstUserMessage = '';

                if (firstUserMessage && firstUserMessage.content && firstUserMessage.content.length > 0) {
                    const firstTextContent = firstUserMessage.content.find(c => c.type === 'text');
                    if (firstTextContent && firstTextContent.text) {
                        fullFirstUserMessage = firstTextContent.text.value;
                        threadName = fullFirstUserMessage.substring(0, 20)+ "...";
                    }
                }
                this.setState(prevState => ({
                    threadNames: {
                        ...prevState.threadNames,
                        [threadId]: {
                            shortName: threadName,
                            fullMessage: fullFirstUserMessage
                        }
                    }
                }));
            }
        } catch (error) {
            console.error("Error fetching thread messages:", error);
        }
    };

    renderChatHistory = () => {
        this.state.userThreads.forEach(threadId => {
            if (!this.state.threadNames[threadId]) {
                this.fetchAndSetThreadName(threadId);
            }
        });

        return this.state.userThreads.map((threadId, index) => {
            const fullFirstUserMessage = this.state.threadNames[threadId]?.fullMessage || 'No message available';

            return (
                <div key={index} className="chat-history-item" onClick={() => this.fetchThreadMessages(threadId)} title={fullFirstUserMessage}>
                    {this.state.threadNames[threadId]?.shortName || 'Loading...'}
                </div>
            );
        });
    };



    fetchThreadMessages = async (threadId) => {
        try {
            const response = await fetch('http://localhost:3001/api/get-thread-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ threadId }),
            });
            const data = await response.json();
            if (response.ok) {
                const formattedMessages = data.messages.map(message => {
                    const textContent = message.content.find(content => content.type === "text").text.value;
                    const sentTime = new Date(message.created_at * 1000).toLocaleString(); // Convert UNIX timestamp to readable format
                    const sender = message.role === 'user' ? 'user' : 'assistant';
                    return { message: textContent, sentTime: sentTime, sender: sender };
                });

                const greetingMessage = {
                    message: "Hello, I'm MacGPT! Ask me anything about Macalester!",
                    sentTime: 'just now',
                    sender: 'assistant'
                };
                this.setState({ messages: [greetingMessage, ...formattedMessages] });
                this.setState({threadId: threadId})
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Error fetching thread messages:", error);
        }
    };

    startNewChat = async () => {
        await this.initializeThread();
        this.setState({
            messages: [
                { message: "Hello, I'm MacGPT! Ask me anything about Macalester!", sentTime: 'just now', sender: 'assistant' }
            ]
        });
    };



    render() {
        return (
            <>
                <button onClick={this.toggleMenu} className="burger-menu-button">
                    <img src="/Burger.png" alt="Menu" />
                </button>
                <div ref={this.menuRef} className={`burger-menu ${this.state.isMenuOpen ? 'open' : ''}`}>
                    <button onClick={this.toggleMenu} className="close-menu">&times;</button>
                    <h2 className="menu-heading">Chat History</h2>
                    <div className="menu-content">
                        {this.renderChatHistory()}
                    </div>
                    <button className="new-chat-button" onClick={this.startNewChat}>
                        New Chat
                    </button>
                </div>
                <div style={{
                    position: "relative",
                    height: "50vh",
                    width: "60vw",
                    marginLeft: "15vw",
                    marginTop: "5vh",
                    borderRadius: "20px",
                    overflow: "hidden"
                }}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList scrollBehavior="smooth">
                                {this.state.messages.map((message, i) => {
                                    const containerClassName = `message-container ${message.sender === "assistant" ? "bot-message" : "user-message"}`;
                                    return (
                                        <div key={i} className={containerClassName}>
                                            <Message
                                                model={message}
                                                className="message-bubble"
                                            />
                                        </div>
                                    );
                                })}
                                {this.state.isTyping && <TypingIndicator content="MacGPT is typing" />}
                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={this.handleSend} attachButton={false} />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </>
        );
    }
}

export default Messaging
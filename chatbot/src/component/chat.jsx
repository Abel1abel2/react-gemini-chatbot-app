import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../App.css';
import { ASSIST } from '../assist/googleai';
import { ASSISTANT } from '../assist/openai';
import Loader from '../loader/Loader.jsx';
import MarkDown from 'react-markdown'
import TextareaAutosize from 'react-textarea-autosize'

const Chat = () => {
    const assist = new ASSIST();
    const assistant = new ASSISTANT();
    const ref=useRef(null)
    const ref1=useRef(null)
    const [isDisabled,setIsDisabled]=useState(false)
    const [chatTxt, setChatTxt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'What can I help you with?',
        },
    ]);
   /**const memory=useMemo(()=>messages.reduce((groups,message)=>{
        if(message.role=='user') groups.push([])
        groups[groups.length-1].push(message)
    return groups
    },[]),[messages])
    useEffect(()=>{
        if(!isDisabled){
            ref.current.focus()
        }

    },[isDisabled])*/
    useEffect(()=>{
        ref1.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    const setMessage = async () => {
        addMessage({ content: chatTxt, role: 'user' });
        setIsLoading(true);
        setIsDisabled(true)
        try {
            const result = await assist.chat(chatTxt, messages);
            addMessage({ content: result, role: 'assistant' });
        } catch (error) {
            console.log(error);
            addMessage({ content: 'ask related questions', role: 'system' });
        } finally {
            setIsLoading(false);
            setIsDisabled(false)
        }
    };

    return (
        <div className="chatbotDiv">
           
            {messages.map(({ role, content }, index) => (
                <div className="chatContent" key={index}>
                   <MarkDown>{content}</MarkDown> 
                </div>
            ))}
             {isLoading && <Loader />}
            <div ref={ref} className="textArea">
                <TextareaAutosize
                    ref={ref}
                    onChange={(event) => setChatTxt(event.target.value)}
                    minRows={1}
                    maxRows={3}
                    disabled={isDisabled}
                    className="text"
                    type="text"
                    placeholder="ask ai"
                    value={chatTxt}
                />
                <button onClick={setMessage} className="btn">
                    send
                </button>
            </div >
        </div>
    );
};

export default Chat;
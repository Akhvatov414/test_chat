import { Avatar, Button, Container, Grid, Input, TextField,  } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase/compat/app';


const Chat = () => {
    const chatContainer = useRef();
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );
    const [message, setMessage] = useState(messages);

    
   
    // const scrollToRef = () => {
    //     const heightChat = chatContainer.current.scrollHeight;
    //     const scroll = heightChat - chatContainer.current.clientHeight;
    //     chatContainer.current.scroll({top: chatContainer.current.scrollHeight, behavior: 'smooth'});
    //     console.log(`Прокрутка после нажатия кнопки: ${scroll} ChatContainer.current.scrollHeight = ${chatContainer.current.scrollHeight} chatContainer.current.clientHeight = ${chatContainer.current.clientHeight}`);
    // }

    useEffect(() => {
        if(chatContainer.current){
            chatContainer.current.scrollIntoView(
                {
                  behavior: 'smooth'
                })
        }
    })       

    const sendMessage = async (e) => {
        if(value == '' || null){
            return;
        }
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setValue('');
        //scrollToRef();  
    }

    const test = async (e) => {
        e.preventDefault();
        if(value == '' || null){
            return;
        }
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setValue('');
       // scrollToRef(); 
       // console.log(messages, message);
    }

    

    if(loading){
        return <Loader/>
    }
    
    

    return (
        <Container>
            <Grid container
                  justifyContent={'center'}
                  style={{height: window.innerHeight - 50, marginTop: '20px' }}>
                      <div  className='chat__box'
                            style={{width: '80%', height: '70vh', border: '1px solid #f50057', overflowY: 'auto',}}>
                        {messages.map(message => 
                        <div className='chat__message'  
                            style={{
                            margin: 10,
                            border: user.uid === message.uid ? '1px solid black' : '1px solid black',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <div ref={chatContainer}/>
                            <Grid container> 
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>)}
                      </div>
                      <div/>
                      <Grid
                              container
                              direction={'column'}
                              alignItems={'flex-end'}
                              style={{width: '80%'}}
                        >
                            <form style={{width: '100%'}} onSubmit={test}>
                            <TextField variant={'outlined'}
                                       fullWidth
                                       maxRows={2}
                                       value={value}
                                       placeholder='Type your message...'
                                       onChange={e => setValue(e.target.value)}/>
                            </form>
                            <Button className='chat__button__send' onClick={sendMessage} variant={'outlined'} style={{marginTop: '2px'}}>Send</Button>
                        </Grid>
                  </Grid>
        </Container>
    );
};

export default Chat;
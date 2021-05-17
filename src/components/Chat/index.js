import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fire } from '../../services/firebase';
import Loader from '../Loader/Loader';
import cls from './Chat.module.scss';
import ChatTopProfile from './ChatTopProfile';
import Messages from './Mesages';
import MessageInput from './MessageInput';

const Chat = () => {
    const [chat, setChat] = useState(null);
    const { uidFrom, uidTo } = useParams();
    const [chatRoom, setChatRoom] = useState('');
    
    useEffect(() => {
        const uidVariant1 = `${uidFrom}-${uidTo}`;
        const uidVariant2 = `${uidTo}-${uidFrom}`;

        fire.database().ref(`/chat`).on('value', res => {
            if(res.val()){
                const response = Object.entries(res.val()).map(item => {
                    const chatRoom = item[0];
                    return {
                        ...item[1],
                        chatRoom
                    }
                });

                for(let i = 0; i < response.length; i++){
                    let item = response[i];

                    if(item.chatRoom === uidVariant1 || item.chatRoom === uidVariant2){
                        setChatRoom(item.chatRoom);
                        const chatWithId = [];
                        Object.entries(item).forEach(val => {
                            const id = val[0];
                            if(id !== 'chatRoom'){
                                const id = val[0]
                                const obj = {
                                    ...val[1],
                                    id
                                }
                                chatWithId.push(obj)
                            }
                        });
                        setChat(chatWithId);
                        break;
                    }else{
                        setChat(false);
                    }
                }
            }else{
                setChat(false);
            }
        })
    }, [uidFrom, uidTo])

    return (
        <div className={cls.root}>
            {
                chat === null ? (
                    <div className={cls.loader}>
                        <Loader />
                    </div>
                ) :
                (
                    <div className={cls.chat}>
                        <ChatTopProfile uidTo={uidTo} />
                        <Messages chatRoom={chatRoom} chat={chat} />
                        <MessageInput />
                    </div>
                )
            }  
        </div>
    )
}

export default Chat;
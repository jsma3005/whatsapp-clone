import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../../services/firebase';
import cls from './Messages.module.scss';
import SingleMessage from './SingleMessage';

const Messages = ({ chat, chatRoom }) => {
    const [user] = useAuthState(fire.auth());

    if(chat === false){
        return (
            <div className={cls.isEmptyChat}>
                <p>Чат с данным собеседником пуст! Напишите ему, чтобы начать переписку.</p>
            </div>
        )
    }
    return (
        <div className={cls.root}>
            {
                chat.map(({ message, date, uid, id, deleteState, editState }, index) => (
                    uid === user.uid ? (
                        <SingleMessage editState={editState} deleteState={deleteState} chatRoom={chatRoom} id={id} isOwn={true} key={index} uidFrom={uid} message={message} date={date} />
                    ) : 
                        <SingleMessage editState={editState} deleteState={deleteState} chatRoom={chatRoom} id={id} isOwn={false} key={index} uidFrom={uid} message={message} date={date} />
                ))
            }
        </div>
    )
}

export default Messages;
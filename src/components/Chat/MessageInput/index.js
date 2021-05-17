import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fire } from '../../../services/firebase';
import cls from './MessageInput.module.scss';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const [chatVariant, setChatVariant] = useState('');
    // const [inputDisable, setInputDisable] = useState(true);
    const { uidFrom, uidTo } = useParams();
    const currentDate = `${moment().format('L')} - ${moment().format('LTS')}`;

    useEffect(() => {
        fire.database().ref(`/chat`).on('value', res => {
            const uidVariant1 = `${uidFrom}-${uidTo}`;
            const uidVariant2 = `${uidTo}-${uidFrom}`;
            if(res.val()){
                const response = Object.keys(res.val()).map(item => item);

                for(let i = 0; i < response.length; i++){
                    const item = response[i];
                    if(item === uidVariant1 || item === uidVariant2){
                        setChatVariant(item);
                        break;
                    }else{
                        setChatVariant(uidVariant1);
                    }
                }
            }else{
                setChatVariant(uidVariant1);
            }
        })
    }, [uidFrom, uidTo])

    const handleInput = e => {
        setMessage(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(message !== ''){
            if(chatVariant !== ''){
                fire.database().ref(`/chat/${chatVariant}`).push({
                    date: currentDate,
                    uid: uidFrom,
                    message: message.trim(),
                    deleteState: false,
                    editState: false
                })
                .then(res => {
                    setMessage('');
                })
                .catch(err => {
                    alert('Что-то пошло не так!');
                    console.log(err);
                })
            }else{
                alert('Что-то пошло не так!');
            }
        }else{
            alert('Вы не можете отправить пустое поле!');
        }
    }

    return (
        <div className={cls.root}>
            <form onSubmit={handleSubmit}>
                <input value={message} onChange={handleInput} type='text' placeholder='Введите сообщение' />
            </form>
        </div>
    )
}

export default MessageInput;
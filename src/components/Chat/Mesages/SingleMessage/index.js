import cls from './SingleMessage.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useState } from 'react';
import { fire } from '../../../../services/firebase';


const SingleMessage = ({ message, date, isOwn, id, chatRoom, deleteState, editState }) => {
    const [isActive, setIsActive] = useState(false);

    const handleDropdown = e => {
        e.preventDefault();

        setIsActive(prev => !prev);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();

        const askDelete = window.confirm('Вы действительно хотите удалить данное сообщение!');

        if(askDelete){
            fire.database().ref(`/chat/${chatRoom}/${id}`).update({
                deleteState: true,
                editState: false
            })
            .then(() => {
                setIsActive(false);
            })
            .catch(err => {
                alert('Что-то пошло не так!');
                console.log(err);
            })
        }else{
            setIsActive(false);
            return
        }   
    }

    const handleEdit = (e, id, message) => {
        e.preventDefault();

        const selectedMessage = window.prompt('Вы действительно хотите удалить данное сообщение!', message);

        if(selectedMessage){
            fire.database().ref(`/chat/${chatRoom}/${id}`).update({
                editState: true,
                message: selectedMessage
            })
            .then(() => {
                setIsActive(false);
            })
            .catch(err => {
                alert('Что-то пошло не так!');
                console.log(err);
            })
        }else{
            setIsActive(false);
            return
        }

        

    }

    return (
        <div className={cls.root}>
            <div className={`${cls.messageContainer} ${isOwn ? cls.own : cls.notOwn}`}>
                <div className={cls.messageContent}>
                    <p className={cls.messageContent}>{
                        deleteState ? 'Сообщение было удалено!' : message
                    }</p>
                    <div className={`${isOwn ? cls.messageRight : cls.messageLeft}`}>{date} {editState ? ' | сообщение редактировано!' : ''} </div>
                </div>
                {
                    isOwn && !deleteState &&  (
                        <div className={cls.messageSettings}>
                            <button onClick={handleDropdown} className={cls.dropdownBtn}><IoMdArrowDropdown /></button>
                            <div className={`${cls.dropdownContent} ${isActive ? cls.isActive : cls.notActive}`}>
                                <ul>
                                    <li>
                                        <button onClick={e => handleDelete(e, id)} className={cls.delete}><AiFillDelete /></button>
                                    </li>
                                    <li>
                                        <button onClick={e => handleEdit(e, id, message)} className={cls.edit}><AiFillEdit/> </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SingleMessage;
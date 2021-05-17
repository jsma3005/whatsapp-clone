import moment from 'moment';
import { useEffect, useState } from 'react';
import { fire } from '../../../services/firebase';
import cls from './ChatTopProfile.module.scss';

const ChatTopProfile = ({ uidTo }) => {
    const [user, setUser] = useState(null);
    const lastSignInTemplate = moment(new Date(user?.lastSignIn)).startOf(['hour']).fromNow();

    // Получение собеседника
    useEffect(() => {
        fire.database().ref('/users').on('value', res => {
            if(res.val()){
                const response = Object.values(res.val()).map(item => item);
                const currentUser = response.filter(item => item.uid === uidTo);
                setUser(currentUser[0]);
            }else{
                setUser(false);
            }
        })
    }, [uidTo])


    if(!user){
        return null
    }
    return (
        <div className={cls.root}>
            <div className={cls.avatar}>
                <img src={user.avatar} alt='Avatar' />
            </div>
            <div className={cls.userInfo}>
                <p>{user.name}</p>
                <span>{lastSignInTemplate}</span>
            </div>
        </div>
    )
}

export default ChatTopProfile;
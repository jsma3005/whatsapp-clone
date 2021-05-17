import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../../services/firebase';
import Loader from '../../Loader/Loader';
import UserCard from './UserCard';
import cls from './Users.module.scss';

const Users = ({ searchUserInput }) => {
    const [users, setUsers] = useState(null);
    const [ user ] = useAuthState(fire.auth());

    useEffect(() => {
        fire.database().ref('/users').on('value', res => {
            if(res.val()){
                const response = Object.values(res.val()).map(item => item);
                const filteredResponse = response.filter(item => item.uid !== user.uid);
                if(searchUserInput !== ''){
                    const searchValue = searchUserInput.toUpperCase();
                    const searchFilter = filteredResponse.filter(({ name }) => name.toUpperCase().includes(searchValue));
                    setUsers(searchFilter);
                }else{
                    setUsers(filteredResponse);
                }
            }else{
                setUsers(false);
            }
        })
    }, [setUsers, user.uid, searchUserInput]);

    return (
        <div className={cls.root}>
            {
                users === null ? (
                    <div className={cls.loader}>
                        <Loader />
                    </div>
                ) : !users ? (
                    <div>
                        Список пользователей пуст!
                    </div>
                ) : (
                    <div className={cls.usersList}>
                        {
                            users.map(({uid, avatar, lastSignIn, name}) => (
                                <UserCard uidFrom={user.uid} uidTo={uid} avatar={avatar} name={name} lastSignIn={lastSignIn} key={uid} />
                            ))
                        }
                    </div>
                )
            }            
        </div>
    )
}

export default Users;
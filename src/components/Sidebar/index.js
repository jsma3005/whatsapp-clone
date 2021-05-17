import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../services/firebase';
import Search from './Search';
import cls from './Sidebar.module.scss';
import Top from './Top';
import Users from './Users';

const Sidebar = () => {
    const [user] = useAuthState(fire.auth());
    const currentDate = moment().format('llll');
    const [searchUserInput, setSearchUserInput] = useState('');

    useEffect(() => {
        fire.database().ref(`/users/${user.uid}`)
        .update({
            lastSignIn: currentDate
        });
    }, [user, currentDate])

    return (
        <div className={cls.root}>
            <Top user={user} />
            <Search value={searchUserInput} setValue={setSearchUserInput} />
            <Users searchUserInput={searchUserInput} />
        </div>
    )
}

export default Sidebar
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import cls from './UserCard.module.scss';

const UserCard = ({ avatar, name, lastSignIn, uidFrom, uidTo }) => {
    const lastSignInTemplate = moment(new Date(lastSignIn)).startOf(['hour']).fromNow();

    return (
        <NavLink activeClassName={cls.active} exact to={`/chat/${uidFrom}/${uidTo}`} className={cls.root}>
            <img src={avatar} alt='Avatar' />
            <div className={cls.content}>
                <p>{name}</p>
                <p>
                    <small>Последнее посещение: {lastSignInTemplate}</small>
                </p>
            </div>
        </NavLink>
    )
}

export default UserCard;
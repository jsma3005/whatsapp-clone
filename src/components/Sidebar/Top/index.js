import { fire } from "../../../services/firebase";
import cls from './Top.module.scss';
import { FaSignOutAlt } from 'react-icons/fa';

const Top = ({ user }) => {
    const signOut = e => {
        e.preventDefault();

        fire.auth().signOut();
    }

    return (
        <div className={cls.top}>
            <div className={cls.avatar}>
                <img alt='Avatar' src={user.photoURL} />
            </div>
            <div className={cls.settings}>
                <FaSignOutAlt onClick={signOut} />
            </div>
        </div>
    )
}

export default Top;
import cls from './Login.module.scss';
import { ImWhatsapp } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { fire, provider } from '../../services/firebase';
import moment from 'moment';

const Login = () => {
    const currentDate = moment().format('llll');

    const signIn = e => {
        e.preventDefault();

        fire.auth().signInWithPopup(provider)
        .then(res => {
            const user = res.user;
            const userInfo = res.additionalUserInfo;

            if(userInfo.isNewUser){
                fire.database().ref(`/users/${user.uid}`).set({
                    name: user.displayName,
                    avatar: user.photoURL,
                    email: user.email,
                    accountCreated: currentDate,
                    uid: user.uid
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={cls.root}>
            <div className={cls.navbar}>
                <div className={cls.navbarContent}>
                    <ImWhatsapp />
                    <span>WhatsApp clone</span>
                </div>
            </div>
            <div className={cls.loginSection}>
                <p>Всем привет! Это клон WhatsApp</p>
                <p>Пожалуйста, авторизуйтесь, чтобы начать чат!</p>
                <div className={cls.google}>
                    <button onClick={signIn}>
                        <FcGoogle />
                        <br />
                        <span>Авторизация через Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
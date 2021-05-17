import { useParams } from 'react-router';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import cls from './Main.module.scss';

const Main = () => {

    const {uidFrom} = useParams();

    return (
        <div className={cls.root}>
            <div className={cls.sidebar}>
                <Sidebar />
            </div>
            <div className={cls.chat}>
                {
                    uidFrom ?
                    (
                        <Chat />
                    ) :
                    <div className={cls.chooseChat}>
                        <h2>Выберите собеседника, чтобы начать с ним чат!</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Main;
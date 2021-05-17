import './App.css';
import Routes from "./components/Routes/Routes";
import { useAuthState } from 'react-firebase-hooks/auth'
import { fire } from "./services/firebase";
import Loader from "./components/Loader/Loader";

const App = () => {
    const [user, loading] = useAuthState(fire.auth());

    if(loading){
        return (
            <div className='loaderContainer'>
                <Loader />
            </div>
        )
    }

    return (
        <div className='root'>
            <Routes user={user} />
        </div>
    )
};

export default App;
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../pages/Login';
import Main from '../../pages/Main';

const Routes = ({ user }) => {
    return (
        user ? (
            <Switch>
                <Route exact path='/'>
                    <Main />
                </Route>
                <Route path='/chat/:uidFrom/:uidTo'>
                    <Main />
                </Route>
                <Redirect to='/' />
            </Switch>
        )  
        : 
        (
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Redirect to='/login' />
            </Switch>
        )
    )
}

export default Routes;
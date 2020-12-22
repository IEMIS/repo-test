import React from 'react';
import {Switch, BrowserRouter,Route} from 'react-router-dom';
import App from './App';
import ReadOne from './ReadOne';
import Create from './Create';
import update from './update';
import Delete from './Delete';
import signup from './signup';
import signin from './signin';


export default function MainRouter() {
    return (
       <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/read/:phone" component={ReadOne} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/update/:phone" component={update} />
            <Route exact path="/delete/:phone" component={Delete} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/signin" component={signin} />
        </Switch>
       </BrowserRouter> 
    )
}

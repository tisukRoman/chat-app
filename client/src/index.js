import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Join } from './components/Join';
import { Chat } from './components/Chat';

const App = () => {
    return (
        <BrowserRouter>
            <main>
                <Route exact path='/' component={Join} />
                <Route path='/chat' component={Chat} />
            </main>
        </BrowserRouter>
    );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
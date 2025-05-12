import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import lanhu_renwuqingdan from './view/lanhu_renwuqingdan/index.jsx'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/lanhu_renwuqingdan" component={lanhu_renwuqingdan} />
                        <Redirect from="/" to="/lanhu_renwuqingdan" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App

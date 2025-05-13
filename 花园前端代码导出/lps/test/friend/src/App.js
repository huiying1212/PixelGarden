import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import lanhu_haoyouliebiao from './view/lanhu_haoyouliebiao/index.jsx'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/lanhu_haoyouliebiao" component={lanhu_haoyouliebiao} />
                        <Redirect from="/" to="/lanhu_haoyouliebiao" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App

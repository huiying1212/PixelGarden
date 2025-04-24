import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import lanhu_zhuyezhuangshi from './view/lanhu_zhuyezhuangshi/index.jsx'
import lanhu_qingxujiluye from './view/lanhu_qingxujiluye/index.jsx'
import lanhu_dengluye from './view/lanhu_dengluye/index.jsx'
import lanhu_wode from './view/lanhu_wode/index.jsx'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/lanhu_zhuyezhuangshi" component={lanhu_zhuyezhuangshi} />
                        <Route exact path="/lanhu_qingxujiluye" component={lanhu_qingxujiluye} />
                        <Route exact path="/lanhu_dengluye" component={lanhu_dengluye} />
                        <Route exact path="/lanhu_wode" component={lanhu_wode} />
                        <Redirect from="/" to="/lanhu_zhuyezhuangshi" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App

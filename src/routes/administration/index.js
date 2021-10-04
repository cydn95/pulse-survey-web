import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Projects from './projects'
import Subscription from './subscription'

const Administration = ({ match }) => {
    return (
        <div>
            <Switch>
                <Route path={`${match.url}/projects`} component={Projects} />
                <Route path={`${match.url}/subscription`} component={Subscription} />
                <Redirect to="/error" />
            </Switch>
        </div>
    )
}
export default Administration;
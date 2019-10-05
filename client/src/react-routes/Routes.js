import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { PrivateRoute} from './ComebineRoutes';
import { RegisterPage, LoginPage } from '../components/Page/CombineComponentPages';
import { CoCauToChuc, DashBoard, OrganizationStructure, Target, TaskTemplate } from '../components/Content/CombineContent';
import Layout from '../components/Layout/Layout';
import Privilege from '../components/Content/Privilege/Privilege';

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <PrivateRoute exact path="/" layout={Layout} component={DashBoard} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <PrivateRoute exact path="/target" layout={Layout} component={Target} />
                <Route path="/cocautochuc" layout={Layout} component={CoCauToChuc} />
                <Route path="/tasktemplate" layout={Layout} component={TaskTemplate} />
                <Route path="/privilege" layout={Layout} component={Privilege} />
                <PrivateRoute path="/organizationstructure" layout={Layout} component={OrganizationStructure} />
            </React.Fragment>
        );
    }
}

export {Routes};
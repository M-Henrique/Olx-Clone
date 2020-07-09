import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { isLogged } from '../helpers/AuthHandler';

export interface RouteHandlerProps extends RouteProps {
   private?: boolean;
}

export const RouteHandler: React.FC<RouteHandlerProps> = (props) => {
   let logged = isLogged();
   let authorized = props.private && !logged ? false : true;

   return authorized ? <Route {...props} /> : <Redirect to="/signin" />;
};

export default RouteHandler;

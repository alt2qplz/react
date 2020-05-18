import React from 'react';
import s from './PageNotFound.module.css';
import cn from 'classnames';
import {NavLink} from "react-router-dom";

const PageNotFound = props => {
    return <div className={cn('white-container', s.pnf)}>
        <h2>ERROR 404</h2>
        <h3>Page not found</h3>
        <NavLink to='/profile'>
            <p>
                Return to Profile
            </p>
        </NavLink>
    </div>
};

export default PageNotFound;
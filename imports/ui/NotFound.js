import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <div className="boxed-view__header">
                    <h1>Page Not Found</h1>
                    <p>Hmmm, we're unable to find that page</p>
                </div>
                <Link to="/" className="button button--link">Head Home</Link>
            </div>
        </div>
    );
}
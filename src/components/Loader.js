import React from 'react';

export const Loader = () => {
    return (
        <div className={"loaderWrapper"}>
            <div className={"loader-container"}>
                <p>Loading..</p>
                <div className="progress orange lighten-2">
                    <div className="indeterminate deep-orange"/>
                </div>
            </div>
        </div>
    )
};
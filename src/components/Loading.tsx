import React from 'react';
import ReactLoading from 'react-loading';

export const Loading: React.FC = () => {
    return (
        <div className="loading">
            <h1>Loading...</h1>
            <ReactLoading
                type={'bars'}
                color={'#009575'}
                height={'20%'}
                width={'20%'}
            />
        </div>
    );
};

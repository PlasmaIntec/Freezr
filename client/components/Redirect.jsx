import React from 'react';

const Redirect = ({ location, history, match }) => {
    console.log(location, history, match , match.params);
    // location.replace(`http://www.${match.params.url}`);
    return (
        <div>Redirecting...</div>
    )
}

export default Redirect;
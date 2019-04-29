import React from 'react';

const Redirect = ({ location, history, match }) => {
    console.log(location, history, match , match.params);
    fetch(`/links/${match.params.url}`)
    .then(res => res.json())
    .then(json => window.location.replace(`https://www.${json.full}`))
    return (
        <div>Redirecting...</div>
    )
}

export default Redirect;
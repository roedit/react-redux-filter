import React from 'react';
import * as icons from './Icons';

const sizes = {
    small: '16px',
    standard: '24px',
    large: '36px'
}

function Icon({color, name, size, ...props}) {
    const Component = icons[name];

    return(
        <Component aria-hidden={true}
                   fill={color}
                   width={sizes[size]}
                   height={sizes[size]}
                   {...props}/>
    )
}

export default Icon;
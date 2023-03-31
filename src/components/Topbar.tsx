import React from 'react';

const Topbar: React.FC = () => {
    const logo = "assets/layout/images/pokedex.png"
    return (
        <div className="topbar">
            <img alt='pokedex' src={logo} style={{ height: '6rem' }} />
        </div>
    );
}

export default Topbar;
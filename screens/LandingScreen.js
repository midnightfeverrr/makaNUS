import React from 'react';

import { Holder, LandingLogo } from './../components/styles'


const LandingScreen = () => {
    return (
        <Holder>
            <LandingLogo
                source={require('./../assets/Logo.png')}
            />
        </Holder>
    );
};

export default LandingScreen;
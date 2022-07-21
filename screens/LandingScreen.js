// Import Statements
import React from 'react';
import { Holder, LandingLogo } from './../components/styles'

/**
 * Anonymous class that renders LandingScreenPage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of LandingScreenPage.
 */
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
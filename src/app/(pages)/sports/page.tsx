import React from 'react';
import SportsField from './sports-field';
import { CricketBettingDemo } from '@/components/cricket/cricket-score-odd';

const SportsPage = () => {
    return (
        <div>
            <SportsField/>
            <CricketBettingDemo/>
        </div>
    );
};

export default SportsPage;
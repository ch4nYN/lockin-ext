import React, { useEffect, useState } from 'react';

interface BlockedSite {
  site: string;
  startTime: string;
  endTime: string;
}

const App: React.FC = () => {
  const blockedSites: BlockedSite[] = [
    {
        site: 'https://www.tradingview.com/chart/',
        startTime: '12:00',
        endTime: '20:00',
    },
    {
        site: 'https://www.tradingview.com/chart/',
        startTime: '01:00',
        endTime: '06:00',
    },
    {
        site: 'https://topstepx.com',
        startTime: '12:00',
        endTime: '06:20',
    },
    {
        site: 'https://trader.tradovate.com',
        startTime: '12:00',
        endTime: '06:20',
    },
  ]

  useEffect(() => {
    chrome.storage.sync.set({ blockedSites: blockedSites });
  }, [blockedSites])

  return (
    <div>fuck you lol. lock in you fucking pussy</div>
  );
};

export default App;
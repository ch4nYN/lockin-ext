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

  const immediateLockout = () => {
    const _blockedSites = blockedSites.map(site => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const modifiedStartTime = `${hours}:${minutes}`;
        return {
            ...site,
            startTime: modifiedStartTime,
            endTime: site.endTime
        }
    })
  }

  useEffect(() => {
    chrome.storage.sync.set({ blockedSites: blockedSites });
  }, [blockedSites])

  return (
    <div>
        <div>fuck you lol. lock in you fucking pussy</div>
        <div>
            <button onClick={() => immediateLockout()}>Immediate Lockout Pussy</button>
        </div>
    </div>
  );
};

export default App;
chrome.storage.sync.get('blockedSites', (data) => {
  const currentSite = window.location.hostname;
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  data.blockedSites?.forEach((siteObj: any) => {
    const [startHours, startMinutes] = siteObj.startTime.split(':').map(Number);
    const [endHours, endMinutes] = siteObj.endTime.split(':').map(Number);
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;

    if (currentSite.includes(siteObj.site) && currentTime >= startTime && currentTime <= endTime) {
      document.body.innerHTML = "<h1>Lock the fuck in</h1>";
    }
  });
});

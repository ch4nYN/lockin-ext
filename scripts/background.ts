// Define a type for blocked site data
interface BlockedSite {
  site: string;
  startTime: string; // Format "HH:MM"
  endTime: string;   // Format "HH:MM"
}

// Helper function to check if the current time is within the blocked range
function isWithinBlockedTime(startTime: string, endTime: string): boolean {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  const startMinutesOfDay = startHours * 60 + startMinutes;
  const endMinutesOfDay = endHours * 60 + endMinutes;

  // Determine if the current time is within the blocking period
  return (
    (startMinutesOfDay <= endMinutesOfDay && currentTime >= startMinutesOfDay && currentTime <= endMinutesOfDay) || // Normal range
    (startMinutesOfDay > endMinutesOfDay && (currentTime >= startMinutesOfDay || currentTime <= endMinutesOfDay))  // Crosses midnight
  );
}

// Function to check if a tab's URL should be blocked and redirect if necessary
function checkAndRedirect(tabId: number, url: string) {
  chrome.storage.sync.get('blockedSites', (data) => {
    const blockedSites: BlockedSite[] = data.blockedSites || [];
    blockedSites.forEach((siteObj) => {
      if (url.includes(siteObj.site) && isWithinBlockedTime(siteObj.startTime, siteObj.endTime)) {
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL('blocked.html') });
      }
    });
  });
}

// Listener for navigation events (e.g., when user clicks a link or enters a URL)
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  checkAndRedirect(details.tabId, details.url);
}, { url: [{ schemes: ["http", "https"] }] }); // Only listen for HTTP/HTTPS navigations

// Listener for tab updates to cover cases where a blocked site is already open
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkAndRedirect(tabId, tab.url);
  }
});

// Alarm to check periodically if blocked sites and times are updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('checkBlockedSites', { periodInMinutes: 1 });
});
chrome.runtime.onInstalled.addListener(()=> {
    chrome.action.setBadgeText({
        text:"OFF"
    });
});

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab)=> {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {

        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});

        // Next state will always be the opposite
        const nexState = prevState ==='ON' ? 'OFF' : 'ON';

         // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nexState
        });

        if (nexState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
              files: ["focus-mode.css"],
              target: { tabId: tab.id },
            });
          } else if (nexState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
              files: ["focus-mode.css"],
              target: { tabId: tab.id },
            });
          }

    }
});


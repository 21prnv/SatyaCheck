chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "contentScriptReady") {
    console.log("Content script is ready in tab:", sender.tab?.id);
  }
});

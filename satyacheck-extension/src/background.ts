chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "contentScriptReady") {
    console.log("Content script is ready in tab:", sender.tab?.id);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  // Initialize API keys and credentials in chrome storage
  chrome.storage.local.set({
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  });
});

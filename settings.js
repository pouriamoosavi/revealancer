window.addEventListener('load', (event) => {
  browser.storage.local.get("rSettings").then((item) => {
    const settings = item.rSettings;
    document.getElementById("rAllowedIPs").value = settings.ips
  })
  document.getElementById("rSaveButton").onclick = function () {
    const ips = document.getElementById("rAllowedIPs").value;
    browser.storage.local.set({ rSettings: { ips } }).then(() => {
      browser.runtime.sendMessage("rSaveSettings")
    })
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === "rAllSettingsSaved") {
    alert("Saved!")
  }
})

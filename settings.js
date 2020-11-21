window.addEventListener('load', (event) => {
  browser.storage.local.get("rSettings").then((item) => {
    const settings = item.rSettings;
    // All sync functions go here ...
    syncRAllowedIPs(settings);
    syncRScoreInTitle(settings);
    syncREmployerInfo(settings);
    syncRExchangeBudget(settings);
    document.getElementById("rSaveButton").onclick = save;
  })
})

function syncRAllowedIPs(settings) {
  document.getElementById("rAllowedIPs").value = settings.ips;
}

function syncRScoreInTitle(settings) {
  if (settings.appearance && settings.appearance.rScoreInTitle) {
    document.getElementById("rScoreInTitle").setAttribute("checked", "checked")
  } else {
    document.getElementById("rScoreInTitle").removeAttribute("checked")
  }
}

function syncREmployerInfo(settings) {
  if (settings.appearance && settings.appearance.rEmployerInfo) {
    document.getElementById("rEmployerInfo").setAttribute("checked", "checked")
  } else {
    document.getElementById("rEmployerInfo").removeAttribute("checked")
  }
}

function syncRExchangeBudget(settings) {
  if (settings.appearance && settings.appearance.rExchangeBudget) {
    document.getElementById("rExchangeBudget").setAttribute("checked", "checked")
  } else {
    document.getElementById("rExchangeBudget").removeAttribute("checked")
  }
}

function save() {
  const ips = document.getElementById("rAllowedIPs").value;
  const rScoreInTitle = document.getElementById("rScoreInTitle").checked;
  const rEmployerInfo = document.getElementById("rEmployerInfo").checked;
  const rExchangeBudget = document.getElementById("rExchangeBudget").checked;
  const rSettings = {
    ips,
    appearance: {
      rScoreInTitle,
      rEmployerInfo,
      rExchangeBudget
    }
  }
  browser.storage.local.set({ rSettings }).then(() => {
    browser.runtime.sendMessage("rSaveSettings")
  })
}

browser.runtime.onMessage.addListener((message) => {
  if (message === "rAllSettingsSaved") {
    document.getElementById("rSaveMessage").innerText = "Saved Successfully!"
    setTimeout(() => {
      document.getElementById("rSaveMessage").innerText = ""
    }, 5000);
  }
})

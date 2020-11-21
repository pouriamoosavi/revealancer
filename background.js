let allowedIPs = ["*"];
browser.storage.local.set({
  rSettings: {
    ips: allowedIPs,
    appearance: {
      rEmployerInfo: true,
      rExchangeBudget: true,
      rScoreInTitle: true
    }
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message === "rSaveSettings") {
    saveSettings();
  }
})

browser.webRequest.onBeforeRequest.addListener(
  (details) => { listenOnRequest(details, "createRevealancerInfo") },
  {
    urls: ["https://www.freelancer.com/api/projects/0.1/projects/active/*"],
    types: ["xmlhttprequest"]
  },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  (details) => { listenOnRequest(details, "createExchangeInfo") },
  {
    urls: ["https://www.freelancer.com/api/projects/0.1/projects?*"],
    types: ["xmlhttprequest"]
  },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  checkIP,
  {
    urls: ["https://www.freelancer.com/*"],
    types: ["main_frame"]
  },
  ["blocking"]
);

function listenOnRequest(details, scriptFuncName) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let response = "";

  filter.ondata = (event) => {
    filter.write(event.data);
    let str = decoder.decode(event.data, { stream: true });
    response += str;
  }
  filter.onstop = () => {
    setTimeout(() => {
      if (details.tabId > -1) {
        browser.tabs.executeScript(details.tabId, {
          code: `${scriptFuncName}(${response})`
        });
      }
    }, 1);
    filter.disconnect();
  };

  return {}
}

function checkIP(details) {
  if (allowedIPs.indexOf("*") > -1) {
    return {}
  }
  console.log(details)
  return new Promise((resolve, reject) => {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
      .then(res => {
        res.text().then(value => {
          try {
            let valueArr = value.split("=");
            let ipWithEnter = valueArr[3];
            let ip = ipWithEnter.split("\n")[0];
            console.log(ip)
            if (!ip || allowedIPs.indexOf(ip) === -1) {
              browser.tabs.executeScript(details.tabId, {
                code: "showIPAlert('" + ip + "')"
              });
              return reject()
            } else {
              return resolve()
            }
          } catch (err) {
            console.log(err)
            browser.tabs.executeScript(details.tabId, {
              code: "alert(" + err + ")"
            });
            return reject()
          }
        }).catch(err => {
          console.log(err)
          browser.tabs.executeScript(details.tabId, {
            code: "alert(" + err + ")"
          });
          return reject()
        })
      })
      .catch(err => {
        console.log(err)
        browser.tabs.executeScript(details.tabId, {
          code: "alert(" + err + ")"
        });
        return reject()
      })
  })
}

function saveSettings() {
  browser.storage.local.get("rSettings").then((item) => {
    const settings = item.rSettings
    allowedIPs = settings.ips.split(",").map(ip => ip.trim()).filter(ip => ip !== "");
    browser.tabs.query({ url: "*://*.freelancer.com/*" }).then((tabs) => {
      for (let tab of tabs) {
        browser.tabs.executeScript(tab.id, {
          code: "changeAppearance(" + JSON.stringify(settings.appearance) + ")"
        });
      }
    })
    browser.runtime.sendMessage("rAllSettingsSaved")
  })
}

browser.menus.create({
  id: "githubRepo",
  title: "Github Repo",
  contexts: ['all'],
  icons: {
    "32": "icons/github-32px.png"
  },
  documentUrlPatterns: ["*://*.freelancer.com/*"],
  onclick: function (info, tab) {
    browser.tabs.executeScript(tab.id, {
      code: "window.open('https://github.com/pouriamoosavi/revealancer', '_blank')"
    });
  }
});

browser.menus.create({
  id: "settings",
  title: "Settings",
  contexts: ['all'],
  icons: {
    "32": "icons/settings-32px.png"
  },
  documentUrlPatterns: ["*://*.freelancer.com/*"],
  onclick: function (info, tab) {
    browser.tabs.query({ url: `${browser.extension.getURL('./')}settings.html` }).then((tabArr) => {
      if (tabArr.length != 0) {
        browser.tabs.executeScript(tab.tabId, {
          code: "alert('There is already a settings tab open, please use that!')"
        });
      } else {
        let createData = {
          url: "/settings.html",
        };
        browser.tabs.create(createData);
      }
    });
  }
});
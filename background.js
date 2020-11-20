const allowedIPs = [];
browser.webRequest.onBeforeRequest.addListener(
  (details) => { listenOnRequest(details, "createRevealancerInfo") },
  {
    urls: ["https://www.freelancer.com/api/projects/0.1/projects/active/*"],
    types: ["xmlhttprequest"]
  },
  ["blocking"]
);
//https://www.freelancer.com/api/projects/0.1/projects?limit=1&attachment_details=true&full_description=true&job_details=true&location_details=true&nda_details=true&project_collaboration_details=true&seo_urls%5B%5D=python%2FNodejs-python-socketio-integration&selected_bids=true&qualification_details=true&upgrade_details=true&review_availability_details=true&local_details=true&equipment_details=true&invited_freelancer_details=true&webapp=1&compact=true&new_errors=true&new_pools=true
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
      browser.tabs.executeScript(details.tabId, {
        code: `${scriptFuncName}(${response})`
      });
    }, 1);
    filter.disconnect();
  };

  return {}
}

function checkIP(details) {
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
              code: "showErr(" + err + ")"
            });
            return reject()
          }
        }).catch(err => {
          console.log(err)
          browser.tabs.executeScript(details.tabId, {
            code: "showErr(" + err + ")"
          });
          return reject()
        })
      })
      .catch(err => {
        console.log(err)
        browser.tabs.executeScript(details.tabId, {
          code: "showErr(" + err + ")"
        });
        return reject()
      })
  })
}

browser.menus.create({
  id: "toggleRevealancer",
  title: "Show/Hide",
  contexts: ['all'],
  icons: {
    "32": "icons/show-hide-32px.png"
  },
  documentUrlPatterns: ["*://*.freelancer.com/*"],
  onclick: function (info, tab) {
    browser.tabs.executeScript(tab.id, {
      code: "toggleRevealancerInfo()"
    });
  }
});

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
    browser.storage.local.set({ a: 1 })
    let createData = {
      //type: "detached_panel",
      url: "/settings.html",
      // pinned: true,
    };
    let creating = browser.tabs.create(createData);
    // browser.tabs.executeScript(tab.id, {
    //   code: "showSettings()"
    // });
  }
});

// //https://www.freelancer.com/api/projects/0.1/projects/active/?compact=true&enterprise_metadata_field_details=true&forceShowLocationDetails=false&full_description=true&job_details=true&jobs%5B%5D=9&jobs%5B%5D=13&jobs%5B%5D=31&jobs%5B%5D=500&jobs%5B%5D=759&jobs%5B%5D=68&jobs%5B%5D=343&jobs%5B%5D=598&jobs%5B%5D=287&jobs%5B%5D=1254&jobs%5B%5D=619&jobs%5B%5D=1082&jobs%5B%5D=270&jobs%5B%5D=602&jobs%5B%5D=43&jobs%5B%5D=440&jobs%5B%5D=1347&keywords=&languages%5B%5D=en&limit=10&offset=0&project_types%5B%5D=fixed&query=&sort_field=submitdate&upgrade_details=true&user_details=true&user_employer_reputation=true&user_status=true
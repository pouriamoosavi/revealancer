browser.webRequest.onBeforeRequest.addListener(
  listenerForFreelancerProjects,
  {
    urls: ["https://www.freelancer.com/api/projects/0.1/projects/active/*"],
    types: ["xmlhttprequest"]
  },
  ["blocking"]
);

function listenerForFreelancerProjects(details) {
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
        code: "createRevealancerInfo(" + response + ")"
      });
    }, 1);
    filter.disconnect();
  };

  return {};
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

// //https://www.freelancer.com/api/projects/0.1/projects/active/?compact=true&enterprise_metadata_field_details=true&forceShowLocationDetails=false&full_description=true&job_details=true&jobs%5B%5D=9&jobs%5B%5D=13&jobs%5B%5D=31&jobs%5B%5D=500&jobs%5B%5D=759&jobs%5B%5D=68&jobs%5B%5D=343&jobs%5B%5D=598&jobs%5B%5D=287&jobs%5B%5D=1254&jobs%5B%5D=619&jobs%5B%5D=1082&jobs%5B%5D=270&jobs%5B%5D=602&jobs%5B%5D=43&jobs%5B%5D=440&jobs%5B%5D=1347&keywords=&languages%5B%5D=en&limit=10&offset=0&project_types%5B%5D=fixed&query=&sort_field=submitdate&upgrade_details=true&user_details=true&user_employer_reputation=true&user_status=true
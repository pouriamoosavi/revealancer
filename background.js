// browser.runtime.onMessage.addListener(function capt

// )
function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  var response = "";

  filter.ondata = (event) => {
    filter.write(event.data);
    let str = decoder.decode(event.data, { stream: true });
    response += str;
  }
  filter.onstop = () => {
    sendResponseToChangeDom(response);
    filter.disconnect();
  };

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: ["https://www.freelancer.com/api/projects/0.1/projects/active/*"],
    types: ["xmlhttprequest"]
  },
  ["blocking"]
);

// //https://www.freelancer.com/api/projects/0.1/projects/active/?compact=true&enterprise_metadata_field_details=true&forceShowLocationDetails=false&full_description=true&job_details=true&jobs%5B%5D=9&jobs%5B%5D=13&jobs%5B%5D=31&jobs%5B%5D=500&jobs%5B%5D=759&jobs%5B%5D=68&jobs%5B%5D=343&jobs%5B%5D=598&jobs%5B%5D=287&jobs%5B%5D=1254&jobs%5B%5D=619&jobs%5B%5D=1082&jobs%5B%5D=270&jobs%5B%5D=602&jobs%5B%5D=43&jobs%5B%5D=440&jobs%5B%5D=1347&keywords=&languages%5B%5D=en&limit=10&offset=0&project_types%5B%5D=fixed&query=&sort_field=submitdate&upgrade_details=true&user_details=true&user_employer_reputation=true&user_status=true


function sendResponseToChangeDom(response) {
  setTimeout(() => {
    let querying = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    querying.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        response
      });
    });
  }, 1);
  // let executing = browser.tabs.executeScript({
  //   file: "changeDom.js"
  // });
  // executing.then(() => {

  // });
}

// browser.contextMenus.create({
//   id: "toggleRevealancer",
//   title: "enable/disable Revealancer",
// });

// browser.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId == "toggleRevealancer") {
    // let querying = browser.tabs.query({
    //   active: true,
    //   currentWindow: true
    // });
    // console.log(1)
    // querying.then((tabs) => {
    //   browser.tabs.sendMessage(tabs[0].id, {
    //     toggleRevealancer: true,
    //   });
    // });
//   }
// })


function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  var projects = "";

  filter.ondata = (event) => {
    filter.write(event.data);
    let str = decoder.decode(event.data, { stream: true });
    projects += str;
  }
  filter.onstop = () => {
    sendProjectsToChangeDom(projects);
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


function sendProjectsToChangeDom(projects) {
  setTimeout(() => {
    let querying = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    querying.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        projects
      });
    });
  }, 10);
  // let executing = browser.tabs.executeScript({
  //   file: "changeDom.js"
  // });
  // executing.then(() => {

  // });
}

// browser.contextMenus.create({
//   id: "changeDom",
//   title: "Eat this page"
// });

// function messageTab(tabs) {
//   browser.tabs.sendMessage(tabs[0].id, {
//     projects: 100
//   });
// }

// function onExecuted(result) {
//   let querying = browser.tabs.query({
//     active: true,
//     currentWindow: true
//   });
//   querying.then(messageTab);
// }

// function sendProjectsToChangeDom(info, tab) {
//   //if (info.menuItemId == "changeDom") {
//   // onExecuted()
//   let executing = browser.tabs.executeScript({
//     file: "changeDom.js"
//   });
//   executing.then(onExecuted);
//   //}
// };

// function docReady(fn) {
//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     setTimeout(fn, 1);
//   } else {
//     document.addEventListener("DOMContentLoaded", fn);
//   }
// }
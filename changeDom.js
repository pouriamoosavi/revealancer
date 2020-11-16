

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    var projects = JSON.parse(request.projects)
    console.log(projects)
    docReady(function () {
      // document.body.innerHTML = "<h1>recieved</h1>" + document.body.innerHTML
      console.log(100)
    });
  } catch (err) {
    alert(err)
  }
});
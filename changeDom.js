
function checkIfCardInner(cb) {
  setTimeout(() => {
    console.log(100)

    if (document.getElementsByClassName("info-card-inner")[0]) {
      return cb()
    } else {
      checkIfCardInner(cb);
    }
  }, 10);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    var response = JSON.parse(request.response)
    var projects = response.result.projects;
    var users = response.result.users;

    checkIfCardInner(function cardInnerExists() {
      var projectDivs = document.getElementsByClassName("info-card-inner");
      for (var i = 0; i < projects.length; i++) {
        var ownerID = projects[i].owner_id;
        var ownerDisplayName = users[ownerID].display_name;
        var ownerUsername = users[ownerID].username;
        projectDivs[i].innerHTML += "<hr><p>" + ownerDisplayName + " (" + ownerUsername + ")" + "</p>";
      }
    })
  } catch (err) {
    console.log(err)
  }
});
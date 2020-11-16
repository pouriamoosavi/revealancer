
function createRevealancerInfo({ projects, users }) {
  checkIfCardInner(function cardInnerExists() {
    try {
      let projectDivs = document.getElementsByClassName("search-result-item");
      for (let i = 0; i < projects.length; i++) {
        let ownerID = projects[i].owner_id;
        let ownerDisplayName = users[ownerID].display_name || "";
        let ownerUsername = users[ownerID].username || "";
        let loc = users[ownerID].location.country.name || "";
        let { complete = 0 } = users[ownerID].employer_reputation.entire_history;
        let regDate = new Date(users[ownerID].registration_date * 1000)
        let regYear = regDate.getFullYear() || 0;
        let { payment_verified: pav,
          email_verified: em,
          deposit_made: dm,
          profile_complete: pc,
          phone_verified: phv,
          identity_verified: iv,
          facebook_connected: fc,
          freelancer_verified_user: fvu
        } = users[ownerID].status;
        projectDivs[i].innerHTML +=
          `<div class="revealancer-info"><hr style="margin: 10px 0"><span> ${ownerDisplayName} (${ownerUsername}) | ${loc} | complete: ${complete} | ${regYear} </span><br>
          <span>pay ver: ${pav ? "✔" : "✘"} | em ver: ${em ? "✔" : "✘"} | dep made: ${dm ? "✔" : "✘"} | prof com: ${pc ? "✔" : "✘"} |
           phn ver: ${phv ? "✔" : "✘"} | id ver: ${iv ? "✔" : "✘"} | fcb con: ${fc ? "✔" : "✘"} | ver user: ${fvu ? "✔" : "✘"}</span></div>
        `;
      }
    } catch (err) {
      console.log(err)
    }
  })
}

function checkIfCardInner(cb) {
  setTimeout(() => {
    if (document.getElementsByClassName("info-card-inner")[0]) {
      return cb()
    } else {
      checkIfCardInner(cb);
    }
  }, 10);
}

function toggleRevealancerInfo() {
  let revealancerInfoDivs = document.getElementsByClassName("revealancer-info");
  let currentStatus = revealancerInfoDivs[0] && revealancerInfoDivs[0].getAttribute("display")

  let newStatus = currentStatus === "block" ? "none" : "block";
  for (let i = 0; i < revealancerInfoDivs.length; i++) {
    revealancerInfoDivs[i].setAttribute("display", newStatus)
  }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.response) {
      let response = JSON.parse(request.response)
      let projects = response.result.projects;
      let users = response.result.users;
      createRevealancerInfo({ projects, users })
    } else if (request.toggleRevealancer) {
      console.log(200)
      toggleRevealancerInfo()
    }
  } catch (err) {
    console.log(err)
  }
});
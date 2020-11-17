let display = "block";
function createRevealancerInfo(response) {
  let projects = response.result.projects;
  let users = response.result.users;
  checkIfCardInner(function cardInnerExists() {
    try {
      let projectDivs = document.getElementsByClassName("search-result-item");
      for (let i = 0; i < projects.length; i++) {
        const ownerID = projects[i].owner_id;
        const ownerDisplayName = users[ownerID].display_name || "";
        const ownerUsername = users[ownerID].username || "";
        const country = users[ownerID].timezone.country;
        const loc = users[ownerID].location.country.name || "";
        const { complete = 0 } = users[ownerID].employer_reputation.entire_history;
        const regDate = new Date(users[ownerID].registration_date * 1000)
        const regYear = regDate.getFullYear() || 0;
        const { payment_verified: pav,
          email_verified: em,
          deposit_made: dm,
          profile_complete: pc,
          phone_verified: phv,
          identity_verified: iv,
          facebook_connected: fc,
          freelancer_verified_user: fvu
        } = users[ownerID].status;
        const infoHtml = `<div class="revealancer-info" style="display:${display}">
          <hr style="margin: 10px 0"><div> Name: <span title="Display Name">${ownerDisplayName} </span>
          (<a title="Username" href="/u/${ownerUsername}">${ownerUsername}</a>)
          | Location: <img alt="Flag of ${country}" title="${country}" style="height: 14px; width: 18px;"
          src="https://www.f-cdn.com/assets/main/en/assets/flags/${country.toLowerCase()}.svg" data-size="mid"> ${loc} 
          | Completed: ${complete} | Member since ${regYear} </div>
          <div><span title="Payment Verified" style="color:${pav ? "#77c9b7" : "#a6abb0"}">Payment Verf</span> 
          | <span title="Email Verified" style="color:${em ? "#77c9b7" : "#a6abb0"}">Email Verf</span> 
          | <span title="Deposit Made" style="color:${dm ? "#77c9b7" : "#a6abb0"}">Deposit Made</span> 
          | <span title="Profile Complete" style="color:${pc ? "#77c9b7" : "#a6abb0"}">Profile Comp</span> 
          | <span title="Phone Verified" style="color:${phv ? "#77c9b7" : "#a6abb0"}">Phone Verf</span> 
          | <span title="Identity Verified" style="color:${iv ? "#77c9b7" : "#a6abb0"}">ID Verf</span>
          | <span title="Facebook Connected" style="color:${fc ? "#77c9b7" : "#a6abb0"}">Facebook Conct</span> 
          | <span title="Freelancer Verified User" style="color:${fvu ? "#77c9b7" : "#a6abb0"}">Verf User</span>
          </div></div>
        `
        const parser = new DOMParser();
        const parsed = parser.parseFromString(infoHtml, "text/html");
        const tags = parsed.getElementsByClassName("revealancer-info");
        projectDivs[i].appendChild(tags[0]);
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
  const currentStatus = revealancerInfoDivs[0] && revealancerInfoDivs[0].style.display
  const newStatus = currentStatus === "block" ? "none" : "block";
  for (let i = 0; i < revealancerInfoDivs.length; i++) {
    revealancerInfoDivs[i].style.display = newStatus;
  }
  display = newStatus;
}
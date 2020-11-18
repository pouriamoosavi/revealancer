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
        const { complete = 0, reviews = 0, overall = 0 } = users[ownerID].employer_reputation.entire_history;
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
        const finalScore = calcScore({ rate: overall, rateCount: reviews, pav, em, dm, pc, phv, iv, fc, fvu })
        const infoHtml = `<div class="revealancer-info" style="display:${display}">
          <hr style="margin: 10px 0"><div> Name: <span title="Display Name">${ownerDisplayName} </span>
          (<a title="Username" href="#" onclick="window.location.href='/u/${ownerUsername}'">${ownerUsername}</a>)
          | Location: <img alt="Flag of ${country}" title="${country}" style="height: 14px; width: 18px;"
          src="https://www.f-cdn.com/assets/main/en/assets/flags/${country.toLowerCase()}.svg" data-size="mid"> ${loc} 
          | Completed: ${complete} | Member since ${regYear} </div>
          <div><span title="Payment Verified" style="color:${pav ? "#5dca6a" : "#a6abb0"}">Payment Verf</span> 
          | <span title="Email Verified" style="color:${em ? "#5dca6a" : "#a6abb0"}">Email Verf</span> 
          | <span title="Deposit Made" style="color:${dm ? "#5dca6a" : "#a6abb0"}">Deposit Made</span> 
          | <span title="Profile Complete" style="color:${pc ? "#5dca6a" : "#a6abb0"}">Profile Comp</span> 
          | <span title="Phone Verified" style="color:${phv ? "#5dca6a" : "#a6abb0"}">Phone Verf</span> 
          | <span title="Identity Verified" style="color:${iv ? "#5dca6a" : "#a6abb0"}">ID Verf</span>
          | <span title="Facebook Connected" style="color:${fc ? "#5dca6a" : "#a6abb0"}">Facebook Conct</span> 
          | <span title="Freelancer Verified User" style="color:${fvu ? "#5dca6a" : "#a6abb0"}">Verf User</span>
          | <span title="Final Score in Scale of 0 to 5" style="font-weight: bold;">Score: ${finalScore}</span>
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

function calcScore({ rate, rateCount, pav, em, dm, pc, phv, iv, fc, fvu }) {
  const rateCo = 16;
  const payCo = 2;
  const emailCo = 0.5;
  const depCo = 3;
  const profCo = 0.5;
  const phoneCo = 1;
  const idCo = 3;
  const fcbCo = 1;
  const verCo = 3;
  let score = calcRateScore(Number(rate), Number(rateCount)) * rateCo + Number(pav) * payCo
    + Number(em) * emailCo + Number(dm) * depCo + Number(pc) * profCo + Number(phv) * phoneCo
    + Number(iv) * idCo + Number(fc) * fcbCo + Number(fvu) * verCo
  score = score / 4.4;
  if (score < 0) score = -1;
  score = score.toFixed(1);
  return score;

  function calcRateScore(rate, count) {
    const scaler = 0.07;
    const fixedRate = Math.pow(rate - 3, 3);
    const fixedRateCount = count / 3
    return sigmoid(scaler * fixedRateCount * fixedRate) - 0.5
  }
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }
}
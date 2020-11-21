let display = "block";
function createRevealancerInfo(response) {
  let projects = response.result.projects;
  let users = response.result.users;
  checkIfNodeIsReady("info-card-title", function cardInnerExists() {
    try {
      const parser = new DOMParser();
      let projectTitle = document.getElementsByClassName('info-card-title')
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
        const titleHtml = `<span class="revealancer-info" title="Final Score in Scale of 0 to 5">(Score: ${finalScore})</span>`
        const titleHtmlParsed = parser.parseFromString(titleHtml, "text/html");
        const titleHtmlTags = titleHtmlParsed.getElementsByClassName("revealancer-info");
        projectTitle[i].appendChild(titleHtmlTags[0])

        const infoHtml = `<div class="revealancer-info" style="display:${display}">
          <hr style="margin: 10px 0"><div> Name: <span title="Display Name">${ownerDisplayName} </span>
          (<a title="Username" href="/u/${ownerUsername}" target="_self">${ownerUsername}</a>)
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
        const infoHtmlParsed = parser.parseFromString(infoHtml, "text/html");
        const infoHtmlTags = infoHtmlParsed.getElementsByClassName("revealancer-info");
        projectDivs[i].appendChild(infoHtmlTags[0]);
      }
    } catch (err) {
      console.log(err)
    }
  })
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
  const payCo = 1;
  const emailCo = 0.5;
  const depCo = 3;
  const profCo = 0.5;
  const phoneCo = 1;
  const idCo = 1.5;
  const fcbCo = 0.5;
  const verCo = 2;
  let score = calcRateScore(Number(rate), Number(rateCount)) * rateCo + Number(pav) * payCo
    + Number(em) * emailCo + Number(dm) * depCo + Number(pc) * profCo + Number(phv) * phoneCo
    + Number(iv) * idCo + Number(fc) * fcbCo + Number(fvu) * verCo
  score = score / 3.6;
  if (score < 0) score = -1;
  score = score.toFixed(1);
  return score;

  function calcRateScore(rate, count) {
    const scaler = 0.03;
    const fixedRate = Math.pow(rate - 3, 3);
    const fixedRateCount = count / 3
    return sigmoid(scaler * fixedRateCount * fixedRate) - 0.5
  }
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }
}

function showIPAlert(ip) {
  window.stop()
  alert(`Revealancer: Your IP address (${ip}) is not in allowed IP addresses. Please check you VPN connection.
You can always change IP allowed list in extension setting in right click menu.`)
}

function createExchangeInfo(response) {
  const { exchange_rate } = response.result.projects[0].currency;
  if (exchange_rate === 1) return;
  const { minimum, maximum } = response.result.projects[0].budget;
  const convertedMin = (minimum * exchange_rate).toFixed(2);
  const convertedMax = (maximum * exchange_rate).toFixed(2);
  checkIfNodeIsReady("ProjectViewDetails-budget", function () {
    const parser = new DOMParser();
    let budgetDiv = document.getElementsByClassName('ProjectViewDetails-budget')
    console.log(budgetDiv)
    const headerExchange = `<fl-text _ngcontent-webapp-c798="" _nghost-webapp-c34="" data-color="dark" 
    data-type="paragraph" data-read-more="none" data-margin-bottom="none" class="exchange-info">
    <div _ngcontent-webapp-c34="" role="paragraph" class="NativeElement ng-star-inserted" data-color="dark" 
    data-size="small" data-weight="bold" data-style="normal" data-line-break="false">
    $${convertedMin} – ${convertedMax} USD</div></fl-text>`
    const headerExchangeParsed = parser.parseFromString(headerExchange, "text/html");
    const headerExchangeTags = headerExchangeParsed.getElementsByClassName("exchange-info");
    console.log(headerExchangeTags)
    budgetDiv[0].prepend(headerExchangeTags[0])
  })
}

function checkIfNodeIsReady(className, cb) {
  setTimeout(() => {
    if (document.getElementsByClassName(className)[0]) {
      return cb()
    } else {
      checkIfNodeIsReady(className, cb);
    }
  }, 10);
}
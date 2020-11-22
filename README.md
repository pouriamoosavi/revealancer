# Revealancer
Firefox add-on (extension) to reveal more information about each project in <a href="https://www.freelancer.com">freelancer.com</a>.

## Download/Install
You can download and install it from <a href="https://addons.mozilla.org/en-US/firefox/addon/revealancer/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search">firefox extension store</a>. <br>
Note: The version in store could be old and not the last version, but it is the last stable version.

Or for the very last version or to be just cool you can:
1. Download/clone this github repo.
2. Extract it.
3. Go to `about:debugging` in your Firefox browser. (put/type it in address bar)
4. Choose `This Firefox` from left menu.
5. Click on `Load Temporary Add-on…` button.
6. Choose any file in this project's directory. (e.g: `manifest.json`)

## Usage
### Features:
Note: Make sure you are sign in. if not you will be redirect to another page.

#### If you go to <a href="https://www.freelancer.com/search/projects/">freelancer.com/search/projects/</a>:
A final score should be added to each project's title (something like: 'Score: 3.9'). It is the same score as you will see in below division.

A seprate division should be added at the bottom of each project. It contains following information:
 - Display name and username of employer (links to user/employer page)
 - Location, Country.
 - Number of completed projects
 - Join date (only year)
 - Is employer's payment verify (green means yes, gray means no)
 - Is employer's email verify (green means yes, gray means no)
 - Did employer made deposit (green means yes, gray means no)
 - Is employer's profile complete (green means yes, gray means no)
 - Is employer's phone verify (green means yes, gray means no)
 - Is employer's identicaion verify (green means yes, gray means no)
 - Did employer connect facebook (green means yes, gray means no)
 - Is employer freelancer verified user (green means yes, gray means no)
 - Final score which is a number between 0 and 5 and is calculated using all above parameters. (You can find more details about how this number is calculated in `calcScore` function in `index.js`)
  
#### If you go to any project details page (click on a project):
 - If project's budget is not in USD already, you will see a new division above the project budget which is the project budget exchanged to USD.

#### Create an IP white list:
You can create an IP white list in settings tab (find more details in settings tab).<br> This featur helps you to make sure you probebly wont access <a href="https://www.freelancer.com">freelancer.com</a> with any IP that is not in the whitelist. After you set at least one IP in settings tab, a request will send to https://www.cloudflare.com/cdn-cgi/trace before the main request to <a href="https://www.freelancer.com">freelancer.com</a>. This request will get your current public IP. then it checks if this IP is in whitelist or not, and if not it will show you an alert and will block the request. Put a ' \* ' in IP whitelist will completly disable this proccess, means no more requests will send to lookup your IP.
 
Note: This filter does **not** guarantee that it blocks other IPs completly. I did my best to make sure this is the case but it is not completly safe.
### Options
You can right-click on any part of page in freelancer website and you will see a `Reevealancer` menu. <br>
Inside it you'll find two options, 
- `Github repo` which obviously leads you here. Base on your browser's settings it may block this request as a popup, in that case you can allow it manually or change it to automatically allow popups on freelancer.com. You can click on it, come here and read this again, then you will do this for eternity.
- `Settings` which open settings tab.

#### Settings tab
Inside settings tab you can change your preferences. It is not possible to open two settings tabs together.<br>
In settings tab:
- There is options to change which extra informations do you want to see and which part you dont want.<br>
- There is also an advanced option for IP whitelist.<br>
You can seprate them with ',' to enter more than one IP. Puting a single '\*' in this filter means you need no filter and all IPs will pass to the website.


All changes will take effect right when you save settings and there is no need to refresh tabs.

## Contribute 
Feel free to report bugs and issues. <br>
Also new ideas will be appreciated.<br>
For now I think the most important thing to do is to create the same extension for Chrome. So if you find it cool, you can help me on this topic.

## Enjoy freelancing!

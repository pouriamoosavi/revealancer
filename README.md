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
A seprate division should be added to each project. It contains following information:
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
 - Final score which is a number between 0 and 5 and is calculated using all above parameters.
  
#### If you go to any project details page (click on a project):
 - If project's budget is not in USD already, you will see a new division above the project budget which is the project budget exchanged to USD.

### Options
You can right-click on any part of page in freelancer website and you will see a `Reevealancer` menu. <br>
Inside it you'll find two options, 
- `Github repo` which obviously leads you here. You can click on it, come here and read this again, then you will do this for eternity.
- `Settings` which open settings tab.

#### Settings page
Inside settings tab you can change your preferences. It is not possible to open two settings tabs together.

In settings tab:
- There is options to change which extra informations do you want to see and which part you dont want.<br>
- There is also an advanced option to filter IPs you want to access to freelancer.com with them. Means you can access freelancer.com only with thoes IPs.
Note: Pay attention that this filter does **not** guarantee that it blocks other IPs completly. I did my best to make sure this is the case but it is not completly safe.

All changes will take effect right when you save settings and there is no need to refresh you tabs.

## Contribute 
Feel free to report bugs and issues. <br>
Also new ideas will help a lot.<br>
For now I think the most important thing to do is to create the same extension for Chrome. So if you find it cool, you can help me on this topic.

## Enjoy freelancing!

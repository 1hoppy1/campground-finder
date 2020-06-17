**Your project should fulfill the following requirements:
**Use a CSS framework other than Bootstrap.
**Be deployed to GitHub Pages.
**Be interactive (i.e., accept and respond to user input).
**Use at least two server-side APIs.
**Does not use alerts, confirms, or prompts (use modals).
**Use client-side storage to store persistent data.
**Be responsive.
**Have a polished UI.
**Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
**Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
**Finally, you must add your project to the portfolio that you created in Module 2.

For our project we decided to create an application for a user to be able to search for campgrounds based off of State or Canadian Province input.
We also wanted to be able to display current weather data for each individual campground so that the user has more information that could help them in their decision on where they would like to go.

We started the project by creating a simple HTML and CSS framework with a background image that related to the project.  We then added drop down menus for user input to select the State or Province.  The api would only accept abbreviations for input so we decided dropdown menus were the easiest way to force the input to be what it needed to be.  This way we would avoid any unacceptable input from the user.

<img src="/assets/images/Screenshot%20(47).png" />
<img src="/assets/images/Screenshot%20(48).png" />
<img src="/assets/images/Screenshot%20(49).png" />

We programmed the JS to fire upon a change in the dropdown so that the user does not have to hit a search button after making their selection.  

<img src="/assets/images/Screenshot%20(50).png" />

Upon selection of a state or province, cards are generated that show the results of campgrounds in the selected area.  The name of the campground is displayed as well as an image of the campground (if available throught the api).  Current weather is then displayed through another api call.  

<img src="/assets/images/Screenshot%20(37).png" />

Local storage is then used to store the last search so if the screen is refreshed the last search is not lost.

<img src="/assets/images/Screenshot%20(37).png" />
  
**The two api's that were used for this project can be found at:
  https://developer.active.com/docs/read/Campground_APIs
  https://openweathermap.org/guide
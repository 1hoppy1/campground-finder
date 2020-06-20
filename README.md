<ul>
<li>Your project should fulfill the following requirements:</li>
<li>Use a CSS framework other than Bootstrap.</li>
<li>Be deployed to GitHub Pages.</li>
<li>Be interactive (i.e., accept and respond to user input).</li>
<li>Use at least two server-side APIs.</li>
<li>Does not use alerts, confirms, or prompts (use modals).</li>
<li>Use client-side storage to store persistent data.</li>
<li>Be responsive.</li>
<li>Have a polished UI.</li>
<li>Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).</li>
<li>Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).</li>
<li>Finally, you must add your project to the portfolio that you created in Module 2.</li>
</ul>

USER STORY:

As a user, I want an application to be able to search for existing campgrounds. So that I will be able to search any state in the United States as well as any province in Canada (just in case I want to camp anywhere in canada...).  Given my input, I want to see existing campgrounds.  I also want to be able to see current weather in the area of each campground to better influence my decision on a campground.  

MOTIVATION FOR DEVELOPMENT:

AS a camping enthusiast, I'm tired of having to google search campgrounds and getting results that don't pertain to my search.  I wanted all results to show weather, which doesn't always happen when searching through other search engines.

PROCESS:

For our project we decided to create an application for a user to be able to search for campgrounds based off of State or Canadian Province input.
We also wanted to be able to display current weather data for each individual campground so that the user has more information that could help them in their decision on where they would like to go.

We started the project by creating a simple HTML and CSS framework with a background image that related to the project.  We then added drop down menus for user input to select the State or Province.  The api would only accept abbreviations for input so we decided dropdown menus were the easiest way to force the input to be what it needed to be.  This way we would avoid any unacceptable input from the user.

<img src="/assets/images/Screenshot%20(47).png" />
<img src="/assets/images/Screenshot%20(48).png" />
<img src="/assets/images/Screenshot%20(49).png" />

We programmed the JS to fire upon a change in the dropdown so that the user does not have to hit a search button after making their selection.  

<img src="/assets/images/Screenshot%20(50).png" />

Upon selection of a state or province, cards are generated that show the results of campgrounds in the selected area.  The name of the campground is displayed as well as an image of the campground (if available throught the api).  Current weather is then displayed through another api call.  

<img src="/assets/images/Screenshot%20(55).png" />

Local storage is then used to store the last search so if the screen is refreshed the last search is not lost.

FUTURE DEVELOPMENT:

The cards provide a space for an image, the api did return facility photos for some of the campgrounds but not all of them. So we opted not to use them, instead we chose a generic image for all.  Future development would include changes to make the photos facility specific. 

We wanted to use a weather api to include weather data for each location, but unfortunately this turned out to be very difficult.  We tried using latitude and longitude for the weather data but the api would only return data if the coordinates were within a city limit.  As most of the campgrounds were not listed in a specific city, this function broke.  Most likely a different api would need to be used or the data would need to be converted to a zip code and then return data for that zip code and not a specific geographical point.
  
The two api's that were used for this project can be found at:
<ul>
<li>https://developer.active.com/docs/read/Campground_APIs</li>
<li>https://openweathermap.org/guide</li>
</ul>

Link to deployed application:

https://sgtratchet.github.io/campground-finder/

Link to Github Repository:

https://github.com/sgtratchet/campground-finder

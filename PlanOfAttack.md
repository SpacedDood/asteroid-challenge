# Plan of attack!

So I begin by breaking these tasks down into more manageable tasks.

# The Task Checklist

## Test description
Create an app to see information about asteroids. The app should:

Display a list of asteroids
Search by a range of dates
See the detail of the asteroids by clicking on one of the items
Sort the asteroids by name

### Optional
Add them to favourite
Show a list of favourite
Display details of favourite asteroids by click on the items form the list


# Plan in Dev

### Clean up
Fix the formatting

### Backend
pull list data from api depending on date
(optional) store data, maybe save the dates data to reduce having to request multiple times... (tradeoff requests for data... So maybe add a switch to toggle this functionality)
prep data for json (single and multiple days) [Can be duplicates of asteroid data on same day?]
pull asteroid data (depending on name? find key)
filter data
save asteroid data depending on the week. (Reduces the number of requests)
Create function to combine all to possibly get a months worth of asteroids in only `5 or 6` requests

serve data
  /asteroids (list)
  [post, with json body parameters]
  /asteroid/keyId (individual)

### Frontend
Draw up test UI
*Create react app
Get list of asteroids and show accordingly.
Display Individual asteroids
Create Calendar checklist to allow selection of multiple dates

[Add daily request counter / tracker]

Add favourite button next to asteroid name (star)
Cheat: Instead of creating users and members and all that jazz... I'm just going to save the favourites into the browser data.
Show favourites

IF time allows... create the super mega 2d/3d display of the asteroids orbit as a map... IF time allows...

### TO BE DECIDED
sort asteroids by name (Could be BE or FE)



# PROGRESS REPORT
So... I have spent the past few hours tinkering on the backend trying to create a system that will allow me to store the data temporarily and then save it so I can use it in the future...

Its a good job I had this inmind because I discovered 30 refreshes later... that there is a hourly and daily cap of requests! YAY!
except I have stored... 0 data. So... Ideas shall have to continue... hence why I was working on getting a clean fake nasa clone to provide me data up and running.

Its been a while since I last tinkered with node and its reminded me dearly about async requests and order in the court of operations. After some tinkering and discovering that FS doesnt really have any async functionality... or it just doesnt want to make itself apparent.

I dont know if I am going to keep this up and running... but we shall see... I'm going to cool off and start working on some base react in the meantime and retract my steps with backend after.

My code isnt clean at this point... because its in its young stages and mess is how I go along. Some of it doesn't even work.

# The Final Countdown

Okay... So its early morning. What was meant to be a half hour break turned into a 4 hour fever dream. But alas, I'm semi rested and glad for it.
ONWARDS!

So backend is a total mess... but FE is in a pretty good shape. Checklist panic time.

Display a list of asteroids (Done)
Add them to favourite (Done)

Sort the asteroids by name (Semi Done)
Show a list of favourite (need to do)
See the detail of the asteroids by clicking on one of the items (2 in one)
Display details of favourite asteroids by click on the items form the list (2 in one)

Search by a range of dates (Backend)

Other bits:
Setup Init Readme
Update react to use correct port (DONE)
Build
Update GitIgnore to not include data (BE)

4 hours to go... Dont Panic!

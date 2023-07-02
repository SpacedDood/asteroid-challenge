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

### Backend
pull list data from api depending on date
(optional) store data, maybe save the dates data to reduce having to request multiple times... (tradeoff requests for data... So maybe add a switch to toggle this functionality)
prep data for json (single and multiple days) [Can be duplicates of asteroid data on same day?]
pull asteroid data (depending on name? find key)
filter data

serve data
  /asteroids (list)
  /asteroid/keyId (individual)

### Frontend
Draw up test UI
Create react app
Get list of asteroids and show accordingly.
Display Individual asteroids
Create Calendar checklist to allow selection of multiple dates

Add favourite button next to asteroid name (star)
Cheat: Instead of creating users and members and all that jazz... I'm just going to save the favourites into the browser data.
Show favourites

IF time allows... create the super mega 2d/3d display of the asteroids orbit as a map... IF time allows...

### TO BE DECIDED
sort asteroids by name (Could be BE or FE)

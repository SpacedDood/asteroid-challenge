# asteroid-challenge
 A Full stack challenge to build an application that displays information about asteroids.


# The Challenge (Part 1)

You'll be asked of developing a small full-stack application (with both backend and frontend) using the best of your knowledges, taking into account best practices and code reusability.\ We also want you to have fun with this!

Take the test and submit us your solution. We're keen on reading your code, so take the test only if you want to!

## Test description
Create an app to see information about asteroids. The app should:

Display a list of asteroids\
Search by a range of dates\
See the detail of the asteroids by clicking on one of the items\
Sort the asteroids by name

## Optional
Add them to favourite\
Show a list of favourite\
Display details of favourite asteroids by click on the items form the list\
Don't forget that this must be a full-stack application. We expect an app with the implementation of a backend and a frontend side.

Use the following API:

https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY

# The Challenge (Part 2)

Suppose you have a database with three tables: "users", "orders", and "products". The "users" table contains columns id, name, and email. The "orders" table contains columns id, user_id, product_id, quantity, and created_at. The "products" table contains columns id, name, price, and category.

Write a single SQL query that returns a list of all users who have made at least 3 orders in the "Electronics" category and have spent more than $1000 on those orders, sorted by the total amount they have spent in descending order. The output should include the user's name, email, and the total amount they have spent on "Electronics" orders.


# INSTRUCTIONS

## BACKEND:
First navigate to the /be directory, run
### `npm start`

## FRONTEND:
In the /fe directory, use:
### `npm start`

mac and linux users, use:
### `npm start-linux-mac`

if issue with port, use:
### `npm start-other`

You can find the challenge part 2 in the /sql/query

Check out PlanOfAttack.md to see notes through my journey.

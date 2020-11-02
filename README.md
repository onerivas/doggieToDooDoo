## DoggieToDooDoo

https://doggie-to-doodoo.herokuapp.com/

test account available:
email: test@test.com
password: test

DoggieToDooDoo was created to help pet owners track their pets day. Owners can put down things they need to get done throughout the day and mark them as complete. Never forget if you've fed them, walked them, or gave them their medications!

#### Technologies used

DoggieToDooDoo was made with React, React-Router, Axios, and Bootstrap. A separate back-end was created for this app.

https://github.com/onerivas/doggieToDooDoo-backEnd

#### Approach Taken

For DoggieToDooDoo I wanted to use the newer Create-React-App process. I started by creating and launching the app with Heroku. I used various online React guides to learn how to use props, passing things down and lifting them up to share data between the components. Since I was using arrays I also had to map over those arrays to get data to display on my app. I learned that I could make axios calls from inside a mapped array which was a nice surprise.

The back-end is using Express to connect to the database and MongoDB to store the data. I'm also using Passport, JWT, and Bcrypt to create secure user login information and a web token. Using the user login information I make sure only pets connected to that user show when logged in.


#### Issues

The biggest issue I had was learning how to connect different aspects of the app with each other. I would find tips or guides on using passport but then it wouldn't explain how to use that information with a React front-end. This is where I feel most proud of myself. I was able to just take a step back and think through what I needed to do to make it work. I had multiple moments like this. How to use the login information. How to use the data from the mapped arrays. What information to give Mongoose to search in the MongoDB datatbase.

#### Future versions

There are still things I need to add or improve. I need to add error messages when login doesn't work for whatever reason. Later on I also want to make it possible for groups of people to have the same pets. So a entire family can keep track or so someone who is pet sitting can log in and see what needs to be done.     

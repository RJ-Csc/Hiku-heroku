# Hiku
### Pre-requisites ###
* NodeJS
* MongoDB
### How to run on your system ###
1. Clone this repository to a local directory in your system using the following command
```
git clone https://github.com/DLSU-CCAPDEV/2021T2-G09/
```
2. Navigate to your the directory wherein you cloned this repo to, then open a Command Prompt or Powershell window
3. Run the command ``npm install``. The following modules will be installed
    1. express
    2. dotenv
    3. hbs
    4. body-parser
    5. mongodb
    6. mongoose
    7. express-session
    8. bcrypt
    9. express-validator
    10. connect-mongo
    11. moment

4. Finally, run the command ``supervisor index.js`` to start the local server
5. Open a web browser and navigate to the following page
```
http://localhost:3000/
```

### Trade Testing ###
Trade testing:

Login to Joric
Username: Joric
Password: Joric

Joric has 2 of each, you can choose to post a trade by scrolling through the items, however you can only have 1 active trade and you cannot trade starter items.

1. Choose Shua (a character), then press Submit.
2. Log out of Joric and log in to RJ

Login to RJ
Username: rj
Password: rj

3. Hover over forums on the navigation bar and choose Trade. This will bring you to the trade forums. You should see Joric's active trade for Shua. Press the post.
4. Click Offer and offer up Rickjaw. Press Offer to send an offer.
5. Log in to Joric again.
6. Go to Trade tab.
7. Go to the lower portion (sometimes the database doesn't update the page right away might take a few refreshes for it to appear) and click on the offer.
8. Press accept.
9. Joric should now have Rickjaw.
10. Log in to RJ.
11. Go to Trade tab.
12. Rj should now own a Shua.

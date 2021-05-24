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

4. Afterwhich, run the command ``node add_data.js`` to add the following users to the database
5. Finally, run the command ``supervisor index.js`` to start the local server
6. Open a web browser and navigate to the following page
```
http://localhost:3000/
```

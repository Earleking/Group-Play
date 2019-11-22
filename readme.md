# Group Play

Entry for the 2019 Riot Games Developer Challenge


# Introduction
Hello, this is our project, Group Play. The goal of this project was to allow multiple players to democratically decide how to play a given game of Legends Of Runeterra. 

## How it works

Every phase, players will use our interface on the website to provide the moves that they would like to make, after 10 seconds all players moves will be tallied up and the most popular move will be made. This continues until the game wins or loses. 

### Gameflow Example
Here you can see how a phase would look for a user
(AREK PUT FULL GAMEFLOW HERE)

# General Architecture:
We use a three layer system for our architecture:
Web, Server, Host
![alt-text]([img]https://i.imgur.com/n45R27Q.png[/img])

Web is responsible for allowing the player to make moves, Host is responsible for making the move in the game. Server is responsible for counting the most popular moves and handling communication between the host and the web interface. 

an example workflow would be:
- new phase starts.
- Host sends gamestate to server which then sends it to the web interface 
- users make their move to play cards.
- Server tallies up the move requests and selects the move popular one.
- Server sends the selected move to the host.
- Host makes the move.

## The Host:
The host is the machine where the game is actually played on, it "hosts" the game. The host is responsible for receiving moves from the server and then making those moves in game. The host also is responsible for streaming the game to a platform like twitch/youtube/mixer so that players can easily see the game state.

### Technologies 
![alt-text](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/square_256/nodejslogo.png) ![alt-text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FFAoeYsy1wUOKh1BrSQhwtnmyv6ZEV4BkROjwT2aiYoiDYX90g&s) 
![alt-text](http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/electron-icon.png)
![alt-text](https://camo.githubusercontent.com/ab0771e05fd85f2c4c7ceaf490055d8b0e4b4deb/68747470733a2f2f636c6475702e636f6d2f3141544466324a4d74762e706e67)

The host is written in javascript with electron for displaying a small UI and RobotJS to interact with the mouse and keyboard. We use Node for compiling and websocket/request support. 

### Making Moves
This is a stub message (TODO).

### Streaming
We currently stream the game from the host machine to twitch using OBS.

### Endpoints Used
The client endpoints we used were:
(AREK INSERT CLIENT ENDPOINTS HERE)
## The Server 
### Technologies 
![alt-text](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/square_256/nodejslogo.png) ![alt-text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FFAoeYsy1wUOKh1BrSQhwtnmyv6ZEV4BkROjwT2aiYoiDYX90g&s)
![alt-text](https://buttercms.com/static/images/tech_banners/ExpressJS.png)

The Server is responsible for handling communication between the web interface and the host. It also handles tallying up move 'votes'. The server is written in javascript and uses expressjs for the nice framework for routing requests. 

## The Web Interface 
### Technologies 
![alt-text](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/square_256/nodejslogo.png) ![alt-text](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/377/square_256/typescriptlang.png) 
![alt-text](https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg)

The web interface is responsible for allowing the player to make a move. we used Typescript + Angular + Nodejs because we were familiar with the technology and like to use components when building our web interfaces.  Using Angular’s powerful templating engine and nice routing system made setting up the web interface so much easier. 

# Future Plans
We would like to continue developing this product, but we would like to see some more data exposed about game state from the client. Currently we use a lot of 'tricks' to get certain values about the game state. If Group Play were to become a fully released product we would need these endpoints to make sure that the product is stable.

# Conclusion
Overall we had a lot of fun making this system, we think with some more work and polishing it could be the next 'Twitch Plays Pokemon'. We think that this project is something that could bring many players together to play the game in new and exciting ways. 

Thank you for taking the time to look through our project!

![alt-text](https://ih0.redbubble.net/image.500108670.8521/aps,840x830,small,transparent-pad,1000x1000,f8f8f8.jpg)
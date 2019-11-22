

# Group Play

  

Entry for the 2019 Riot Games Developer Challenge

  
  

# Introduction

Hello, this is our project, Group Play. We wanted to create a social experience where many players can come together and play the same game as a group. In this project we allow many users to perform inputs then take the most popular inputs and perform them on the master game. Players are able to access this experience from their browser by simply going to a web interface then dragging and dropping cards starting on the next turn.

  

## How it works

  

Every phase, players will use our interface on the website to provide the moves that they would like to make, after 10 seconds all players moves will be tallied up and the most popular move will be made. This continues until the game wins or loses.

  

### Gameflow Example

We think that while words are great its just better to show you how it works, so we recorded ourselves playing a couple rounds through the web interface which you can view here.

(AREK PUT FULL GAMEFLOW HERE)

  

# General Architecture:

We use a three layer system for our architecture:

Web, Server, Host

![alt-text](https://i.imgur.com/n45R27Q.png)

  

Web is responsible for allowing the player to make moves, Host is responsible for making the move in the game. Server is responsible for counting the most popular moves and handling communication between the host and the web interface.

  

an example workflow would be:

- new phase starts.

- Host sends game state to server which then sends it to the web interface

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

The host receives the most popular move from the players via the server. Players have 10-second time intervals to vote for the next move to make, and so every 'round' of v

  

### Streaming

We currently stream the game from the host machine to twitch using OBS. The host machine also sends the stream back to the web interface so that the user can see what is going on while they are making their move. This makes it so that the user doesn't always have to switch between tabs.

  

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

  

The web interface is responsible for allowing the player to make a move. we used Typescript + Angular + Nodejs because we were familiar with the technology and like to use components when building our web interfaces. Using Angular’s powerful templating engine and nice routing system made setting up the web interface so much easier.

## How it Looks 
This is what the web interface looks like, when you have the ability to play cards. Refer to the video that we posted above if you want to see a full gameflow. 
![alt-text](https://cdn.discordapp.com/attachments/641793696026853377/647256482454437898/unknown.png)

## How it Works

There are a number of key components describing the view, and services to handle interactivity between them.
The main components are:
- Hand, Bench, and Battle components: Renders cards in the player's hand, in play, and on the battlefield respectively.
- Card: Handles card render logic and behavior when dragged between lanes
- Stream: Component that displays the stream in between rounds of voting.

Main Services:
- DragService: Defines the rules of dragging cards between the lanes of play.
- TurnService: Coordinates the vote timer and blocks actions when voting is closed off. Also handles Socket.IO interaction with the voting server.

  

# Future Plans

We would like to continue developing this product, but we would like to see some more data exposed about game state from the client. Currently we use a lot of 'tricks' to get certain values about the game state like mana and HP. If Group Play were to become a fully released product we would need the endpoints provide that information to make sure that the product is stable.

We would also like to improve the UI a bit, since this was a hackathon we didn't really build this application with scale-ability in mind, so we have a lot of hardcoded values and because of that our UI only works on a couple sizes of screens. Given more time we would rebuild the site using proper web development practices.

  

# Conclusion

Overall we had a lot of fun making this system, we think with some more work and polishing it could be the next 'Twitch Plays Pokemon'. One thing that we all would like to see would be for a big twitch streamer to play vs his or her chat using this project. We think that this project is something that could bring many players together to play the game in new and exciting ways.

  

Thank you for taking the time to look through our project!

  

![alt-text](https://vignette.wikia.nocookie.net/leagueoflegends/images/a/ae/Joy_Pengu_Emote.png)

# Group Play

  

Entry for the 2019 Riot Games Developer Challenge

  

# Introduction

Hello, this is our project, Group Play. We wanted to create a social experience where many players can come together and play the same game as a group. In this project we allow many users to perform inputs on a Legends Of Runeterra game, then take the most popular inputs and perform them on one game. Players are able to access this experience from their browser by simply going to a web interface then dragging and dropping cards when the next phase starts.

  

## How it works

  

Every phase, players will use our interface on the website to provide the moves that they would like to make, after 10 seconds all players moves will be tallied up and the most popular move will be made. This continues until the game wins or loses.

  

### Gameflow Example

We think that while words are great its just better to show you how it works, so we recorded ourselves playing a couple rounds through the web interface which you can view here.

(AREK PUT FULL GAMEFLOW HERE)

  

# General Architecture:

We use a three layer system for our architecture:

Web-client, Server, Host

![alt-text](https://i.imgur.com/n45R27Q.png)

  

Web is responsible for allowing the player to make moves, Host is responsible for making the move in the game. Server is responsible for counting the most popular moves and handling communication between the host and the web interface.

  

an example gameflow would be:

- new phase starts.

- Host sends game state to server which then sends it to the web interface

- users make their move to play cards.

- Server tallies up the move requests and selects the move popular one.

- Server sends the selected move to the host.

- Host makes the move.

  

## Data Flow
Data flow starts at the Host level. In the file watcher.js a watcher can be setup to monitor game state. If a data flow hasn't started it will send a blank move request to the server to being the flow.

Once the server receives receives a move request is begins compiling all received moves for later aggregation. Currently move times for players have been set to 10 seconds and the server aggregation time has been set to 12. It will wait for 12 seconds waiting for potential moves to come in and then it will parse them determining the most popular move. Once this move is determined it will then send a POST request to the Host that contains the move information. More about this move data type can be found in the *Making Moves* section. 

Once the Host picks up this move it will attempt to execute it and eventually callback to the Server with the new updated game state. Once the server gets a new game state it will pass this information on to the Web client using a SocketIO socket where player input is awaited. Again using SocketIO the Web client sends data to the Server who again starts the aggregation process. 
  
  

## The Host:

The host is the machine where the game is actually played on, it "hosts" the game. The host is responsible for receiving moves from the server and then making those moves in game. The host also is responsible for streaming the game to a platform like twitch/youtube/mixer so that players can easily see the game state.

  

### Technologies

![alt-text](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/square_256/nodejslogo.png) ![alt-text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FFAoeYsy1wUOKh1BrSQhwtnmyv6ZEV4BkROjwT2aiYoiDYX90g&s)

![alt-text](http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/electron-icon.png)

![alt-text](https://camo.githubusercontent.com/ab0771e05fd85f2c4c7ceaf490055d8b0e4b4deb/68747470733a2f2f636c6475702e636f6d2f3141544466324a4d74762e706e67)

  

The host is written in JavaScript with electron for displaying a small UI and RobotJS to interact with the mouse and keyboard. We use Node for compiling and websocket/request support.

Our team decided to use this technology stack for two main reasons:
1. We all are already familiar with it allow for a quick development cycle
2. Using Typescript/JavaScript/NodeJS allows us to use the same language across all our components once again helping create a quick development cycle. 

### Making Moves

To determine a move we use a JSON object to describe our mouse movement. This json format is described below:

```
{
	moves: [
		{
			target: CardID,
			refCard: CardID,
			type: Integer
		},
		...
	]
}

```  

Each element in moves is a certain mouse action. This mouse action is determined by the *type* property. This *type* property has 6 possible values, 0 through to 5. Each of these represent (in order) play, target, defend, challenge, endTurn, mulligan. These are defined below:

  

##### Play:

Move a card to the center of the game board to activate it. This is used for any spells to be played, or cards that need to be played from hand or bench. Here, *target* is the card that you want to play and *refCard* is not supplied

##### Target:

This is just a click event. It is used to target cards mainly for follow up actions that cards may require. While this functionality exists in our code, it is hardly used due to static data not supplying any information on follow up actions. If we had more time we would likely have manually determined and added this information but unfortunatly the time constraint was quite short. *Target* is the card that is to be clicked and *refCard* is not used.

##### Defend:

This is used when a card is needed to be moved into defense. *Target* is the player's card that needs to defend. *RefCard* is the card that it will be defending against. The *refCard* is used to determine the X position the *target* card needs to be played at.

##### Challenge:

Similar to Defend, Challenge moves an opponents card from their bench onto the board infront of one of your cards. *Target* is the opponent's card that is to be moved and *refCard* is the player's card that exists on the board.

##### EndTurn:

End turn clicks on the big end turn button. Neither *target* or *refCard* are supplied here.

##### Mulligan:

This is used at the start of the game when swapping out cards. It has to be its own action and not a Target one is because the card itself is not clicked, rather the button below it. *Target* is the card that is to be swapped and *refCard* is not supplied here.

  

### Streaming

We currently stream the game from the host machine to twitch using OBS. The web client pulls from the twitch stream and occasionally overlays the game on the browser. If it is currently your turn to make a move then our own rendered screen is shown which allows you to drag cards and make moves. If you have ended your turn or it is the opponent's turn it streams the game so you can get live updates. This makes it so that the user doesn't always have to switch between tabs to see the stream as well as make plays.

 

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

- TargetService: Highlights targetable cards (allies or enemies) depending on what the player's action is.

  

  

  

# Future Plans

We would like to continue developing this product, but we would like to see some more data exposed about game state from the client. Currently we use a lot of 'tricks' to get certain values about the game state like mana and HP. If Group Play were to become a fully released product we would need the endpoints provide that information to make sure that the product is stable.

  

We would also like to improve the UI a bit, since this was a hackathon we didn't really build this application with scale-ability in mind, so we have a lot of hardcoded values and because of that our UI only works on a couple sizes of screens. Given more time we would rebuild the site using proper web development practices.

  

# Conclusion

Overall we had a lot of fun making this system, we think with some more work and polishing it could be the next 'Twitch Plays Pokemon'. One thing that we all would like to see would be for a big twitch streamer to play vs his or her chat using this project. We think that this project is something that could bring many players together to play the game in new and exciting ways.

  

Thank you for taking the time to look through our project!

  

![alt-text](https://vignette.wikia.nocookie.net/leagueoflegends/images/a/ae/Joy_Pengu_Emote.png)
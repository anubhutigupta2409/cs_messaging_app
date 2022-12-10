# CS Messaging App

## Basic requirements implemented

* A react web app which allows agents of branch international to view and respond to customer queries in a streamlined fashion.
* Provided .csv file is stored in mongodb as database.
* API end points have been developed to fetch the customer queries from database, and send response to corresponding customer queries. 

## Extra Functionalities added

* A boolean flag is added in the database, so that the other agents are not shown the same query which has already been answered.
* Additional information about the customer has been surfaced in the UI, being only customer's userId as of now, so that the agents can get context.
* Agent UI have been made interactive using socket.io technology, so that new incoming messages can show up real time.   

## Demo Video
[Demo Video](https://www.youtube.com/watch?v=DgARl1SxYAA) {YouTube Unlisted Video}  

## App Flow
![untitled@2x](https://user-images.githubusercontent.com/56643076/206699768-bb448d6f-3364-42c0-882e-9788187a192e.png)  

## Software Installations 
  
* Install Node.js from [here](https://nodejs.org/en/).
* Install MongoDB from [here](https://www.mongodb.com/try/download/community).

## Database Setup
* Open MongoDB Compass.
* Create a Database named `customerData` and a collection named `sample`
* Import the `sample.json` file in the collection.

## Dependencies to isntall  

In the project directory install the following dependencies using the following command:

#### `npm i concurrently cors express mongodb morgan react react-dom react-scripts socket.io --save ` 

In the project/src directory install the following dependency using the following command:

#### `npm i socket.io-client --save`

## How to run the project

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
Open [http://localhost:8000](http://localhost:8000) to view server running in your browser.


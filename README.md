# Village Builder

Village Builder is a cross-platform web-based strategy game focusing on building upgrades.

## Installation
Use the npm install to get all the packages. Get three Prompts where the package.js files are. 


Head to these three folders:
- project/client/
- project/server
- project/

Open up a terminal in each of them, and type 

```ecmascript
npm install
```

## Install Local MongoDb:
https://www.mongodb.com/download-center/community

Get the version you need, then download, and install it by the old next, next, finish method.

Then head to C:\
Create a folder named 'data', and then create a subfolder db.
(this needed because the actual mongod will use this path to the database, otherwise it'll fail.)

Now head to the folder where you installed MongoDb.
Default: C:\Program Files\Mongo Db\Server\{version-number}\bin\

In this folder open up a terminal and then type 'mongod.exe'

How do you know it works?
If it fails it'll write some Exception and the terminal will let you write another commands.

IF you did everything well the mongodb server will start and you will see a flashing cursor. On windows by default, you don't have to start the mongod all the time, because it will start with windows from now.


## MongoDB Compass:

Access data by this slow desktop app. You have to connect without change anything in the starting page. (you can connect to MongoAtlas with this app)


## Usage

Head to these three folders:
- project/client/
- project/server
- project/

Open up a terminal in each of them, and type 

```ecmascript
npm start
```
into all three terminals!

# Node Authentication Backend

[![My Skills](https://skills.thijs.gg/icons?i=nodejs,express,javascript,mongodb,&theme=dark)](https://skills.thijs.gg)]

This is a node.js backend with Authentication and CRUD functionality.<br>You can create,read,update,and delete employees

## Technologies

Project is created with:

- Node.js
- Express
- JsonWebtoken
- Mongo DB

## MongoDB setup

- Create a .env file with DB_URI variable
- Add your MongoDB connection string into DB_URI

## Setup

To run this project, install it locally using npm or on GitHub Codespaces:

```
$ npm install
$ npm start
```

## Usage

You can test all routes with Postman.

#### There are few routes:

```
/
/register
/auth
/refresh
/logout
/employees
/users
```

# /register

Send POST request to http://localhost:3500/register <br>Each new registered user will be assigned " User " role by default 2001

### User roles are:

- Admin: 5150
- Editor: 1994
- User: 2001

```
JSON body
{
  "user": "Michael"
  "password": "Scott"
}
```

Only Admin and Editors can create/read/update/delete emplyees <br>
Admin role can delete users as well <br>
In order to have admin access you need to change roles Object manually in MongoDB

### MongoDB Object

```
_id
6429b5ec04f116539828b27c
username:"Michael"
roles:
Object:
User:2001
password:"$2b$13$izRURPzuHer1eF2kFDetre8JGq2Kq7cAslPjgLC.m0szXoALnW0V2"
__v:0
```

# /auth

#### For /auth you need to add few variables to .env file ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET

#### To generate random strings for these variables use node.js command

```
crypto.randomBytes(20).toString('hex')
```

Send POST request to http://localhost:3500/auth

```
JSON body
{
  "user": "Michael"
  "pwd" : "Scott"
}
```

This route will generate accessToken which is used as Bearer Token in Postman for /users and /employees routes.<br>
AccessToken lasts only 60 seconds. For production it's can be set to 5~15min<br>
AuthController.js line 34

# /refresh

Generates a new AccessToken<br>
Every time /auth was called it generates jwt cookie which is used in /refresh<br>
Send GET request to http://localhost:3500/refresh

# /logout

Send GET request to http://localhost:3500/logout <br>
With generated accesToken from /auth as Bearer Token <br>
Response should be:

```
Status: 204 No Content
```

# /employees

## This route has full CRUD functionality

For this route you need Admin or Editor role <br>
In this case Admin

```
_id
6429b5ec04f116539828b27c
username:"Michael"
roles:
Object:
Admin:5150
password:"$2b$13$izRURPzuHer1eF2kFDetre8JGq2Kq7cAslPjgLC.m0szXoALnW0V2"
__v:0
```


<br>
Send GET request to get all employees http://localhost:3500/employees
<br>
Send POST request to add emplyee http://localhost:3500/employees

```
JSON Body
{
  "firstname": "Dwight "
  "lastname" : "Schrute"
}
```

Send PUT request to update emplyee http://localhost:3500/employees

```
JSON Body with emplyee id
{
  "id": "6429b3315a9b336f073807ab"
  "password": "new password"
}
```

Send DELETE request to delete emplyee http://localhost:3500/employees

```
JSON Body with emplyee id
{
  "id": "6429b3315a9b336f073807ab"
}
```

# /users

Role allowed: Admin <br>

- GET http://localhost:3500/users
```
JSON Body with id of MongoDB Object _id
{
  "id" : "6429b5ec04f116539828b27c"
}
```

- DELETE http://localhost:3500/users

``` 
{
  "id" : "6429b5ec04f116539828b27c"
}
```

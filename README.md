# identity-manager
micro-service that manages authentication related procedures


### Authentication
Name | Description | Method | URL
--- | --- | --- | --- | 
register | creates a new user | POST | /register
login | authenticates user | POST | /login
extend | issues a new access-token | POST | /extend
logout | deactivates the refresh-token on the server | POST | /logout

### User Account
Name | Description | Method | URL
--- | --- | --- | --- |
get-users | gets all registered users | GET | /users
edit-user | update user credentials | PATCH | /users/:id
delete-user  | deletes a user | DELETE | /users/:id

### User Tokens
Name | Description | Method | URL
--- | --- | --- | --- |
get-users-tokens | gets all of a user's tokens | GET | /users/:id/tokens
revoke-user-token  | revoke a token | DELETE | /users/:id/tokens/:id

### Roles
Name | Description | Method | URL
--- | --- | --- | --- |
get-roles | gets all roles | GET | /roles
create-role | create new role | POST | /roles
edit-role | update role credentials | PATCH | /roles/:id
delete-role  | deletes a role | DELETE | /roles/:id

### User Roles
Name | Description | Method | URL
--- | --- | --- | --- |
get-user-roles | gets all of a user's roles | GET | /users/:id/roles
update-user-roles | links and or unlinks user-roles  | PATCH | /users/:id/roles


```http
### LOGIN
POST http://localhost:3000/login HTTP/1.1
Content-Type: application/json

{
    "username":"18500290402",
    "password":"888889"
}

### EXTEND
PATCH http://localhost:3000/login HTTP/1.1
Content-Type: application/json
Refresh: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoIjp0cnVlLCJ0b2tlbklkIjoiVE9NRC12Q0dUZHBYdy1aa29QYS1TdnVtUyIsInVzZXJJZCI6IlVTWE5OTUNWT0pTUiIsImlhdCI6MTYwOTIyNTY0NCwiZXhwIjoxNjExODE3NjQ0fQ.zEnXLa4OWmwR55TyvCAqWEd4u-5DPB5tUiMqfpA3xF0


### LOGOUT
### BLOCK
### DISABLE
### DEACTIVATE

### START EMAIL CONFIRMATION
POST http://localhost:3000/verification HTTP/1.1
Content-Type: application/json

{
    "username":"chen7david@me.com"
}
### END EMAIL CONFIRMATION
GET http://localhost:3000/verification/sdfs HTTP/1.1

### START PASSWORD RECOVERY
POST http://localhost:3000/password-reset HTTP/1.1
Content-Type: application/json

{
    "username":"chen7david@me.com"
}
### END PASSWORD RECOVERY
PATCH http://localhost:3000/password-reset
Content-Type: application/json

{
    "password": "888889",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVU1hOTk1DVk9KU1IiLCJpYXQiOjE2MDk0ODg0NjYsImV4cCI6MTYwOTQ4ODUyNn0.4okbMOYtB6yfqH5h_rhyLw4otnPS_Sdcl7FLv9FKksw"
}

### UPDATE PASSWORD

### GET USERS
GET http://localhost:3000/users HTTP/1.1

### CREATE USER
POST http://localhost:3000/users HTTP/1.1
Content-Type: application/json

{
    "username":"15643638289",
    "email":"max@me.com",
    "password":"999999"
}

### GET USER
GET http://localhost:3000/users/1 HTTP/1.1
### EDIT USER
PATCH http://localhost:3000/users/9 HTTP/1.1
Content-Type: application/json

{
    "email":"delta@me.com",
    "password":"888888"
}
### DELETE USER
DELETE http://localhost:3000/users/9 HTTP/1.1
### UPDATE USER ROLES
PATCH http://localhost:3000/users/1/roles HTTP/1.1
Content-Type: application/json

{
    "roleId": [1,2]
}

### GET ROLES
GET http://localhost:3000/roles HTTP/1.1
### CREATE ROLE
POST http://localhost:3000/roles HTTP/1.1
Content-Type: application/json

{
    "name": "fantas",
    "description": "teachers priveliges"
}
### GET ROLE
GET http://localhost:3000/roles/1 HTTP/1.1
### EDIT ROLE
PATCH http://localhost:3000/roles/1 HTTP/1.1
Content-Type: application/json

{
    "name":"admin",
    "description":"complete access to all systems"
}
### DELETE ROLE
DELETE http://localhost:3000/roles/1 HTTP/1.1
### UPDATE ROLE USERS
PATCH http://localhost:3000/roles/1/users HTTP/1.1
Content-Type: application/json

{
    "roleId": [1]
}
```


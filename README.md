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
edit-user-token | update user credentials | PATCH | /users/:id/tokens/:id
deactivate-user-token  | deletes a user | DELETE | /users/:id/tokens/:id

### User Roles
Name | Description | Method | URL
--- | --- | --- | --- |
get-users | gets all registered users | GET | /users
edit-user | update user credentials | PATCH | /users/:id
delete-user  | deletes a user | DELETE | /users/:id

Name | Method | URL
--- | --- | --- | 
get-all-user-tokens | GET | /users/:id/tokens
get-all-user-roles | GET | /users/:id/roles
reset-password | POST | /users/:id/password
update-email | PATCH | /users/:id/email
update-password | PATCH | /users/:id/password

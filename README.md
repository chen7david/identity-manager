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


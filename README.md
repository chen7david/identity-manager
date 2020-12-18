# identity-manager
micro-service that manages authentication related procedures


### Account
Name | Description | Method | URL
--- | --- | --- | --- | 
register | creates a new user | POST | /register
login | authenticates user | POST | /login
extend | issues a new access-token | POST | /extend
logout | deactivates the refresh-token on the server | POST | /logout

Name | Method | URL
--- | --- | --- | 
get-all-users | GET | /users
edit-user | PATCH | /user/:id
delete-user | DELETE | /users/:id
get-all-user-tokens | GET | /users/:id/tokens
get-all-user-roles | GET | /movies/:id/roles
reset-password | POST | /users/:id/password
update-email | PATCH | /users/:id/email
update-password | PATCH | /users/:id/password

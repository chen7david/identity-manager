# identity-manager
micro-service that manages authentication related procedures


### Account
Name | Method | URL
--- | --- | --- | 
register | POST | /register
login | POST | /login
extend | POST | /extend
logout | POST | /logout


get-all-users | GET | /users
edit-user | PATCH | /user/:id
delete-user | DELETE | /users/:id
get-all-user-tokens | GET | /users/:id/tokens
get-all-user-roles | GET | /movies/:id/roles
reset-password | POST | /users/:id/password
update-email | PATCH | /users/:id/email
update-password | PATCH | /users/:id/password

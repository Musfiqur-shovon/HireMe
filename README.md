


// backend setup
- npm init -y
- npm install express mongoose jsonwebtoken bcrypt multer dotenv cors multer
- npm install --save-dev nodemon

// APi 

Role : Admin
GET : api/users/view 

Role : All
GET : api/job/view
GET : api/job/view/:id

Role : Admin , Employee
GET : api/application/view

Role : Employee
PUT : api/application/update/:id (Accept / Reject => Application)

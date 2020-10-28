# challenge-node
nodejs learning path

### audio 
audio file wav collecting, piecing together 
<img src="https://github.com/ywang305/challenge-node/blob/master/screenshots/audio%20subproj%20mind%20flow.png" />

### nginx & docker
- docker-compose.yml
  - volumes:  binding local/host dir to container's dir
  - network_mode: 'host' (container share same IP with host, and that's what I need here)
- nginx' default.conf
  - which is loaded by niginx main conf, so just modifiy this one.
<img src="https://github.com/ywang305/challenge-node/blob/master/screenshots/nginx_docker.png"/>

### Fullstack Nodejs
- express middleware: CORS, exception,
- persist mongoose: validator, ref, populate
- model: Product, Order

![MongoDB doc关系](https://github.com/ywang305/challenge-node/blob/master/screenshots/Fullstack_Mongo_Doc_Ref.png)

- passport middleware for authentication
  - Admin with Cookie
    - Since version 1.5.0, the cookie-parser middleware no longer needed by express-session
    - Passport is middleware of Express, while passport-local is strategy middleware of Passport.
    - passport-local default uses { username, password }, and stored in memory - restart server cleans everything inside.
    
    ![login success with cookie](https://github.com/ywang305/challenge-node/blob/master/screenshots/login_success_with_cookie.png)
    
  - Admin with jsonwebtoken
    - res.cookie('jwt', token, { httpOnly: true })  // If client browser automatically deal with it
    - res.json({ success: true, token: token })   // If client prefer use authorization headers
  - model: User
    - unique username validator:   
      (1) isUnique can't use in lambda => wrong capturing "this", use in function!
      (2) _id is Object ref, === compare always false!  comparing by String(doc1._id) === String(doc2._id)
    - bcrypt: hashing password
   - find-grained access
    
    ![find-grained access](https://github.com/ywang305/challenge-node/blob/master/screenshots/authorize%26authenticate.png)
    

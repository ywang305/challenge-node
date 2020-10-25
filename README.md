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

![MongoDB doc关系](https://github.com/ywang305/challenge-node/blob/master/screenshots/Fullstack_Mongo_Doc_Ref.png)

- passport middleware for authentication
  - express-session, passport-local
    - Since version 1.5.0, the cookie-parser middleware no longer needed by express-session
    - Passport is middleware of Express, while passport-local is strategy middleware of Passport.
    - passport-local default uses { username, password }, and stored in memory - restart server cleans everything inside.
    
    ![login success with cookie](https://github.com/ywang305/challenge-node/blob/master/screenshots/login_success_with_cookie.png)

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

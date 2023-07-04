FROM nginx:1.23

COPY ./index.html ./styles.css ./script.js /usr/share/nginx/html


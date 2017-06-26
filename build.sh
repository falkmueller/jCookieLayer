#!/bin/bash

#Installation
##sudo apt install npm
##sudo apt-get install -y nodejs
##sudo npm install -g uglify-js

#compile js
echo "compile js to build.min.js"
uglifyjs --compress --output jCookieLayer.min.js \
jCookieLayer.js 
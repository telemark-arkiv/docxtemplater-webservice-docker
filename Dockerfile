###########################################################
#
# Dockerfile for docxtemplater-webservice-docker
#
###########################################################

# Setting the base to nodejs 4.2
FROM mhart/alpine-node:4

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install

# Env variables
ENV SERVER_PORT 3000

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT node standalone.js
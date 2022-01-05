# Choose the Image which has Node installed already
FROM node:12

# make the 'app' folder the current working directory
COPY . app/

WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)

# install project dependencies
RUN npm install

EXPOSE 8080

CMD npm run serve
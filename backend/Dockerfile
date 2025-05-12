FROM node:18

#setting working directory in the container
WORKDIR /usr/src/app

#installing dependency
COPY package.json ./
RUN npm install

# copy rest files to container app
COPY . .

#Expose the backend port
EXPOSE 11000

CMD ["npm", "run", "start"]

# in terminal docker build -t container_name . 
# docker run -p 5000:5000 container-name

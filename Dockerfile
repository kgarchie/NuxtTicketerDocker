# specify the node base image with your desired version node:<version> can be done by starting from ubuntu and installing nodejs and npm
FROM node:18.14.1

# set working directory
WORKDIR /nuxt

# copy package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# install dependencies in the container, build and run the app
RUN yarn install \
    && yarn prisma format \
    && yarn prisma migrate dev --name init \
    && yarn prisma deploy --name init \
    && yarn prisma generate

# copy the rest of the files
COPY . .

# set environment variables
ENV PORT=3000

# which port should be exposed
EXPOSE 3000

# commands to build and run the nuxt app
CMD ["yarn", "dev"]

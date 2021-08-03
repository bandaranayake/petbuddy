FROM reactnativecommunity/react-native-android:2020-6-4

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN npm install --silent

COPY . .
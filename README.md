# Pet Buddy
Pet Puddy is an Android app that allows pet owners to find pet sitters and other pet related services easily.

## Docker
### Android Application
1.  Change the current working directory to ```petbuddy-app```

```
cd petbuddy-app
```

2. Build the image

```
docker build -t petbuddy-app .
```

3. Create and start the container

```
docker run -tp 8081:8081 petbuddy-app
```

4. Build and run the app

- Create a release build

```
cd android && ./gradlew assembleRelease
```

- Install and debug the app on a device via Wifi

Connect the device via USB to the host computer and run the following command on the host computer

```
adb tcpip <port-number>
```

Remove USB and run the following commands inside the container

```
adb connect <device-ip>:<port-number>
```

```
yarn android
```

Change bundle location on the device to 

```
<host-ip>:8081
```

### Admin Dashboard
1.  Change the current working directory to ```petbuddy-admin-web```

```
cd petbuddy-admin-web
```

2. Build the image

```
docker-compose up
```

3. Create and start the container

```
docker run -tp 3000:3000 <image-name>
```
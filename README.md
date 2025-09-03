# OPS - Frontend

## Prerequsites:

### In Development machine
1. [nodejs](https://nodejs.org/en/download/prebuilt-installer) LTS version > 20
2. You may need the Android SDK for a virtual app. Xcode is not needed for IOS development.
3. Yarn global - `npm install --global yarn`
4. JDK 20 - For working with gradle [semi-optional]

### For testing in android
1. Expo Go app
2. To be compatible with older versions of expo SDK use: [this](https://expo.dev/go)
<br><b>Note:</b> Sometimes it is installed automatically if you have the device connected via adb and run the project. 

### For testing in IOS
1. Expo Go app
<br><b>Note:</b> Download from app store and connect with the camera app.
*************************************

## To run the program

PWD: Project Root dir

Step 1: Install all the required packages
```sh
yarn set version berry
yarn config set nodeLinker node-modules
yarn install
```

**NOTE:** Ensure you remove `"packageManager": "yarn@4.x.x"` from the last line of package.json before commit.

Step 2: Make sure either you are running an android/IOS emulator or connected a device. 
<br>For more information:
<br>[Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
<br>[IOS Emulator](https://docs.expo.dev/workflow/ios-simulator/)
<br>[USB connected android device](https://developer.android.com/studio/run/device#developer-device-options)


###### yarn start
This will start the expo server and you can scan the QR code to run the app on your device.

Press 's' to convert to expo mode

Optionally, you may use the instructions in 'EAS server' to directly use a distribution build.

Note: You will need to be on the same network as the server. Or hack your way in :p

### EAS server

Run `yarn prebuild` to generate the *android* folder.

In the `./android` folder run `./gradlew clean`

Then using the presets in `eas.json` you may run 

```sh
eas build --platform android --profile preview3 
```

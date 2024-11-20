# 1. Clone the project
```git clone https://github.com/DhirajKarangale/ReactNativeDemo```
```cd ReactNativeDemo```

# 2. Install dependencies
```npm install```

# 3. Set up Android Studio with Emulator
 - Download and install Android Studio from https://developer.android.com/studio
 - Install the Android SDK, NDK, CMake, and Java:
   
# 4. Set up Android Studio with specific versions
   - Download and install Android Studio from https://developer.android.com/studio
   - Install the Android SDK NDK and CMake via **SDK Manager** in Android Studio:
     - Open Android Studio.
     - Go to **Tools > SDK Manager**.
     - Install SDK (if not installed).
     - Install NDK, under **SDK Tools**.
     - Install **CMake** under **SDK Tools**.
   
   - Set up an Android Emulator:
     - Open **AVD Manager** (Android Virtual Device) in Android Studio.
     - Create a new virtual device (SDK 35) and start the emulator once created.

# 5. Diagnose
 ```npx react-native doctor```
   - This command checks for common issues in your development environment.
   - If any issues are found, follow the suggestions to fix them.

# 6. Start the project
```npm start```
   - This will start the React Native packager and open a browser window with options to run your app.
   - Press 'a' in the terminal after running ```npm start``` to launch the Android app on the emulator.

# Test deeplinking 
```adb shell am start -W -a android.intent.action.VIEW -d "demo://profile/12" com.demo```
```adb shell am start -W -a android.intent.action.VIEW -d "demo://home" com.demo```

# Used build tools versions:
   - **Android SDK**: 35 (install via Android Studio SDK Manager)
   - **NDK**: 21.4.7075529 (install via Android Studio SDK Manager)
   - **CMake**: 3.18.1 (install via Android Studio SDK Manager)
   - **Java**: 17.0.12 (React Native requires a compatible version of Java)
   - **NodeJs**: v20.17.0

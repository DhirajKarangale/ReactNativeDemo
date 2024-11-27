# 1. Clone the project
git clone https://github.com/DhirajKarangale/ReactNativeDemo
cd ReactNativeDemo

# 2. Install dependencies
npm install

# 3. Install Node.js v20 (if not already installed)
   - Download and install Node.js v20 from https://nodejs.org/
   - Verify installation by checking the Node version:
     node -v
     # The output should be something like v20.x.x

# 4. Set up Android Studio with specific versions
   - Download and install Android Studio from https://developer.android.com/studio
   - Install the following versions of Android SDK, NDK, CMake, and Java:
     # Required build tools versions:
     - **Android SDK**: 35 (install via Android Studio SDK Manager)
     - **NDK**: 21.4.7075529 (install via Android Studio SDK Manager)
     - **CMake**: 3.18.1 (install via Android Studio SDK Manager)
     - **Java**: 17.0.12 (React Native requires a compatible version of Java)
   
   - Install the Android SDK and NDK via **SDK Manager** in Android Studio:
     - Open Android Studio.
     - Go to **Tools > SDK Manager**.
     - Install SDK version 35 (if not installed).
     - For NDK, select version 21.4.7075529 under **SDK Tools**.
     - Install **CMake 3.18.1** under **SDK Tools**.
   
   - Set up an Android Emulator:
     - Open **AVD Manager** (Android Virtual Device) in Android Studio.
     - Create a new virtual device and start the emulator once created.

# 5. Run "react-native doctor" to check for issues
npx react-native doctor
   - This command checks for common issues in your development environment.
   - If any issues are found, follow the suggestions to fix them.

# 6. Start the project
npm start
   - This will start the React Native packager and open a browser window with options to run your app.

# 7. Run the app on Android emulator
   - Press 'a' in the terminal after running `npm start` to launch the Android app on the emulator.

# 8. Verify deeplinking functionality
   - To test deeplinking, use the following ADB commands:

# Test deeplinking 
adb shell am start -W -a android.intent.action.VIEW -d "demo://profile/12" com.demo
adb shell am start -W -a android.intent.action.VIEW -d "demo://home" com.demo
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

# Test deeplinking to the profile screen
adb shell am start -W -a android.intent.action.VIEW -d "demo://profile/12" com.demo

# Test deeplinking to the home screen
adb shell am start -W -a android.intent.action.VIEW -d "demo://home" com.demo

   - Replace "demo" with your app's package name and adjust the deeplink URLs as needed for your app.

# 9. Additional important steps (if needed)
   - Ensure you have the necessary Android emulation environment set up for running React Native apps smoothly.
   - If your app involves native code changes, make sure to run `npx react-native run-android` instead of just `npm start`.
   - For changes to native code, rebuild the app with `npx react-native run-android`.
   - For proper debugging, make sure your Android device/emulator has developer options enabled, and USB debugging is turned on if you're running on a physical device.

# 10. Running on a physical Android device (optional)
   - Connect your Android device via USB and enable USB debugging in the developer options.
   - Run the following command to install the app on your device:
     npx react-native run-android

# 11. Troubleshooting (optional)
   - If you encounter issues with dependencies or environment setup, use `npm audit` to check for vulnerabilities and resolve them.
   - If the app isn't showing changes immediately, try clearing the cache with:
     npx react-native start --reset-cache

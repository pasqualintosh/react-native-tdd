- Check you have all react native enviroment working
- Do yarn add --dev react-native-testing-library
- Next, to get Detox working, let's first install the global Detox CLI tool:

brew tap wix/brew
brew install --HEAD applesimutils
npm install -g detox-cli

- Do yarn add --dev detox
- Do detox init -r jest
- Your .detoxrc.json should look like (NB binaryPath and build under apps.ios)

<pre><code>
{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "skipLegacyWorkersInjection": true,
  "apps": {
    "ios": {
      "type": "ios.app",
      "binaryPath": "/Users/pasqualesacco/Library/Developer/Xcode/DerivedData/tdd-ekevxetkkdlklpechdcsndkoesvp/Build/Products/Debug-iphonesimulator/tdd.app",
      "build": "xcodebuild -workspace ios/tdd.xcworkspace -configuration Debug -scheme tdd -destination id=5DD9F04F-2326-457B-884B-237FCD45EBBE"
    },
    "android": {
      "type": "android.apk",
      "binaryPath": "SPECIFY_PATH_TO_YOUR_APP_BINARY",
      "build": ""
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 12"
      }
    },
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": "Pixel_3a_API_30_x86"
      }
    }
  },
  "configurations": {
    "ios": {
      "device": "simulator",
      "app": "ios"
    },
    "android": {
      "device": "emulator",
      "app": "android"
    }
  }
}
</code></pre>

- Do detox build --configuration=ios
- Check the yourAppName.app path using finder and make sure is the right path writed under binaryPath
- Do detox test --configuration=ios

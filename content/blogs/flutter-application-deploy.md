---
title: "Upload a Flutter Mobile Application to the Apple App Store and Google Play Store"
excerpt: "A step-by-step guide to build a Flutter app, generate an .aab file for Google Play and an .ipa archive for the Apple App Store, and ship both to review."
author: "Md Mehedi Hasan"
date: "2026-09-28"
feature_image: "/me.png"
status: published
featured: false
tags:
  - flutter
  - build
  - deploy
  - apple store
  - play store
---

## Introduction

Shipping a Flutter application to the stores is a two-part job.

On Android you upload a single `.aab` bundle. On iOS you upload an `.ipa` archive built through Xcode and processed by App Store Connect.

In this guide, you'll walk through both flows from a clean project to a submitted release.

---

## Before You Start

Both stores reject builds that are missing basic metadata, so make sure the following is already in place.

| Requirement | Where it lives |
|-------------|----------------|
| Bundle ID / package name | `android/app/build.gradle.kts` and `ios/Runner.xcodeproj/project.pbxproj` |
| App version and build number | `pubspec.yaml` for Android, `Info.plist` / target settings for iOS |
| App name and description | Store listing console |
| Icons and screenshots | `assets/`, uploaded to each console |
| Privacy policy URL | Store listing console |
| Signing credentials | `key.properties` and the Xcode team |
| Apple Developer membership | Required for any iOS release |

Install dependencies and confirm a clean local build first.

```bash
flutter pub get
flutter doctor
```

### Set the Bundle ID and Package Name

The identifier has to be registered on both consoles, so set it before you build.

**Android.** Both values live in `android/app/build.gradle.kts`. `namespace` sits at the top of the `android` block, and `applicationId` sits under `defaultConfig`.

```kotlin
android {
    namespace = "com.example.myapp"

    defaultConfig {
        applicationId = "com.example.myapp"
    }
}
```

> Renaming the package is more than a find-and-replace. The Kotlin sources live under a matching folder path, so you have to move and rename them too, for example from `android/app/src/main/kotlin/com/example/oldname/` to `android/app/src/main/kotlin/com/example/myapp/`. Update the `package` declaration at the top of each `.kt` file to match, or the build fails.

**iOS.** The identifier is set in `ios/Runner.xcodeproj/project.pbxproj`, and it appears once per build configuration.

| Configuration | Notes |
|---------------|-------|
| Debug | Local development builds |
| Release | Uploads to the App Store |
| Profile | Used for internal distribution and profiling |

Search the file for `PRODUCT_BUNDLE_IDENTIFIER` and update every match.

```text
PRODUCT_BUNDLE_IDENTIFIER = com.example.myapp;
```

> Miss one and you end up with a build that installs under a different identifier than the one registered on App Store Connect. If your app uses capabilities or a `Runner.entitlements` file, the App Groups and Keychain values must use the same prefix too.

---

## Bump the Version

Both stores reject a build whose version or build number was already used. Bump them before every upload.

A Flutter version has two parts in `pubspec.yaml`.

```yaml
version: 1.2.4+45
# (1.2.4) user-facing version
# (45) build number (versionCode)
```

The part before `+` is the version users see. The part after `+` is the build number, which must be strictly higher than the previous upload.

### Bump the Version Part

`dart pub bump` handles the semver portion.

```bash
dart pub bump patch      # 1.2.3 -> 1.2.4
dart pub bump minor      # 1.2.3 -> 1.3.0
dart pub bump major      # 1.2.3 -> 2.0.0
dart pub bump breaking   # 1.2.3 -> 2.0.0
```

Preview the change without writing it.

```bash
dart pub bump patch --dry-run
```

> `dart pub bump` **drops the build number**. Bumping `1.2.3+45` produces `1.2.4`, so you have to add `+46` back by hand.

> You can also change the version manually in `pubspec.yaml` instead of using the command. Edit the `version:` field directly and write the exact value you want.

```yaml
version: 1.2.4+46
```

Either way, the result is the same.

### Keep Xcode in Sync

`Info.plist` reads the version through Flutter's build variables, so a `pubspec.yaml` bump covers both platforms.

```xml
<key>CFBundleShortVersionString</key>
<string>$(FLUTTER_BUILD_NAME)</string>
<key>CFBundleVersion</key>
<string>$(FLUTTER_BUILD_NUMBER)</string>
```

If your Xcode target hardcodes the numbers instead, update them with `agvtool`.

```bash
cd ios
xcrun agvtool new-version -all 2.0.0
xcrun agvtool new-build-number 46 -all
xcrun agvtool what-marketing-version
xcrun agvtool what-version
```

### Check Before You Ship

Confirm both values landed where you expect.

```bash
grep '^version:' pubspec.yaml
```

| Build | Play Store | App Store |
|-------|-----------|-----------|
| `1.2.4+45` | versionCode 45 | CFBundleVersion 45 |
| `1.2.5+46` | versionCode 46 | CFBundleVersion 46 |

---

## Android Release

### 1. Set Up Android Signing

Android release builds must be signed with an **upload key**. Set this up once, then reuse it for every future release.

You need three things: a keystore file, a properties file holding its passwords, and a Gradle config that reads them.

**Generate the keystore.** Run this once and store the `.jks` file somewhere safe and backed up.

```bash
keytool -genkey -v \
  -keystore upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

> If you lose this file, you can never update the app again without requesting a key reset from Google.

**Store the passwords.** Create `android/key.properties` and fill in the values you just created.

```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=upload
storeFile=docs/release/upload_key/upload-keystore.jks
```

Add these to your project's `.gitignore` file so the passwords and the keystore never get committed.

```gitignore
android/key.properties
**/*.jks
**/*.keystore
```

**Point Gradle at it.** Open `android/app/build.gradle`, load the properties, and use them in the release `signingConfig`.

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias = keystoreProperties['keyAlias']
            keyPassword = keystoreProperties['keyPassword']
            storeFile = keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword = keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

> `file()` resolves `storeFile` relative to the `android` directory, not the project root. So `docs/release/upload_key/upload-keystore.jks` means `<project>/android/docs/release/upload_key/upload-keystore.jks`. Gradle reads this path on its own, so you only need to run the build command from the project root.

### 2. Build the App Bundle

Run the build from the project root.

```bash
flutter build appbundle
```

> Run `flutter clean` first if you want to clear old build output, then rebuild from scratch. Do it whenever a previous build is being reused, signing changes are not picked up, or the version number looks stale in the output. Skip it for everyday local development, since a full rebuild is slow.

```bash
flutter pub get
flutter build appbundle
```

> Use `flutter build appbundle --release` when you need to be explicit. Gradle reads the version from `pubspec.yaml`, so bump the `version:` field before every upload.

### 3. Upload to Google Play

The bundle is written to the Android build output directory.

```text
build/app/outputs/bundle/release/app-release.aab
```

Upload it in the **Play Console**.

1. Open your app, then go to **Release → Testing → Internal testing** (or Production).
2. Choose **Create new release**.
3. Upload the `.aab` file.
4. Add release notes describing what changed.
5. Save the draft, then **Start rollout**.

Google processes the bundle, generates listing screenshots, and delivers it to testers before you promote it to production.

---

## iOS Release

### 1. Test on the Simulator

Run the app on a simulator and exercise the main flows.

```bash
flutter devices
flutter run -d <simulator_id>
```

Running the app in a simulator is a fast way to catch runtime issues before you create a device archive in Xcode.

### 2. Open the iOS Project in Xcode

```bash
open ios/Runner.xcworkspace
```

For a Flutter project, open `Runner.xcworkspace` rather than `Runner.xcodeproj` so Xcode also loads the CocoaPods dependencies.

Confirm the target is set up correctly.

- **Signing & Capabilities** — select your Apple Developer **Team** and let Xcode create the bundle identifier.
- **General → Identity** — set the display name and version, and bump the build number.
- **Icons** — make sure the App Icon set has every required size.

### 3. Run Xcode Analysis and a Release Build

Xcode's analyzer catches memory issues and Objective-C errors that a normal build misses.

- Select the **Runner** scheme.
- Use **Product → Analyze** (`⌘I`) and resolve the reported issues.
- Confirm that the scheme points to the existing app and uses the correct bundle identifier.
- Then build for release: `flutter build ipa`.

### 4. Archive the App

If you have the Flutter source project, Xcode is the easiest way to create and upload the archive.

```text
Xcode
  ↓
Select the Runner scheme
  ↓
Select Any iOS Device (arm64)
  ↓
Product → Archive
  ↓
Organizer
```

Follow these steps in Xcode:

1. Select the **Runner** scheme for your existing app.
2. Set the run destination to **Any iOS Device (arm64)**. You cannot archive for a simulator.
3. Choose **Product → Archive**.
4. Wait for the release build to finish. Xcode opens **Organizer** automatically.

You can also create an archive from the command line with `flutter build ipa`, but it is not required when you use Xcode's Archive workflow.

### 5. Upload to App Store Connect

With the archive selected in **Organizer**, upload it directly from Xcode.

1. Select the latest archive.
2. Click **Distribute App**.
3. Choose **App Store Connect** → **Upload**.
4. Continue through the signing and distribution options.
5. Let Xcode validate the app and fix any reported errors.
6. Click **Upload**.

After the upload, App Store Connect processes the build and adds it to your existing app. When processing finishes, select the build for the App Store version and submit it for review.

```text
Xcode
  ↓
App Store Connect
  ↓
Processing
  ↓
Build appears in the existing app
  ↓
Select the build
  ↓
Submit for Review
```

#### If You Only Have the `.ipa`

An existing `.ipa` cannot normally be opened in Xcode and uploaded as a new archive. If you have only the `.ipa` and not the source project, upload it with **Transporter** or Apple's command-line upload tooling.

| What you have | Recommended workflow |
|---------------|----------------------|
| iOS source project | **Xcode → Archive → Upload** |
| Flutter project | Open `ios/Runner.xcworkspace`, then archive and upload with Xcode |
| Only an `.ipa` | **Transporter** |
| Expo/EAS project | EAS Build → App Store Connect |

### 6. Verify with TestFlight

Processing can take anywhere from a few minutes to a few hours.

1. Open **App Store Connect → My Apps → your app → TestFlight**.
2. Wait for the build to finish processing and confirm the compliance questions.
3. Add an internal or external tester group.
4. Verify the install and core flows on a real device.

TestFlight is the last checkpoint before review. It runs the exact binary that users will download.

### 7. Submit for Review

When everything checks out, create a submission.

1. Attach the processed build to the **App Store version** you want to release.
2. Add screenshots, descriptions, keywords, and the review contact details.
3. Choose **Add for Review**, then **Submit for Review**.

Apple usually responds within one to two days.

---

## Common Pitfalls

| Problem | Cause |
|---------|-------|
| Missing `key.properties` file | The key path is relative to `android/`, not the project root |
| Build fails after renaming the package | The Kotlin sources under `android/app/src/main/kotlin/` were not moved and their `package` declarations not updated |
| Only one iOS configuration builds | Two of the three `PRODUCT_BUNDLE_IDENTIFIER` entries were left unchanged |
| Play Console rejects the version | The version code in `pubspec.yaml` was not incremented |
| App Store Connect rejects the build | The version or build number in Xcode was not bumped |
| Archive fails to validate | Distribution certificate, profile, or team is missing |
| Everything works in debug only | No release build was tested before uploading |

---

## Conclusion

Android releases are a single command followed by an upload. iOS releases go through Xcode, App Store Connect, and TestFlight.

Build early, bump the version every time, and test on real devices before submitting for review.

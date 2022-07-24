# makaNUS

Team Name : No Errors

Proposed Level of Achievement : Apollo 11

## Motivation
It is inevitable to become burned out during your studies at National University of Singapore. After a long day of classes, the only thing you want is just to find some good food to revive your spirits! But, where should you eat? 

Some of us may have difficulties finding somewhere to eat around NUS. For students who live on campus, they may probably feel bored with their day-to-day meals from their hostels or halls. Meanwhile, students who stay off campus are mostly unfamiliar with places to eat in campus. Google and other available applications may not help since school’s hawker stalls are not fully registered in majority. With this new NUS application, people can find new places to fulfil their hunger, even hidden gems in NUS they never knew existed before! 

In addition, there are fewer reviews on the food around campus. After attending numerous classes and finishing loads of assignments, definitely we refuse to have an unpleasant food. Most of us, especially freshies, are not sure what food is suitable, and what food is not, as well as what suits our taste. The app features a section with food reviews and comments, so we don't need to worry about trying new foods.

## User Stories
1. As the people of NUS, I want to know what foods are there that I haven’t tried yet, to have various kinds of foods to eat, and not repeating foods daily.
2. As the people of NUS, I want to know how the food tastes like before trying it, so I want to read the comments of people who already ate there.
3. As the people of NUS, we don’t just want to know what to eat, but what is available near me. 
4. As the people of NUS, we want to know the prices of the food. So, we can sort the food stalls according to the cost.
5. As the people of public, we want to know where to eat good food in NUS.
6. As the people of public, we want to know the direction leading to the food stalls.

## Aim
makaNUS is meant to be an exclusive NUS food guide and service. The main features of makaNUS will be to provide comments and ratings about the food stalls as well as information about nearby food stalls and their locations. By using makaNUS, we aim to enhance the dining experience for everyone in NUS locals. In addition, to make this app even more interesting, we are implementing an account levelling system, a system that grants various rewards as you level up, by doing the to-do lists!

## Completed Features
1. User Authentication - Users are able to sign up an account, log in, and reset their password account.
2. Providing nearby stalls and the distance based on user's location.
3. Adding user's favorite stalls using the Add to Favorite button!
4. Editing profile and changing user's personal info by pressing the Edit Profile button!
5. Displaying the page of each stalls.
6. Showing directions to each stall (Redirecting to Google Maps).
7. Searching stalls according to their name.
8. Sort stalls based on their categories available.
9. Rate and Review stalls.
10. See overall rating of the stall and other people's reviews.

## Not Completed Features
1. Sign-up with google.
2. Rewards granted when people level up.

To view the details of the features for each page, please refer to this document
https://docs.google.com/document/d/12jqATNUCA6wPw8BWMwAecb451I9bPBGxqw0Gn0SPIYw/edit?usp=sharing (As of Milestone #2)

## Problems Encountered 
1. "expo-app-loading is deprecated in favor of expo-splash-screen" pops up when application is first ran because we are using AppLoading instead of SplashScreen. 
How we plan to handle: Use splashscreen for loading.
2. Sign in with Google does not work in Login screen. It is said that auth is not supported in the environment
How we plan to handle: More research to fix the problem.
 

## Project Log
Link : https://docs.google.com/spreadsheets/d/1z-jnL2-027T6RmRsfHD0B3mGm9rHz39l/edit?usp=sharing&ouid=111446439061801316810&rtpof=true&sd=true

## Progress
Milestone #1 : Front-end and User Authentication feature completed.

Milestone #2 : Added most of the pages/screens and features.

## Installation


If you have an Android device, we have an apk release that you can use to test our app! Since most phones now use ARM processors, it is recommended to download the apk customized for ARM64, with the file name `app-arm64-v8a-release.apk` via this link: https://drive.google.com/drive/folders/1bRMKL1-gXEHCNQtm2PtWu83xwtcKCWV4?usp=sharing. 

Otherwise, you can try this way:

1. Please access our repository with this link https://github.com/melissaharijanto/Travel-Log and fork it, or
clone the repository to your local device by running this command.
```
git clone https://github.com/melissaharijanto/Travel-Log.git
```
If you have previously cloned the repository to your local device (from previous milestones), please run this
command instead. 
```
cd Travel-Log
git pull
npm install // to install the required dependencies of the project.
```
2. The app is customized for android and uses React Native CLI. If you do not have it set up yet, please refer to this link 
(https://reactnative.dev/docs/environment-setup) to set it up.

Please use the following commands in your terminal:
```
cd Travel-Log // go to the root directory of the project, if you're not in there yet.
npm install // to install the required dependencies of the project.
npm start
npx react-native run-android
```
to run the app.

Otherwise, if you have an Android device and would like to try it there instead of an emulator, you can do this instead.
- Go to Settings > About phone > Software information and tap on your Build number 7 times.
- Developer options will be enabled; go back to Settings > Developer options and enable 'USB Debugging'.
- To confirm whether your device has been connected or not, run 
```
adb devices
```
in your terminal. 
- Run the app by running 
```
npx react-native run-android
```
For more information on this method, please visit this link: https://reactnative.dev/docs/running-on-device.

3. Have fun navigating through! If you face any troubles, please contact us through our Telegram handles:  @livmichelle / @melissaharijanto.
You can sign in with our placeholder account to try the app's features:
- Email: yeonjun@gmail.com
- Password: 300500

Or alternatively, if you want to test the 'Forget Password' function, please sign up with a new account with your
**real** email, as it will be sent via a password-reset email!


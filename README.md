# makaNUS

Team Name : No Errors

Proposed Level of Achievement : Apollo 11

Project Scope : Mobile application with a database non-SQL back-end. Using React Native Expo and Firebase, our app provides user authentication, and a user interface with multiple features.

## Overview
A mobile application built for users to find foods around NUS, equipped with review function. Made with React Native Expo, connected to non-SQL database Firebase, the app is enhanced with user authentication and various features.

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

## User Testing
1. Joanne (NTU Student) - "As an NTU student, I am very looking forward in using makaNUS when the app is ready to release. I have seen the app and it is very helpful, especially because I am an outsider and not familiar with NUS environment. This app will really help me in finding foods in NUS, so I don't have to repeat my food choice everytime i visit NUS. The UI is user friendly, although not so responsive at this state. I believe that this can be improved."
2. Melissa (NUS Student) - "makaNUS will help me in finding new restaurants/food stalls around NUS. I sometimes get bored of the food choices in NUS, but there will always be a hidden restaurant/food stall that I haven't tried yet. Of course, by reading people's reviews, I can judge whether to eat there or not. The app design is easy to use and functional. I really like the idea of this app."

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
11. Leveling system.

To view the features of each page, please refer to this document: [https://docs.google.com/document/d/1Rbl5xvDYa3nckiapXDep-_QBE1GBdg1VTyXYMsfY-6E/edit?usp=sharing ](https://docs.google.com/document/d/1hBfapgKR49UGrzJ8uWQzRZpbJQtXqZy_5xwjNGmxqbY/edit) (Last updated as of Milestone #3)

## Not Completed Features
1. Sign-up with google.
2. Rewards granted when people level up.


## Problems Encountered 
1. "expo-app-loading is deprecated in favor of expo-splash-screen" pops up when application is first ran because we are using AppLoading instead of SplashScreen. 
How we plan to handle: Use splashscreen for loading.
2. Sign in with Google does not work in Login screen. It is said that auth is not supported in the environment.
How we plan to handle: More research to fix the problem.
 

## Project Log
Link : https://docs.google.com/spreadsheets/d/1z-jnL2-027T6RmRsfHD0B3mGm9rHz39l/edit?usp=sharing&ouid=111446439061801316810&rtpof=true&sd=true

## Progress
Milestone #1 : Front-end and User Authentication feature completed.

Milestone #2 : Added most of the pages/screens and features.

Milestone #3 : Added more features, fixed several bugs, and a bit change on some pages UI. Most of the details in the app, such as thumbnails, menus, reviews, are only a placeholder due to it is not officialy released yet. By adding the data to firebase, this app will be ready to launch! 

Design changes from Milestone #1:

We previously planned to offer a sign-in with google method, but the method could not seem to work on the app. Hence, we decided to remove the feature.
Login screen and Sign-up screen text inputs are now not boxed, instead they just have lines below the text inputs.
Search bar is moved from homepage to a standalone screen.
Filter button is removed, replaced with category cards at the bottom of homepage.

## Installation
We would be happy if you are interested to try it out! Here are the steps to do so:

1. Download the apk on the link via this link: [https://drive.google.com/drive/folders/1Q0qIsOcA8e1gywtuvj8G5o0js0vbWKxL](https://drive.google.com/file/d/1gFAnwnSS32ArHONuNik0LG95btI5mA4c/view?usp=sharing). (apk name: `makaNUS.apk`)
2. Since Firebase is banned on Singapore, we encourage users to download and activate the recommended VPN here: https://psiphon.ca/.
3. Install the app by using the apk.
4. Users are now able to create an account and give it a try!
5. Have fun, browse through our app! If you have any enquiries, please contact us through our Telegram handles: @midnightfeverrr / @kenzantonius.




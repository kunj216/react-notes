# react notes
 -> react is a <b>library</b> not a <u>framework</u>.

# classic react command
-> npx create-react-app app-name

# another way is to use bundler (vite, webpack, parcel)
-> npm create vite@latest
-> then continue next steps

we prefer bundler as they are light weight and suitable for early learning.

- React DOM and React Native are both libraries used with the core React library to build user interfaces, but they target different platforms: the web and mobile devices. 

1. React DOM (for Web)
React DOM is the "glue" between React and the browser's Document Object Model (DOM). It is used specifically for building web applications.

2. React Native (for Mobile)
React Native is an open-source framework used to build native mobile applications for iOS and Android using JavaScript and React.

- package.json has all the dependencies which can be downloaded with the command "npm install". It also contain all the scripts such as run, build, dev etc.

# Rules for vite
1. files which export components should have jsx extension and their function names should have first letter in uppercase.
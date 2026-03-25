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

# React Internal Working — Short Notes
what react actually is

-> <b>React</b> is a JavaScript library used to build user interfaces (UI)
-> React lets us describe UI using components instead of manual DOM manipulation
-> React converts JS objects → real DOM elements

problem with vanilla javascript DOM

Example:

document.createElement()<br>
setAttribute()<br>
appendChild()

Issues:

-> too much manual work<br>
-> hard to manage large apps<br>
-> updating UI becomes complex

React solves this using declarative UI

# react element concept

React elements are just JavaScript objects

Example structure:

{<br>
 type: "a",<br>
 props: {<br>
   href: "https://google.com"/<br>
 },<br>
 children: "Click me"<br>
}

This represents:

`<a href="https://google.com">Click me</a>`

React converts this object into real DOM automatically

# Custom renderer concept

React internally performs steps like:

create element->
add attributes->
add children->
insert into DOM

Example logic:

function customRender(element, container) {

 const domElement = document.createElement(element.type)

 domElement.innerHTML = element.children

 domElement.setAttribute("href", element.props.href)

 container.appendChild(domElement)

}

React does this automatically behind the scenes ⚙️

# Root container concept

React renders everything inside a root element

Example:

`<div id="root"></div>`

Then React injects UI inside it:

ReactDOM.createRoot(root).render(`<App />`)

Root acts as entry point 🚀

# jsx concept (most important)

JSX looks like HTML but it is not HTML

Example:

`<h1>Hello</h1>`

JSX converts into:

React.createElement("h1", null, "Hello")

So:

JSX → JavaScript function call → React object → DOM

why babel is required

Browsers cannot understand JSX directly

So Babel converts:

JSX

into:

React.createElement()

Flow:

JSX → Babel → React.createElement → DOM
react.createElement syntax

Example:

React.createElement(
 "a",
 { href: "https://google.com" },
 "Click me"
)

Parameters:

1️⃣ element type
2️⃣ props object
3️⃣ children

Equivalent JSX:

`<a href="https://google.com">Click me</a>`
rendering flow of react

Actual internal flow:

JSX<br>
 ↓<br>
React.createElement()<br>
 ↓<br>
React element object<br>
 ↓<br>
ReactDOM.render()<br>
 ↓<br>
Browser DOM

This is the core rendering pipeline 🧠

# virtual dom concept

React does NOT update real DOM directly

Instead:

create virtual DOM copy
compare with previous version
update only changed parts

Benefits:

-> faster updates<br>
-> better performance<br>
-> efficient UI rendering
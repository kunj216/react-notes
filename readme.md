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

# Virtual DOM

-> Virtual DOM is a lightweight JavaScript copy of the real browser DOM

Instead of directly updating the browser DOM:

React updates Virtual DOM first
then updates only required changes in real DOM
why virtual dom is needed

Updating real DOM directly is slow

Example:

change 1 element
browser may repaint large portion of UI

React solution:

update virtual dom<br>
compare old vs new virtual dom<br>
update only changed parts

Result:

-> faster rendering<br>
-> better performance<br>
-> optimized UI updates ⚡

working of virtual dom

Flow:

UI change happens<br>
↓<br>
new virtual dom created<br>
↓<br>
compare with old virtual dom<br>
↓<br>
detect differences<br>
↓<br>
update only changed nodes in real DOM

This comparison process is called Reconciliation

# Reconciliation

-> Reconciliation is the process of comparing old Virtual DOM with new Virtual DOM

Purpose:

find what changed in UI
update only that part

Instead of:

reload entire page

React does:

update only modified components
reconciliation example

Example:

Old Virtual DOM:

`<h1>Hello</h1>`

New Virtual DOM:

`<h1>Hello Kunj</h1>`

React detects:

only text changed

So React updates:

only text node
not entire element

Efficient update 🚀

# reconciliation rules react follows
1. Rule 1<br>
different element type → replace entire element

Example:

`<h1>` → `<p>`

Entire node replaced

2. Rule 2<br>
same element type → update attributes only

Example:

`<h1 class="a">` → `<h1 class="b">`

Only class changes

3. Rule 3<br>
lists require keys

Keys help React identify:

which item changed<br>
which item moved<br>
which item deleted

Example:

items.map(item =>
  `<li key={item.id}>{item.name}</li>`
)

Keys improve reconciliation performance ⚡

# React Fiber Architecture

-> Fiber is the new reconciliation engine of React

Introduced in:

React 16

Purpose:

make rendering faster<br>
make rendering interruptible<br>
support smoother UI updates<br>
problem before fiber

Before Fiber:

React rendering was synchronous

Meaning:

once rendering starts
cannot stop until finished

Result:

UI freeze possible in large apps
solution using fiber

Fiber makes rendering:

asynchronous<br>
interruptible<br>
prioritized

React can now:

pause rendering<br>
resume rendering<br>
cancel rendering<br>
reuse rendering work

Result:

smoother user experience
# How fiber works internally

React divides work into small units called fibers

Instead of:

render everything at once

React does:

render small pieces step-by-step

So browser stays responsive

benefits of fiber architecture

Fiber enables:

concurrent rendering<br>
better animations<br>
smoother scrolling<br>
priority-based updates<br>
background rendering support

Example priority:

button click → high priority<br>
animation → medium priority<br>
data loading → low priority

React processes high priority updates first ⚡

complete internal rendering flow (important)

Final pipeline:

JSX<br>
↓<br>
React.createElement()<br>
↓<br>
Virtual DOM created<br>
↓<br>
Reconciliation process<br>
↓<br>
Fiber schedules updates<br>
↓<br>
Real DOM updated efficiently

This is the core internal workflow of modern React 🧠
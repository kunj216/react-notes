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

# Props (Properties)

-> Props are **inputs passed from parent component to child component** <br>
-> Props make components **reusable and dynamic** <br>
-> Props are **read-only (immutable)**

---

## Example of Props

Parent Component:

```jsx
function App() {
  return <User name="Kunj" />
}
```

Child Component:

```jsx
function User(props) {
  return <h1>Hello {props.name}</h1>
}
```

Output:

```html
<h1>Hello Kunj</h1>
```

Explanation:

-> Parent sends data using props <br>
-> Child receives data using `props.name`

---

## Props Flow Direction

Props always move:

```
Parent → Child
```

Example:

```jsx
function Parent() {
  return <Child message="Hello React" />
}

function Child(props) {
  return <p>{props.message}</p>
}
```

---

## Props Destructuring (Recommended Method)

Instead of writing:

```jsx
function User(props) {
  return <h1>{props.name}</h1>
}
```

Write:

```jsx
function User({ name }) {
  return <h1>{name}</h1>
}
```

Cleaner and preferred practice ✨

---

## Props are Immutable

Wrong:

```jsx
props.name = "Rahul"
```

Correct:

```
Parent updates props
Child receives updated props automatically
```

---

# State

-> State stores **dynamic data inside a component** <br>
-> State updates trigger **component re-render** <br>
-> State is **managed using useState Hook**

Example idea:

```
Props = external data
State = internal data
```

---

# useState Hook

-> `useState()` is used to **create and update state inside functional components**

Syntax:

```jsx
const [state, setState] = useState(initialValue)
```

---

## Example of useState

```jsx
import { useState } from "react"

function Counter() {

  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

Explanation:

-> Initial state = 0 <br>
-> Clicking button increases count <br>
-> Component re-renders automatically

---

## Multiple State Variables Example

```jsx
import { useState } from "react"

function Profile() {

  const [name, setName] = useState("Kunj")
  const [age, setAge] = useState(20)

  return (
    <>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </>
  )
}
```

A component can have **multiple state variables**

---

## Updating State Example

```jsx
import { useState } from "react"

function Counter() {

  const [count, setCount] = useState(0)

  function increase() {
    setCount(count + 1)
  }

  return (
    <button onClick={increase}>
      Increase
    </button>
  )
}
```

---

# Hooks

-> Hooks allow functional components to **use React features like state and lifecycle methods** <br>
-> Hooks were introduced in **React 16.8**

Common hooks:

```
useState
useEffect
useContext
useRef
useMemo
useCallback
```

Most commonly used:

```
useState
useEffect
```

---

# useEffect Hook

-> `useEffect()` handles **side effects inside components**

Side effects include:

```
API calls
Timers
Event listeners
DOM updates
Subscriptions
```

Syntax:

```jsx
useEffect(() => {

  logic here

}, [dependency])
```

---

## Example of useEffect

```jsx
import { useEffect } from "react"

function Example() {

  useEffect(() => {
    console.log("Component Loaded")
  }, [])

  return <h1>Hello</h1>
}
```

Explanation:

-> Runs only once after component loads

---

## Dependency Array Behavior

Case 1:

```jsx
useEffect(() => {}, [])
```

Runs:

```
only once (component mount)
```

---

Case 2:

```jsx
useEffect(() => {}, [value])
```

Runs:

```
whenever value changes
```

---

Case 3:

```jsx
useEffect(() => {})
```

Runs:

```
every render
```

---

# Rules of Hooks

Rule 1:

```
only call hooks at top level
```

Correct:

```jsx
useState()
```

Wrong:

```jsx
if(condition){
  useState()
}
```

---

Rule 2:

```
only call hooks inside React components
```

Allowed:

```
functional components
custom hooks
```

Not allowed:

```
loops
conditions
nested functions
normal javascript functions
```

---

# Props vs State Difference

Props:

```
passed from parent component
read-only
used for communication
```

State:

```
managed inside component
can be updated
controls component behavior
```

Shortcut idea:

```
props = function parameters
state = local variables
```

---

# Rendering Flow with Props and State

React workflow:

```
Parent sends props
↓
Child receives props
↓
State updates using hooks
↓
Component re-renders
↓
Virtual DOM updates
↓
Real DOM updates efficiently
```

This is the **core workflow of modern functional React components** 🚀
---

# React Hooks

Hooks allow functional components to **use state, lifecycle features, and performance optimizations** <br>

Commonly used hooks:

```
useState
useEffect
useRef
useCallback
```

---

# useState Hook

-> `useState()` is used to **store and update data inside a component** <br>
-> Updating state automatically **re-renders the component**

Syntax:

```jsx
const [state, setState] = useState(initialValue)
```

---

## Example of useState

```jsx
import { useState } from "react"

function Counter() {

  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

Explanation:

-> Initial state = `0` <br>
-> Clicking button updates state <br>
-> Component re-renders automatically

---

## Multiple State Variables Example

```jsx
import { useState } from "react"

function Profile() {

  const [name, setName] = useState("Kunj")
  const [age, setAge] = useState(20)

  return (
    <>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </>
  )
}
```

A component can have **multiple state variables**

---

## Updating State Using Previous Value

Recommended approach when state depends on previous state:

```jsx
setCount(prevCount => prevCount + 1)
```

Example:

```jsx
function Counter() {

  const [count, setCount] = useState(0)

  function increase() {
    setCount(prev => prev + 1)
  }

  return (
    <button onClick={increase}>
      Increase
    </button>
  )
}
```

---

# useEffect Hook

-> `useEffect()` is used to **handle side effects inside components** <br>
-> Runs after component render

Side effects include:

```
API calls
Timers
Event listeners
Subscriptions
DOM updates
```

Syntax:

```jsx
useEffect(() => {

  logic here

}, [dependency])
```

---

## Example of useEffect

```jsx
import { useEffect } from "react"

function Example() {

  useEffect(() => {
    console.log("Component mounted")
  }, [])

  return <h1>Hello React</h1>
}
```

Explanation:

-> Runs only once after component loads

---

## Dependency Array Behavior

Case 1:

```jsx
useEffect(() => {}, [])
```

Runs:

```
only once (component mount)
```

---

Case 2:

```jsx
useEffect(() => {}, [value])
```

Runs:

```
whenever value changes
```

---

Case 3:

```jsx
useEffect(() => {})
```

Runs:

```
after every render
```

---

## Cleanup Function Example

Cleanup prevents memory leaks

Example:

```jsx
import { useEffect } from "react"

function Timer() {

  useEffect(() => {

    const interval = setInterval(() => {
      console.log("Running...")
    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [])

  return <h1>Timer Running</h1>
}
```

Cleanup runs when component **unmounts**

---

# useRef Hook

-> `useRef()` stores a **mutable reference value** <br>
-> Updating ref **does NOT re-render component**

Used for:

```
access DOM elements
store previous values
persist values between renders
```

Syntax:

```jsx
const refName = useRef(initialValue)
```

---

## Example: Access DOM Element

```jsx
import { useRef } from "react"

function InputFocus() {

  const inputRef = useRef()

  function focusInput() {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>
        Focus Input
      </button>
    </>
  )
}
```

Explanation:

-> `useRef` stores reference to input element <br>
-> Button click focuses input

---

## Example: Store Value Without Re-render

```jsx
import { useRef } from "react"

function Counter() {

  const countRef = useRef(0)

  function increase() {
    countRef.current += 1
    console.log(countRef.current)
  }

  return (
    <button onClick={increase}>
      Increase Ref Count
    </button>
  )
}
```

Component does **not re-render**

---

# useCallback Hook

-> `useCallback()` memoizes a function <br>
-> Prevents unnecessary function re-creation during re-render <br>
-> Improves performance in optimized components

Syntax:

```jsx
const memoizedFunction = useCallback(() => {

}, [dependencies])
```

---

## Example of useCallback

```jsx
import { useState, useCallback } from "react"

function Counter() {

  const [count, setCount] = useState(0)

  const increase = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <button onClick={increase}>
      Increase
    </button>
  )
}
```

Explanation:

-> Function recreated only when dependencies change <br>
-> Helps avoid unnecessary renders

---

## Why useCallback is Needed

Normally:

```
function recreated every render
```

With useCallback:

```
function reused between renders
```

Useful when passing functions to:

```
child components
React.memo components
event-heavy components
```

---

# Difference Between useRef and useState

useState:

```
stores value
triggers re-render
used for UI updates
```

useRef:

```
stores value
does NOT trigger re-render
used for DOM reference or persistent values
```

---

# When to Use Which Hook

useState:

```
store UI-related data
```

useEffect:

```
handle side effects
```

useRef:

```
access DOM or store persistent value
```

useCallback:

```
optimize function performance
```

---

# Hooks Execution Flow

React workflow:

```
Component renders
↓
useState manages data
↓
useEffect handles side effects
↓
useRef stores persistent values
↓
useCallback optimizes functions
↓
Component updates efficiently
```

This forms the **core hook workflow inside modern React functional components** 🚀
---

# useId Hook

-> `useId()` generates a **unique stable ID inside React components** <br>
-> Mainly used for **accessibility attributes like label + input linking** <br>
-> Prevents ID conflicts when multiple components render

Introduced in:

```
React 18
```

---

## Syntax of useId

```jsx
const id = useId()
```

---

## Example of useId

```jsx
import { useId } from "react"

function LoginForm() {

  const id = useId()

  return (
    <>
      <label htmlFor={id}>Username</label>
      <input id={id} type="text" />
    </>
  )
}
```

Explanation:

-> `useId()` generates unique ID automatically <br>
-> Connects `label` with `input` correctly <br>
-> Improves accessibility

---

## Example with Multiple Inputs

```jsx
import { useId } from "react"

function SignupForm() {

  const usernameId = useId()
  const passwordId = useId()

  return (
    <>
      <label htmlFor={usernameId}>Username</label>
      <input id={usernameId} />

      <label htmlFor={passwordId}>Password</label>
      <input id={passwordId} type="password" />
    </>
  )
}
```

Each input receives **unique stable ID**

---

## Why useId is Needed

Without `useId()`:

```
manual id conflicts possible
duplicate id errors possible
accessibility issues possible
```

With `useId()`:

```
automatic unique ids generated
safe for reusable components
works with server rendering
```

---

## Important Rule of useId

```
do not use useId() for list keys
```

Wrong:

```jsx
items.map(item => (
  <li key={useId()}>{item}</li>
))
```

Correct:

```jsx
items.map(item => (
  <li key={item.id}>{item.name}</li>
))
```

---

# Custom Hooks

-> Custom Hooks are **user-defined reusable functions built using React hooks** <br>
-> Used to **share logic between multiple components**

Naming rule:

```
must start with "use"
```

Example:

```
useFetch
useToggle
useAuth
useLocalStorage
```

---

## Why Custom Hooks are Needed

Without custom hooks:

```
duplicate logic in multiple components
code becomes hard to manage
```

With custom hooks:

```
logic reusable
clean components
better structure
```

---

## Example of Custom Hook

Example: Toggle Hook

```jsx
import { useState } from "react"

function useToggle(initialValue = false) {

  const [value, setValue] = useState(initialValue)

  function toggle() {
    setValue(prev => !prev)
  }

  return [value, toggle]
}
```

Usage inside component:

```jsx
function App() {

  const [isVisible, toggleVisible] = useToggle()

  return (
    <>
      <button onClick={toggleVisible}>
        Toggle
      </button>

      {isVisible && <h1>Hello React</h1>}
    </>
  )
}
```

Explanation:

-> Custom hook stores toggle logic <br>
-> Component reuses logic easily

---

## Example Custom Hook: useFetch

Reusable API fetch hook

```jsx
import { useState, useEffect } from "react"

function useFetch(url) {

  const [data, setData] = useState(null)

  useEffect(() => {

    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))

  }, [url])

  return data
}
```

Usage:

```jsx
function Users() {

  const data = useFetch("https://jsonplaceholder.typicode.com/users")

  return (
    <>
      {data &&
        data.map(user => (
          <p key={user.id}>{user.name}</p>
        ))
      }
    </>
  )
}
```

---

## Rules of Custom Hooks

Rule 1:

```
must start with "use"
```

Rule 2:

```
can call other hooks inside custom hooks
```

Example:

```jsx
useState
useEffect
useRef
```

Rule 3:

```
must follow rules of hooks
```

Meaning:

```
call only at top level
call inside React function
```

---

# Difference Between Normal Function and Custom Hook

Normal Function:

```
cannot use React hooks inside
```

Custom Hook:

```
can use React hooks inside
returns reusable logic
```

Example:

```jsx
function helperFunction() {
  // cannot use useState here
}
```

```jsx
function useHelperFunction() {
  // allowed to use useState here
}
```

---

# When to Use Custom Hooks

Use custom hooks when:

```
same logic repeated in multiple components
API calls repeated
form handling repeated
toggle logic repeated
authentication logic repeated
```

Custom hooks make React apps **scalable and clean** 🚀

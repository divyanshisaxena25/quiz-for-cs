import { Question } from '../../types';

export const WEB_QUESTIONS: Question[] = [
  {
    id: 'web-1',
    subject: 'web',
    topic: 'JavaScript Fundamentals',
    question: 'In JavaScript, what is the output of `typeof null`?',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctIndex: 2,
    explanation: 'In JavaScript, `typeof null` returns `"object"`. This is a well-known legacy behavior in the JS engine from the first version of JS, where values had type tags and the null pointer representation was 0x00, matching the object type tag.'
  },
  {
    id: 'web-2',
    subject: 'web',
    topic: 'CSS Layout',
    question: 'Which CSS Box Model property determines the space between the content box and the border?',
    options: ['Margin', 'Padding', 'Outline', 'Gap'],
    correctIndex: 1,
    explanation: 'Padding specifies the interior spacing between the content and the element’s border. Margin controls the exterior spacing outside the border.'
  },
  {
    id: 'web-3',
    subject: 'web',
    topic: 'JavaScript Event Loop',
    question: 'In the JavaScript runtime, what is the key difference between the Microtask queue and the Macrotask (Callback) queue?',
    options: [
      'Microtasks (e.g., Promise callbacks, queueMicrotask) execute immediately after the current call stack clears and before the next macrotask is processed',
      'Macrotasks have higher execution priority than Microtasks',
      'Microtasks are handled by the Web Worker thread only',
      'The event loop clears macrotasks before checking microtasks'
    ],
    correctIndex: 0,
    explanation: 'The event loop executes all microtasks (Promises, MutationObserver callbacks) until the microtask queue is completely drained before picking the next macrotask (such as setTimeout, setInterval, I/O).'
  },
  {
    id: 'web-4',
    subject: 'web',
    topic: 'HTTP Protocol',
    question: 'Which HTTP status code indicates that the requested resource has been permanently moved to a new URI?',
    options: ['301 Moved Permanently', '302 Found', '304 Not Modified', '307 Temporary Redirect'],
    correctIndex: 0,
    explanation: 'HTTP 301 signals a permanent redirect, prompting browsers and search engine crawlers to update their cached links and bookmarks to the new URI.'
  },
  {
    id: 'web-5',
    subject: 'web',
    topic: 'Web Security',
    question: 'What security header is primarily configured to prevent Cross-Site Scripting (XSS) attacks by restricting script sources?',
    options: [
      'Content-Security-Policy (CSP)',
      'Access-Control-Allow-Origin',
      'Strict-Transport-Security (HSTS)',
      'X-Frame-Options'
    ],
    correctIndex: 0,
    explanation: 'Content-Security-Policy (CSP) allows server operators to declare an allowlist of approved sources from which browsers can load executable scripts, stylesheets, and media.'
  },
  {
    id: 'web-6',
    subject: 'web',
    topic: 'HTML5 APIs',
    question: 'How does `localStorage` differ from `sessionStorage` in the Web Storage API?',
    options: [
      '`localStorage` persists data across browser tabs and sessions until explicitly cleared, while `sessionStorage` is scoped to the tab and cleared when the tab closes',
      '`sessionStorage` has unlimited storage while `localStorage` is capped at 50KB',
      '`localStorage` is transmitted automatically with every HTTP header',
      '`sessionStorage` only works over HTTPS'
    ],
    correctIndex: 0,
    explanation: '`localStorage` stores data with no expiration time across sessions. In contrast, `sessionStorage` maintains a separate storage area for each given origin that is available for the duration of the page session (tab lifetime).'
  },
  {
    id: 'web-7',
    subject: 'web',
    topic: 'JavaScript Closures',
    question: 'What is a Closure in JavaScript?',
    options: [
      'A method to terminate an event listener',
      'A function bundled together with references to its surrounding lexical state (lexical environment)',
      'An asynchronous function that cannot throw errors',
      'A design pattern to emulate private inheritance via classes'
    ],
    correctIndex: 1,
    explanation: 'A closure is the combination of a function and the lexical environment within which that function was declared, allowing the inner function to access an outer function’s scope even after the outer function has executed.'
  },
  {
    id: 'web-8',
    subject: 'web',
    topic: 'CSS Flexbox',
    question: 'In CSS Flexbox, which property aligns flex items along the cross axis?',
    options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
    correctIndex: 1,
    explanation: '`justify-content` distributes items along the main axis, while `align-items` aligns items along the cross axis (perpendicular to main axis).'
  },
  {
    id: 'web-9',
    subject: 'web',
    topic: 'HTTP Methods',
    question: 'What is the characteristic of an Idempotent HTTP method?',
    options: [
      'Making multiple identical requests produces the same side-effect on the server as making a single request',
      'The response must never be cached by the browser',
      'The request body can only be transmitted in plain text',
      'The request cannot be sent via HTTPS'
    ],
    correctIndex: 0,
    explanation: 'An HTTP method is idempotent if the side-effects of N > 0 identical requests with that method are the same as for a single request (e.g., GET, PUT, DELETE are idempotent; POST is not).'
  },
  {
    id: 'web-10',
    subject: 'web',
    topic: 'DOM Manipulation',
    question: 'What does Event Delegation rely upon to handle events on multiple child elements efficiently?',
    options: ['Event Bubbling (propagation)', 'Shadow DOM encapsulation', 'CSS Specificity', 'CSS Media Queries'],
    correctIndex: 0,
    explanation: 'Event delegation takes advantage of event bubbling: rather than attaching individual event listeners to dozens of child nodes, a single listener is placed on their common ancestor.'
  },
  {
    id: 'web-11',
    subject: 'web',
    topic: 'JavaScript ES6',
    question: 'What is the difference between `let` and `var` in JavaScript regarding variable scoping?',
    options: [
      '`let` is block-scoped, while `var` is function-scoped (or globally scoped)',
      '`let` can be redeclared in the same scope, whereas `var` cannot',
      '`var` is hoisted into the Temporal Dead Zone',
      '`let` cannot be updated after initialization'
    ],
    correctIndex: 0,
    explanation: '`var` is scoped to the nearest enclosing function context and is hoisted to the top with an initial value of `undefined`. `let` is block-scoped (constrained within `{}`) and resides in the Temporal Dead Zone until initialized.'
  },
  {
    id: 'web-12',
    subject: 'web',
    topic: 'CORS',
    question: 'When does a browser trigger an HTTP OPTIONS "preflight" request before sending an actual cross-origin request?',
    options: [
      'When the request uses non-simple HTTP methods (e.g. PUT, DELETE) or custom headers like Authorization',
      'On every single image GET request',
      'Only when requesting data from localhost',
      'When the user opens a browser in incognito mode'
    ],
    correctIndex: 0,
    explanation: 'Browsers automatically send a preflight OPTIONS request if the cross-origin request is not a "simple request" (i.e. if it uses methods like PUT/DELETE, or headers other than Accept/Accept-Language/Content-Language, or Content-Types like application/json).'
  },
  {
    id: 'web-13',
    subject: 'web',
    topic: 'Cookies',
    question: 'What does the `HttpOnly` flag on an HTTP response cookie prevent?',
    options: [
      'Client-side JavaScript code (via `document.cookie`) from reading or modifying the cookie',
      'The cookie from being transmitted over secure TLS connections',
      'The cookie from expiring before 30 days',
      'The cookie from being sent to subdomains'
    ],
    correctIndex: 0,
    explanation: 'The `HttpOnly` flag mitigates Cross-Site Scripting (XSS) session theft by blocking access to the cookie through client-side scripts like `document.cookie`.'
  },
  {
    id: 'web-14',
    subject: 'web',
    topic: 'Cookies',
    question: 'What does setting `SameSite=Strict` on a cookie guarantee?',
    options: [
      'The cookie is never sent in cross-site requests, protecting against CSRF attacks',
      'The cookie can only be set by root domain IP addresses',
      'The cookie value is encrypted with SHA-256',
      'The cookie will be deleted as soon as the user scrolls'
    ],
    correctIndex: 0,
    explanation: '`SameSite=Strict` ensures the cookie is sent only in first-party contexts (when the site for the cookie matches the site currently shown in the browser address bar), eliminating CSRF risks.'
  },
  {
    id: 'web-15',
    subject: 'web',
    topic: 'CSS Specificity',
    question: 'Which of the following CSS selectors possesses the highest specificity weight?',
    options: ['An ID selector (`#header`)', 'A Class selector (`.navigation`)', 'An Element selector (`header`)', 'A Universal selector (`*`)'],
    correctIndex: 0,
    explanation: 'CSS specificity hierarchy awards highest priority to inline styles, followed by ID selectors (1,0,0), class/attribute/pseudo-class selectors (0,1,0), and element/pseudo-element selectors (0,0,1).'
  },
  {
    id: 'web-16',
    subject: 'web',
    topic: 'JavaScript Asynchronous',
    question: 'What does `Promise.all([p1, p2, p3])` do when one of the promises rejects?',
    options: [
      'It immediately rejects with the reason of the first promise that rejected ("fast-fail")',
      'It waits for all promises to settle and returns an array of states',
      'It ignores the rejected promise and resolves with the others',
      'It retries the rejected promise up to 3 times'
    ],
    correctIndex: 0,
    explanation: '`Promise.all` short-circuits: if any promise in the array rejects, the returned promise immediately rejects with that rejection error. (For waiting on all regardless of status, `Promise.allSettled` is used).'
  },
  {
    id: 'web-17',
    subject: 'web',
    topic: 'REST API',
    question: 'Which architectural principle of REST states that each request from client to server must contain all necessary information to understand and process the request?',
    options: ['Statelessness', 'Cacheability', 'Layered System', 'Code on Demand'],
    correctIndex: 0,
    explanation: 'Statelessness requires that no client session state is retained on the server between requests. Every request carries all required credentials, parameters, and authentication tokens.'
  },
  {
    id: 'web-18',
    subject: 'web',
    topic: 'HTML5 Elements',
    question: 'Which semantic HTML5 element is specifically designed to enclose self-contained content with optional `<figcaption>`?',
    options: ['`<figure>`', '`<aside>`', '`<article>`', '`<section>`'],
    correctIndex: 0,
    explanation: 'The `<figure>` element represents self-contained content (such as illustrations, diagrams, code snippets, or photos), frequently paired with `<figcaption>` to provide an accessible caption.'
  },
  {
    id: 'web-19',
    subject: 'web',
    topic: 'JavaScript Engine',
    question: 'What is the purpose of the `use strict` directive in JavaScript?',
    options: [
      'It enforces stricter parsing and error handling, preventing accidental globals and silent failures',
      'It enables experimental WebGPU features',
      'It forces the V8 engine to compile only in 64-bit mode',
      'It disables asynchronous callbacks'
    ],
    correctIndex: 0,
    explanation: 'Strict mode catches common coding bloopers (like assigning to undeclared variables), throws exceptions on silent failures (like assigning to read-only properties), and secures `this` binding.'
  },
  {
    id: 'web-20',
    subject: 'web',
    topic: 'Web Performance',
    question: 'What is the purpose of the `defer` attribute on an HTML `<script>` tag?',
    options: [
      'It downloads the script in parallel with HTML parsing and executes it in order after HTML document parsing is complete',
      'It stops the HTML parser until the script completes execution',
      'It prevents the script from running on mobile devices',
      'It converts the script into an inline Web Worker'
    ],
    correctIndex: 0,
    explanation: 'The `defer` attribute downloads scripts asynchronously without blocking HTML parsing, and executes them in the exact order they appear in the document once DOM parsing is finished (before DOMContentLoaded).'
  },
  {
    id: 'web-21',
    subject: 'web',
    topic: 'WebSockets',
    question: 'How does WebSocket protocol differ from HTTP long-polling?',
    options: [
      'WebSocket provides a persistent, full-duplex, bidirectional communication channel over a single TCP connection',
      'WebSocket requires opening a new TCP handshake for every message sent',
      'WebSocket can only transfer binary data, not JSON strings',
      'WebSocket cannot be secured with TLS'
    ],
    correctIndex: 0,
    explanation: 'Unlike HTTP polling which incurs repeated HTTP header overhead, WebSocket initiates via an HTTP upgrade handshake and establishes a persistent full-duplex socket for ultra-low latency exchanges.'
  },
  {
    id: 'web-22',
    subject: 'web',
    topic: 'CSS Grid',
    question: 'In CSS Grid layout, what does the `fr` unit represent?',
    options: [
      'A fraction of the available free space in the grid container',
      'Fixed resolution relative to screen DPI',
      'Frame rate speed for CSS keyframe transitions',
      'Font-relative line height'
    ],
    correctIndex: 0,
    explanation: 'The `fr` unit represents a fraction of the unused flexible space within the CSS grid container after non-flexible and gap lengths are subtracted.'
  },
  {
    id: 'web-23',
    subject: 'web',
    topic: 'JavaScript Equality',
    question: 'What is the fundamental difference between `==` and `===` in JavaScript?',
    options: [
      '`==` performs type coercion before comparison, whereas `===` checks both value and type without coercion',
      '`===` only works for numbers and strings',
      '`==` is faster because it bypasses memory checks',
      '`===` throws a ReferenceError if types differ'
    ],
    correctIndex: 0,
    explanation: 'The loose equality operator `==` converts operands of differing types (coercion) to a common type before comparing, while strict equality `===` evaluates to false if types differ.'
  },
  {
    id: 'web-24',
    subject: 'web',
    topic: 'Web Security',
    question: 'What type of vulnerability occurs when an attacker tricks an authenticated user into executing unwanted actions on a trusted web application?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'SQL Injection (SQLi)',
      'Server-Side Request Forgery (SSRF)',
      'Buffer Overflow'
    ],
    correctIndex: 0,
    explanation: 'CSRF exploits the browser’s automatic inclusion of stored authentication credentials (such as session cookies) when making requests to a vulnerable target domain from a malicious third-party site.'
  },
  {
    id: 'web-25',
    subject: 'web',
    topic: 'DOM Manipulation',
    question: 'What method is used to attach an event handler in modern standard JavaScript without overriding existing handlers?',
    options: ['element.addEventListener()', 'element.attach()', 'element.onEvent = fn', 'element.setEventHandler()'],
    correctIndex: 0,
    explanation: '`addEventListener()` allows multiple listeners to be attached to the same event on a single element and provides control over capturing and bubbling phases.'
  },
  {
    id: 'web-26',
    subject: 'web',
    topic: 'Browser Rendering',
    question: 'What browser pipeline phase occurs when geometry (dimensions and positions of elements) must be recalculated?',
    options: ['Reflow (Layout)', 'Repaint', 'Compositing', 'Rasterization'],
    correctIndex: 0,
    explanation: 'Reflow (or Layout) is the browser engine step where the exact size and position of every visible element is computed. Changes to geometry (e.g. width, margin, top) trigger expensive reflow operations.'
  },
  {
    id: 'web-27',
    subject: 'web',
    topic: 'JSON',
    question: 'Which of the following is NOT a valid data type supported directly by native JSON syntax?',
    options: ['Function / Undefined', 'Array', 'Boolean', 'Number'],
    correctIndex: 0,
    explanation: 'JSON supports Strings, Numbers, Objects, Arrays, Booleans, and `null`. It does not support JavaScript Functions, `undefined`, Symbols, or BigInt.'
  },
  {
    id: 'web-28',
    subject: 'web',
    topic: 'JavaScript Arrays',
    question: 'Which JavaScript array method creates a new array populated with the results of calling a provided function on every element in the calling array?',
    options: ['Array.prototype.map()', 'Array.prototype.forEach()', 'Array.prototype.filter()', 'Array.prototype.reduce()'],
    correctIndex: 0,
    explanation: '`map()` transforms each element by executing a callback and returns a brand new array of identical length. `forEach()` simply executes side-effects and returns undefined.'
  },
  {
    id: 'web-29',
    subject: 'web',
    topic: 'CSS Box Sizing',
    question: 'What is the effect of setting `box-sizing: border-box;` in CSS?',
    options: [
      'Padding and borders are included in the element’s total specified width and height',
      'The border is placed outside the margin',
      'Margins are collapsed horizontally',
      'The element becomes an inline-block automatically'
    ],
    correctIndex: 0,
    explanation: 'With `box-sizing: border-box`, when you declare `width: 200px`, any added padding and border values are carved out from within the 200px rather than expanding the element outward.'
  },
  {
    id: 'web-30',
    subject: 'web',
    topic: 'HTTP 2 vs HTTP 1.1',
    question: 'What key architectural advancement does HTTP/2 introduce over HTTP/1.1 to resolve Head-of-Line blocking at the application layer?',
    options: [
      'Multiplexing multiple concurrent bidirectional streams over a single TCP connection',
      'Requiring unencrypted plain text',
      'Disabling all client-side caching',
      'Limiting URL lengths to 128 characters'
    ],
    correctIndex: 0,
    explanation: 'HTTP/2 introduces a binary framing layer that allows interleaving of multiple independent request and response streams concurrently over one TCP socket, eliminating HTTP/1.1 head-of-line blocking.'
  },
  {
    id: 'web-31',
    subject: 'web',
    topic: 'JavaScript Modules',
    question: 'In ES Modules (ESM), how are imports resolved compared to CommonJS `require()`?',
    options: [
      'ESM imports are statically parsed at compile/load time and strictly immutable; CommonJS requires are dynamically loaded at runtime',
      'CommonJS only works inside Web Workers',
      'ESM imports cannot export objects',
      'CommonJS does not support caching'
    ],
    correctIndex: 0,
    explanation: 'ES Modules use static analysis for `import` and `export` statements, enabling tree-shaking and early circular reference detection, whereas CommonJS `require()` is dynamic and synchronous at runtime.'
  },
  {
    id: 'web-32',
    subject: 'web',
    topic: 'HTML5 Canvas',
    question: 'What is the standard JavaScript method used to retrieve a 2D drawing rendering context on an HTML5 `<canvas>` element?',
    options: ['canvas.getContext("2d")', 'canvas.get2D()', 'canvas.renderContext()', 'canvas.draw2D()'],
    correctIndex: 0,
    explanation: 'Calling `canvas.getContext("2d")` returns a CanvasRenderingContext2D object offering methods for drawing shapes, text, images, and paths.'
  },
  {
    id: 'web-33',
    subject: 'web',
    topic: 'Web Accessibility',
    question: 'In web accessibility (a11y), what does the `aria-label` attribute provide?',
    options: [
      'An invisible string label used by assistive screen readers when no visual text is present on an interactive element',
      'A tooltip shown on hover only',
      'A stylesheet override for high-contrast mode',
      'A validation regex for input elements'
    ],
    correctIndex: 0,
    explanation: '`aria-label` defines a string value that labels an interactive element (e.g. an icon button), ensuring screen reader users understand its purpose even when there is no visible text.'
  },
  {
    id: 'web-34',
    subject: 'web',
    topic: 'Service Workers',
    question: 'Where do Service Workers execute within the browser runtime architecture?',
    options: [
      'In a background worker thread separate from the main UI thread, without direct access to the DOM',
      'Inside the parent `<iframe>` of the website',
      'Within the active browser tab’s DOM tree',
      'Exclusively on the remote server'
    ],
    correctIndex: 0,
    explanation: 'Service Workers run in a distinct worker context with no DOM access, functioning as programmable network proxies between the browser, cache storage, and the network for offline PWA capabilities.'
  },
  {
    id: 'web-35',
    subject: 'web',
    topic: 'JavaScript Scope',
    question: 'What is the "Temporal Dead Zone" (TDZ) in JavaScript?',
    options: [
      'The time interval between variable hoisting and initialization with `let` or `const` where accessing the variable throws a ReferenceError',
      'The time it takes for garbage collection to run',
      'The timeout before a network request fails',
      'The period during which the event loop is idle'
    ],
    correctIndex: 0,
    explanation: 'When JavaScript enters a scope, `let` and `const` variables are hoisted but left uninitialized. Any read or write before their declaration statement resides in the TDZ and throws a ReferenceError.'
  },
  {
    id: 'web-36',
    subject: 'web',
    topic: 'HTTP Headers',
    question: 'Which HTTP caching header allows servers to identify if a resource representation has changed by providing an opaque entity validator token?',
    options: ['ETag', 'Server', 'User-Agent', 'Content-Encoding'],
    correctIndex: 0,
    explanation: 'An ETag (Entity Tag) is an HTTP response header that acts as a version fingerprint. Clients submit it in `If-None-Match` on subsequent requests so the server can return `304 Not Modified` if unchanged.'
  },
  {
    id: 'web-37',
    subject: 'web',
    topic: 'JavaScript Objects',
    question: 'How does `Object.freeze()` differ from `Object.seal()` in JavaScript?',
    options: [
      '`Object.freeze()` prevents adding, deleting, AND modifying existing properties; `Object.seal()` prevents adding/deleting but allows modifying existing writable properties',
      '`Object.seal()` makes all properties read-only',
      '`Object.freeze()` operates recursively on nested objects by default',
      'There is no functional difference'
    ],
    correctIndex: 0,
    explanation: '`Object.freeze()` makes an object completely immutable (configurable: false, writable: false). `Object.seal()` prevents property additions/removals (configurable: false) but leaves existing writable properties mutable.'
  },
  {
    id: 'web-38',
    subject: 'web',
    topic: 'CSS Transitions',
    question: 'Which CSS properties are typically the most performant to animate because they can be handled directly by the GPU compositor without triggering layout or paint?',
    options: ['`transform` and `opacity`', '`width` and `height`', '`top` and `left`', '`margin` and `padding`'],
    correctIndex: 0,
    explanation: '`transform` and `opacity` do not alter element geometry or trigger DOM repaints; the browser GPU compositor handles their interpolation on dedicated compositor layers with minimal CPU overhead.'
  },
  {
    id: 'web-39',
    subject: 'web',
    topic: 'Web Cryptography',
    question: 'Which browser API provides cryptographically secure pseudo-random number generation (CSPRNG)?',
    options: ['crypto.getRandomValues()', 'Math.random()', 'Date.now()', 'performance.now()'],
    correctIndex: 0,
    explanation: '`crypto.getRandomValues()` (Web Crypto API) samples high-entropy OS system randomness and is cryptographically secure, whereas `Math.random()` uses pseudo-random algorithms that must never be used for security tokens.'
  },
  {
    id: 'web-40',
    subject: 'web',
    topic: 'JavaScript Promises',
    question: 'What will be logged to the console by: `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?',
    options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
    correctIndex: 0,
    explanation: 'Synchronous code runs first (`1`, then `4`). Then the microtask queue (Promise callback `3`) executes before macrotasks. Finally, the macrotask queue (`setTimeout` callback `2`) runs, producing 1, 4, 3, 2.'
  }
];

import { Question } from '../../types';

export const PYTHON_QUESTIONS: Question[] = [
  {
    id: 'py-1',
    subject: 'python',
    topic: 'Data Types & Mutability',
    question: 'Which of the following built-in data types in Python is IMMUTABLE?',
    options: ['List', 'Dictionary', 'Tuple', 'Set'],
    correctIndex: 2,
    explanation: 'In Python, tuples, strings, integers, floats, and frozensets are immutable; their values cannot be modified in-place after creation. Lists, dictionaries, and sets are mutable.'
  },
  {
    id: 'py-2',
    subject: 'python',
    topic: 'Memory & References',
    question: 'What is the output of the following Python snippet?\n`a = [1, 2, 3]`\n`b = a`\n`b.append(4)`\n`print(a)`',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'AttributeError', '[4, 1, 2, 3]'],
    correctIndex: 1,
    explanation: 'In Python, variables store references to objects. The assignment `b = a` binds variable `b` to the identical list object referenced by `a`. Appending 4 to `b` modifies the shared underlying list, so `a` also evaluates to `[1, 2, 3, 4]`.'
  },
  {
    id: 'py-3',
    subject: 'python',
    topic: 'Generators',
    question: 'What keyword transforms a regular Python function into a Generator function that lazily yields values upon iteration?',
    options: ['return', 'yield', 'produce', 'emit'],
    correctIndex: 1,
    explanation: 'The `yield` statement turns a function into a generator object that pauses execution and produces values on demand, saving memory when dealing with massive data streams.'
  },
  {
    id: 'py-4',
    subject: 'python',
    topic: 'Concurrency & Runtime',
    question: 'What is the purpose of the Global Interpreter Lock (GIL) in CPython?',
    options: [
      'A mutex that allows only one native thread to execute Python bytecode at a time',
      'A security sandbox that prevents unauthorized file writes',
      'A memory compressor for dictionaries',
      'A compiler flag that enables C++ acceleration'
    ],
    correctIndex: 0,
    explanation: 'The GIL in CPython prevents multiple OS threads from executing Python bytecodes simultaneously, simplifying CPython memory management and reference counting at the cost of limiting CPU-bound multithreading.'
  },
  {
    id: 'py-5',
    subject: 'python',
    topic: 'Functions & Arguments',
    question: 'What do `*args` and `**kwargs` represent in a Python function signature?',
    options: [
      'Pointers and double pointers as in C',
      '`*args` packs arbitrary positional arguments into a tuple; `**kwargs` packs arbitrary keyword arguments into a dictionary',
      '`*args` requires all arguments to be strings; `**kwargs` requires integers',
      '`*args` and `**kwargs` are reserved keywords that cannot be changed'
    ],
    correctIndex: 1,
    explanation: '`*args` gathers excess positional arguments into an immutable tuple, while `**kwargs` gathers excess keyword arguments into a mutable key-value dictionary.'
  },
  {
    id: 'py-6',
    subject: 'python',
    topic: 'List Comprehensions',
    question: 'What does the list comprehension `[x**2 for x in range(5) if x % 2 == 0]` evaluate to?',
    options: ['[0, 4, 16]', '[1, 9]', '[0, 1, 4, 9, 16]', '[4, 16]'],
    correctIndex: 0,
    explanation: '`range(5)` yields 0, 1, 2, 3, 4. Filtering for even numbers (`x % 2 == 0`) leaves 0, 2, 4. Squaring them yields [0, 4, 16].'
  },
  {
    id: 'py-7',
    subject: 'python',
    topic: 'Decorators',
    question: 'In Python, what is a Decorator fundamentally?',
    options: [
      'A callable that takes another function as an argument, extends or modifies its behavior, and returns a callable',
      'A CSS stylesheet parser for Pygame',
      'A type hint for static code analysis',
      'A class method that cannot access class variables'
    ],
    correctIndex: 0,
    explanation: 'A decorator is a higher-order function that accepts a target function, wraps additional functionality around it (such as logging, authentication, or timing), and returns the enhanced wrapper function.'
  },
  {
    id: 'py-8',
    subject: 'python',
    topic: 'Object-Oriented Programming',
    question: 'What is the Method Resolution Order (MRO) in Python multiple inheritance determined by?',
    options: ['C3 Superclass Linearization algorithm', 'Depth-First Search left-to-right strictly', 'Alphabetical class name sorting', 'Random selection'],
    correctIndex: 0,
    explanation: 'Python uses the C3 Linearization algorithm to determine the MRO, guaranteeing monotonicity and preserving the local precedence order declared in class definitions.'
  },
  {
    id: 'py-9',
    subject: 'python',
    topic: 'OOP Special Methods',
    question: 'What is the distinction between `__new__` and `__init__` in Python classes?',
    options: [
      '`__new__` is a static method responsible for creating and returning a new instance; `__init__` initializes that already created instance',
      '`__init__` allocates the memory heap; `__new__` frees it',
      '`__new__` only runs when inheriting from C extensions',
      'There is no difference; they are aliases'
    ],
    correctIndex: 0,
    explanation: '`__new__` is the actual constructor that instantiates and returns the new object instance, while `__init__` is the initializer that configures attributes on that instance once created.'
  },
  {
    id: 'py-10',
    subject: 'python',
    topic: 'Default Parameter Pitfalls',
    question: 'What happens if a mutable object (like a list `def fn(item, lst=[]):`) is used as a default argument in a Python function?',
    options: [
      'The default list is created once at function definition time and shared across all subsequent invocations that omit that parameter',
      'Python creates a fresh empty list on every single function call',
      'Python throws a TypeError at compile time',
      'The function crashes when called more than twice'
    ],
    correctIndex: 0,
    explanation: 'Default arguments in Python are evaluated once when the function definition is executed, not at call time. Modifying a mutable default persists across future calls (standard idiom is `lst=None`).'
  },
  {
    id: 'py-11',
    subject: 'python',
    topic: 'Exception Handling',
    question: 'In a `try ... except ... else ... finally` block, when does the `else` clause execute?',
    options: [
      'Only if no exception was raised in the `try` block',
      'Always, regardless of exceptions',
      'Only if an exception was caught by `except`',
      'Only if the `finally` block raises an error'
    ],
    correctIndex: 0,
    explanation: 'The `else` block in Python exception handling executes only when the code inside the `try` suite finishes without raising any exceptions.'
  },
  {
    id: 'py-12',
    subject: 'python',
    topic: 'Dictionaries',
    question: 'How are Python dictionaries implemented under the hood in modern CPython (3.7+)?',
    options: [
      'A compact hash table using a sparse indices array pointing to a dense entries array, preserving insertion order',
      'A Red-Black binary search tree',
      'A linked list with linear probing',
      'A skip list with probabilistic balancing'
    ],
    correctIndex: 0,
    explanation: 'CPython 3.7+ uses Raymond Hettinger’s compact dict design consisting of a sparse hash table of integer indices pointing to a dense insertion-ordered array of (hash, key, value) structs.'
  },
  {
    id: 'py-13',
    subject: 'python',
    topic: 'Built-in Functions',
    question: 'What does `zip([1, 2], ["a", "b", "c"])` produce when converted to a list in standard Python?',
    options: ['[(1, "a"), (2, "b")]', '[(1, "a"), (2, "b"), (None, "c")]', '[(1, 2), ("a", "b", "c")]', 'ValueError'],
    correctIndex: 0,
    explanation: 'Standard `zip()` stops iteration as soon as the shortest input iterable is exhausted. Thus it yields pairs for 1 and 2 and ignores "c" (unless `itertools.zip_longest` is used).'
  },
  {
    id: 'py-14',
    subject: 'python',
    topic: 'Slicing',
    question: 'What does the slice syntax `s[::-1]` achieve on a string `s = "PYTHON"`?',
    options: ['Reverses the string to "NOHTYP"', 'Returns the first character "P"', 'Throws a SyntaxError', 'Returns an empty string'],
    correctIndex: 0,
    explanation: 'The slice notation `[start:stop:step]` with a step of `-1` steps backwards through the iterable from the end to the beginning, effectively reversing the string.'
  },
  {
    id: 'py-15',
    subject: 'python',
    topic: 'Variables & Scoping',
    question: 'What keyword allows modifying a variable residing in the nearest enclosing non-global scope?',
    options: ['nonlocal', 'global', 'outer', 'super'],
    correctIndex: 0,
    explanation: 'The `nonlocal` keyword allows an inner nested function to rebind variables in an outer enclosing function scope, whereas `global` binds directly to the top-level module scope.'
  },
  {
    id: 'py-16',
    subject: 'python',
    topic: 'Context Managers',
    question: 'Which two dunder methods must a class implement to support the `with` context manager statement?',
    options: ['`__enter__` and `__exit__`', '`__open__` and `__close__`', '`__start__` and `__stop__`', '`__init__` and `__del__`'],
    correctIndex: 0,
    explanation: 'The context manager protocol requires `__enter__()` which is invoked before entering the `with` block, and `__exit__(exc_type, exc_val, exc_tb)` which is invoked upon leaving the block.'
  },
  {
    id: 'py-17',
    subject: 'python',
    topic: 'Built-in Collections',
    question: 'In the `collections` module, what is a `defaultdict` used for?',
    options: [
      'A dictionary subclass that calls a factory function to provide default values for non-existent keys',
      'A dictionary that cannot be updated after initialization',
      'A dictionary that sorts keys automatically in alphabetical order',
      'A dictionary stored in persistent SQLite'
    ],
    correctIndex: 0,
    explanation: '`defaultdict(default_factory)` prevents `KeyError` by automatically initializing missing keys with the return value of the provided callable (e.g. `int`, `list`, or `set`).'
  },
  {
    id: 'py-18',
    subject: 'python',
    topic: 'Identity vs Equality',
    question: 'What is the distinction between `a == b` and `a is b` in Python?',
    options: [
      '`==` tests for equality of values; `is` tests for object identity (whether both point to the exact same memory address)',
      '`is` compares numerical values only',
      '`==` is only used for strings and floats',
      'They are completely synonymous in Python 3'
    ],
    correctIndex: 0,
    explanation: '`==` calls the `__eq__` magic method to check if contents are equivalent. `is` checks whether `id(a) == id(b)`, verifying if both operands reference the identical instance in memory.'
  },
  {
    id: 'py-19',
    subject: 'python',
    topic: 'Memory Management',
    question: 'How does CPython primarily reclaim unused memory, and how does it resolve cyclic references?',
    options: [
      'Reference counting as the primary collector, supplemented by a cyclic generational garbage collector',
      'Mark-and-sweep exclusively every 60 seconds',
      'Manual malloc/free executed by the programmer',
      'Stop-the-world compaction on thread exit'
    ],
    correctIndex: 0,
    explanation: 'CPython tracks references using a counter on each PyObject (freeing objects immediately when counter hits 0). A generational cyclic garbage collector periodically detects and breaks isolated circular reference loops.'
  },
  {
    id: 'py-20',
    subject: 'python',
    topic: 'String Formatting',
    question: 'Which string formatting approach introduced in Python 3.6 provides the fastest execution speed and inline expression evaluation?',
    options: ['Formatted string literals (f-strings)', 'str.format() method', '`%` modulo formatting', 'Template strings'],
    correctIndex: 0,
    explanation: 'f-strings (e.g. `f"{name} is {age * 2}"`) are evaluated at runtime by compiling expressions into optimized bytecode operations, making them faster and more readable than `%` or `str.format()`.'
  },
  {
    id: 'py-21',
    subject: 'python',
    topic: 'Sets',
    question: 'What is the average time complexity for checking membership (`x in s`) in a Python `set` containing n elements?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctIndex: 0,
    explanation: 'Python sets are implemented as hash tables. Computing the hash and probing the bucket takes O(1) average time complexity, assuming a good hash distribution.'
  },
  {
    id: 'py-22',
    subject: 'python',
    topic: 'Lambda Functions',
    question: 'What is a limitation of Python’s `lambda` functions compared to standard `def` functions?',
    options: [
      'They are restricted to a single expression and cannot contain multi-line statements or assignments',
      'They cannot take more than one parameter',
      'They cannot return integers',
      'They cannot be passed into other functions'
    ],
    correctIndex: 0,
    explanation: 'Python anonymous lambda functions (`lambda x, y: x + y`) can only consist of a single expression whose value is returned automatically. They cannot contain statements like `while`, `for`, or `try`.'
  },
  {
    id: 'py-23',
    subject: 'python',
    topic: 'OOP Dunder Methods',
    question: 'What does the `__repr__` method intend to return, according to Python conventions?',
    options: [
      'An unambiguous string representation of the object, ideally valid Python code that could recreate the object',
      'A user-friendly short description for terminal display only',
      'The binary address of the class instance',
      'The total byte size of the object'
    ],
    correctIndex: 0,
    explanation: 'By official convention, `__repr__` aims to be unambiguous and developer-focused (often copy-pasteable into the Python REPL), whereas `__str__` is intended for clean, human-readable display.'
  },
  {
    id: 'py-24',
    subject: 'python',
    topic: 'Data Types',
    question: 'What is the boolean evaluation (`bool()`) of `[], {}, 0, "", None` in Python?',
    options: ['All evaluate to False (falsy)', 'All evaluate to True (truthy)', '`0` is True, the rest are False', 'Throws a TypeError'],
    correctIndex: 0,
    explanation: 'In Python, empty sequences (`[]`, `""`, `()`), empty mappings (`{}`), numerical zeroes (`0`, `0.0`), and `None` evaluate to `False` in boolean contexts.'
  },
  {
    id: 'py-25',
    subject: 'python',
    topic: 'List Operations',
    question: 'What is the difference between `list.sort()` and `sorted(list)` in Python?',
    options: [
      '`list.sort()` sorts the list in-place and returns `None`; `sorted(list)` creates and returns a brand new sorted list',
      '`sorted()` modifies the original list directly',
      '`list.sort()` cannot accept custom `key` functions',
      '`sorted()` only works on integer elements'
    ],
    correctIndex: 0,
    explanation: '`list.sort()` mutates the list in-place without returning anything (returns `None`), while built-in `sorted(iterable)` accepts any iterable and returns a new sorted `list`.'
  },
  {
    id: 'py-26',
    subject: 'python',
    topic: 'OOP Properties',
    question: 'What does the `@property` decorator do in Python classes?',
    options: [
      'Allows a method to be accessed like an attribute without calling parentheses, enabling getters, setters, and deleters',
      'Makes all class fields immutable',
      'Converts the class into a singleton',
      'Stores the attribute in an external configuration file'
    ],
    correctIndex: 0,
    explanation: 'The `@property` decorator defines getter methods that can be accessed syntactically as attributes (e.g. `obj.area` instead of `obj.area()`), facilitating encapsulation and data validation.'
  },
  {
    id: 'py-27',
    subject: 'python',
    topic: 'Magic Methods',
    question: 'Which magic method enables an instance of a Python class to be called like a function (e.g. `obj()`)?',
    options: ['`__call__`', '`__invoke__`', '`__run__`', '`__exec__`'],
    correctIndex: 0,
    explanation: 'Implementing `def __call__(self, *args, **kwargs)` makes an instance of the class callable just like a regular function.'
  },
  {
    id: 'py-28',
    subject: 'python',
    topic: 'Data Structures',
    question: 'Which module in the Python standard library provides an O(1) double-ended queue for efficient pops and appends on both ends?',
    options: ['collections.deque', 'queue.LifoQueue', 'heapq', 'array.array'],
    correctIndex: 0,
    explanation: '`collections.deque` is implemented as a doubly linked list of blocks, guaranteeing O(1) appends and pops from both the left and right sides (whereas `list.pop(0)` takes O(n)).'
  },
  {
    id: 'py-29',
    subject: 'python',
    topic: 'Shallow vs Deep Copy',
    question: 'How does `copy.deepcopy()` differ from `copy.copy()` on a nested data structure?',
    options: [
      '`copy.copy()` constructs a new compound object and inserts references to the original child objects; `copy.deepcopy()` recursively copies all nested child objects',
      '`copy.deepcopy()` only copies strings',
      '`copy.copy()` deletes the original object',
      'There is no functional distinction'
    ],
    correctIndex: 0,
    explanation: 'A shallow copy copies the outer container while preserving references to nested items. Deep copy constructs a completely independent recursive clone of all nested objects.'
  },
  {
    id: 'py-30',
    subject: 'python',
    topic: 'Iterators',
    question: 'What built-in exception is raised to signal the end of iteration when calling `next()` on an exhausted iterator?',
    options: ['StopIteration', 'EndOfStringError', 'IteratorExhaustedError', 'IndexError'],
    correctIndex: 0,
    explanation: 'When an iterator has no further items, calling `next(iterator)` raises a `StopIteration` exception, which `for` loops automatically catch to cleanly terminate.'
  },
  {
    id: 'py-31',
    subject: 'python',
    topic: 'Walrus Operator',
    question: 'What is the Walrus operator (`:=`) introduced in Python 3.8 used for?',
    options: [
      'Assignment expressions (assigning values to variables inside expressions like `if` or `while`)',
      'Bitwise XOR assignment',
      'Floor division assignment',
      'Defining lambda parameters'
    ],
    correctIndex: 0,
    explanation: 'The walrus operator `:=` enables assignment expressions, allowing you to assign a value to a variable within an expression context (e.g. `while (chunk := file.read(1024)):`).'
  },
  {
    id: 'py-32',
    subject: 'python',
    topic: 'OOP Inheritance',
    question: 'What does `super()` accomplish in a child class method?',
    options: [
      'Returns a proxy object that delegates method calls to a parent or sibling class based on the MRO',
      'Creates a new parent class on the fly',
      'Destroys the current instance',
      'Overrides private methods'
    ],
    correctIndex: 0,
    explanation: '`super()` delegates method calls dynamically along the class’s Method Resolution Order (MRO), allowing child classes to invoke parent implementations seamlessly.'
  },
  {
    id: 'py-33',
    subject: 'python',
    topic: 'Module Execution',
    question: 'What is the purpose of the boilerplate `if __name__ == "__main__":` in Python files?',
    options: [
      'It ensures code within the block runs only when the script is executed directly, and not when imported as a module',
      'It initiates multi-threading',
      'It forces Python to compile in debug mode',
      'It checks if the current user is a root administrator'
    ],
    correctIndex: 0,
    explanation: 'When a Python script runs directly, `__name__` is set to `"__main__"`. When imported by another file, `__name__` is set to the module name, allowing scripts to be both executable and importable.'
  },
  {
    id: 'py-34',
    subject: 'python',
    topic: 'Built-in Functions',
    question: 'What does `enumerate(["apple", "banana", "cherry"], start=1)` yield in each iteration?',
    options: [
      'Tuples containing the index count (starting at 1) and the corresponding element: `(1, "apple"), (2, "banana"), ...`',
      'The elements sorted alphabetically',
      'Only the indices 1, 2, 3',
      'A dictionary with length counts'
    ],
    correctIndex: 0,
    explanation: '`enumerate(iterable, start=n)` pairs each element of an iterable with an incrementing integer index starting at the specified `start` offset.'
  },
  {
    id: 'py-35',
    subject: 'python',
    topic: 'OOP Memory Optimization',
    question: 'What is the purpose of declaring `__slots__` in a Python class definition?',
    options: [
      'To replace the dynamic `__dict__` attribute storage with a compact fixed-size array, saving significant memory for millions of instances',
      'To enable multi-core concurrency',
      'To prevent subclasses from inheriting the class',
      'To enforce static typing on all attributes'
    ],
    correctIndex: 0,
    explanation: '`__slots__` explicitly specifies attribute names, preventing the automatic creation of an internal per-instance `__dict__` and significantly reducing RAM consumption.'
  },
  {
    id: 'py-36',
    subject: 'python',
    topic: 'Packing & Unpacking',
    question: 'What is the value of `first`, `middle`, and `last` after executing `first, *middle, last = [10, 20, 30, 40, 50]`?',
    options: [
      'first = 10, middle = [20, 30, 40], last = 50',
      'first = 10, middle = 20, last = [30, 40, 50]',
      'first = [10, 20], middle = 30, last = [40, 50]',
      'SyntaxError'
    ],
    correctIndex: 0,
    explanation: 'Extended iterable unpacking assigns the first element to `first`, the last element to `last`, and collects all remaining intermediate elements into a list bound to `*middle`.'
  },
  {
    id: 'py-37',
    subject: 'python',
    topic: 'Sorting with Keys',
    question: 'How do you sort a list of tuples `students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]` by grade in descending order?',
    options: [
      '`sorted(students, key=lambda s: s[1], reverse=True)`',
      '`students.sort(descending=True)`',
      '`sorted(students, column=2)`',
      '`students.reverse(key=1)`'
    ],
    correctIndex: 0,
    explanation: 'The `key` parameter takes a function extracting the sorting comparison key (here `s[1]` for the grade), and `reverse=True` orders elements from highest to lowest.'
  },
  {
    id: 'py-38',
    subject: 'python',
    topic: 'Strings & Encodings',
    question: 'What is the default string encoding used in Python 3 source files and string objects?',
    options: ['UTF-8 (Unicode)', 'ASCII', 'ISO-8859-1 (Latin-1)', 'UTF-16 Little Endian'],
    correctIndex: 0,
    explanation: 'Python 3 represents all string literals as Unicode text sequences encoded by default in UTF-8, while raw binary data is represented by distinct `bytes` objects.'
  },
  {
    id: 'py-39',
    subject: 'python',
    topic: 'Dictionary Comprehension',
    question: 'What does `{k: k**2 for k in range(3)}` construct in Python?',
    options: ['`{0: 0, 1: 1, 2: 4}`', '`{1: 1, 2: 4, 3: 9}`', '`[0, 1, 4]`', '`{(0, 0), (1, 1), (2, 4)}`'],
    correctIndex: 0,
    explanation: 'A dictionary comprehension builds key-value pairs. For k in 0, 1, 2, it evaluates to 0:0, 1:1, and 2:4.'
  },
  {
    id: 'py-40',
    subject: 'python',
    topic: 'Type Hints',
    question: 'What does Python do at runtime if a function receives arguments that violate its type annotations (e.g. `def add(x: int, y: int) -> int:`)?',
    options: [
      'Nothing; Python does not enforce type annotations at runtime; it executes normally without errors',
      'Throws a TypeError before entering the function',
      'Attempts automatic type casting into integers',
      'Terminates the Python interpreter'
    ],
    correctIndex: 0,
    explanation: 'Python type hints are purely informational metadata stored in `__annotations__`. Python’s runtime remains dynamically typed and ignores type hints (static tools like mypy or pyright check them separately).'
  }
];

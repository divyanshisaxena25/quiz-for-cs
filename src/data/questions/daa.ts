import { Question } from '../../types';

export const DAA_QUESTIONS: Question[] = [
  {
    id: 'daa-1',
    subject: 'daa',
    topic: 'Asymptotic Analysis',
    question: 'What is the tight bound time complexity of Merge Sort in the worst case for an array of size n?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctIndex: 1,
    explanation: 'Merge sort follows the recurrence T(n) = 2T(n/2) + O(n). By the Master Theorem, this evaluates strictly to Θ(n log n) across best, average, and worst cases.'
  },
  {
    id: 'daa-2',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'Which algorithm is suitable for finding the single-source shortest path in a directed graph containing negative edge weights (provided there is no negative cycle)?',
    options: ['Dijkstra’s Algorithm', 'Bellman-Ford Algorithm', 'Prim’s Algorithm', 'Kruskal’s Algorithm'],
    correctIndex: 1,
    explanation: 'Dijkstra’s greedy approach can fail with negative weights because once a vertex is marked settled, its distance is never reconsidered. Bellman-Ford relaxes all edges |V|-1 times and reliably handles negative weights and detects negative cycles.'
  },
  {
    id: 'daa-3',
    subject: 'daa',
    topic: 'Greedy Strategy',
    question: 'In the Fractional Knapsack problem, which greedy criteria yields the optimal maximum value?',
    options: [
      'Selecting items with maximum weight first',
      'Selecting items with maximum value first',
      'Selecting items with highest value-to-weight ratio (v_i / w_i)',
      'Selecting items in the order they appear in the list'
    ],
    correctIndex: 2,
    explanation: 'The Fractional Knapsack problem exhibits the greedy-choice property when sorting items in decreasing order of their value-to-weight density (v_i / w_i).'
  },
  {
    id: 'daa-4',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'What are the two essential characteristics a problem must exhibit to be solved optimally via Dynamic Programming?',
    options: [
      'Divide and conquer structure and randomized pivots',
      'Optimal substructure and overlapping subproblems',
      'Greedy choice property and polynomial bounds',
      'Monotonic stack and acyclic topology'
    ],
    correctIndex: 1,
    explanation: 'Dynamic Programming applies when a problem has optimal substructure (optimal solution contains optimal sub-solutions) and overlapping subproblems (the same subproblems are solved repeatedly and can be memoized).'
  },
  {
    id: 'daa-5',
    subject: 'daa',
    topic: 'Sorting Algorithms',
    question: 'What is the worst-case time complexity of Quick Sort, and under what condition does it typically occur?',
    options: [
      'O(n log n) when the array is randomly shuffled',
      'O(n²) when the pivot chosen is consistently the extreme (smallest or largest) element',
      'O(n) when all elements are distinct',
      'O(n log² n) when the input size is a power of 2'
    ],
    correctIndex: 1,
    explanation: 'When the partition algorithm repeatedly yields one subproblem of size n-1 and one of size 0 (e.g. sorted array with last element as pivot), the recurrence becomes T(n) = T(n-1) + O(n), giving O(n²).'
  },
  {
    id: 'daa-6',
    subject: 'daa',
    topic: 'Minimum Spanning Trees',
    question: 'What data structure is utilized in Kruskal’s Algorithm to detect cycles efficiently when adding edges?',
    options: ['Segment Tree', 'Disjoint Set Union (Union-Find)', 'Binomial Heap', 'Suffix Automaton'],
    correctIndex: 1,
    explanation: 'Kruskal’s algorithm sorts all edges by weight and uses Disjoint Set Union (with union by rank and path compression) to determine in near-O(1) time whether endpoints belong to the same component.'
  },
  {
    id: 'daa-7',
    subject: 'daa',
    topic: 'Recurrence Relations',
    question: 'According to the Master Theorem, what is the solution to the recurrence T(n) = 4T(n/2) + n?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
    correctIndex: 2,
    explanation: 'For T(n) = aT(n/b) + f(n), here a = 4, b = 2. Log_b(a) = log_2(4) = 2. Since f(n) = n = O(n^(2 - ε)) for ε = 1, case 1 applies, yielding T(n) = Θ(n^2).'
  },
  {
    id: 'daa-8',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'What is the time complexity of the Floyd-Warshall algorithm for finding all-pairs shortest paths in a graph with V vertices?',
    options: ['O(V)', 'O(V log V)', 'O(V²)', 'O(V³)'],
    correctIndex: 3,
    explanation: 'Floyd-Warshall uses three nested loops over vertices 1 to V to update distance matrix entries D[i][j] = min(D[i][j], D[i][k] + D[k][j]), giving a time complexity of Θ(V³).'
  },
  {
    id: 'daa-9',
    subject: 'daa',
    topic: 'Complexity Classes',
    question: 'A decision problem is said to be in the class NP if:',
    options: [
      'It cannot be solved on any computer',
      'A proposed solution can be verified in polynomial time by a deterministic Turing machine',
      'It can be solved in non-polynomial time only',
      'It is strictly harder than Halting problem'
    ],
    correctIndex: 1,
    explanation: 'Class NP (Nondeterministic Polynomial time) contains decision problems for which any certificate/proof of a "YES" instance can be verified in deterministic polynomial time.'
  },
  {
    id: 'daa-10',
    subject: 'daa',
    topic: 'Complexity Classes',
    question: 'What is the condition for a problem L to be classified as NP-Complete?',
    options: [
      'L is in P and also in NP',
      'L is in NP and every problem in NP is polynomial-time reducible to L',
      'L cannot be verified in polynomial time',
      'L requires exponential memory'
    ],
    correctIndex: 1,
    explanation: 'A problem L is NP-Complete if: (1) L ∈ NP, and (2) L is NP-Hard (i.e., every problem in NP can be reduced to L in polynomial time).'
  },
  {
    id: 'daa-11',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'What is the time complexity of solving the Longest Common Subsequence (LCS) problem for two strings of lengths m and n using DP?',
    options: ['O(m + n)', 'O(m × n)', 'O(2^(m+n))', 'O(m log n)'],
    correctIndex: 1,
    explanation: 'LCS uses an (m+1) x (n+1) table where each cell dp[i][j] takes constant time O(1) to compute, giving total time and space complexity of O(m × n).'
  },
  {
    id: 'daa-12',
    subject: 'daa',
    topic: 'Backtracking',
    question: 'The N-Queens problem is classic illustration of which algorithmic paradigm?',
    options: ['Greedy Algorithm', 'Backtracking (Depth-First Search with pruning)', 'Divide and Conquer', 'Linear Programming'],
    correctIndex: 1,
    explanation: 'N-Queens builds candidates row-by-row and immediately abandons (backtracks from) any partial configuration that violates non-attacking constraints.'
  },
  {
    id: 'daa-13',
    subject: 'daa',
    topic: 'Sorting Algorithms',
    question: 'Which of the following sorting algorithms is inherently NOT comparison-based?',
    options: ['Heap Sort', 'Radix Sort', 'Quick Sort', 'Insertion Sort'],
    correctIndex: 1,
    explanation: 'Radix Sort sorts elements digit by digit using counting or bucket sort without comparing keys directly against each other, allowing it to bypass the Ω(n log n) comparison lower bound.'
  },
  {
    id: 'daa-14',
    subject: 'daa',
    topic: 'Sorting Lower Bounds',
    question: 'What is the theoretical lower bound on the number of comparisons required to sort n elements in the worst case using any comparison-based algorithm?',
    options: ['Ω(n)', 'Ω(log n)', 'Ω(n log n)', 'Ω(n²)'],
    correctIndex: 2,
    explanation: 'A decision tree for comparison sorting must have at least n! leaves to represent all permutations. The minimum height of the binary decision tree is log2(n!) = Θ(n log n).'
  },
  {
    id: 'daa-15',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'What is the runtime of Dijkstra’s Algorithm implemented with a Min-Heap (Binary Heap) on a graph with V vertices and E edges?',
    options: ['O(V²)', 'O((V + E) log V)', 'O(E²)', 'O(V × E)'],
    correctIndex: 1,
    explanation: 'With a binary heap, each vertex extraction takes O(log V) and each edge relaxation may trigger a decrease-key in O(log V), yielding O((V + E) log V).'
  },
  {
    id: 'daa-16',
    subject: 'daa',
    topic: 'Greedy Strategy',
    question: 'In Huffman Coding, what type of tree is generated to construct optimal prefix codes?',
    options: ['Full Binary Tree', 'Complete Ternary Tree', 'Red-Black Tree', 'B-Tree'],
    correctIndex: 0,
    explanation: 'Huffman algorithm merges the two lowest frequency nodes repeatedly, resulting in a full (strictly) binary tree where every non-leaf node has exactly two children.'
  },
  {
    id: 'daa-17',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'In the Matrix Chain Multiplication problem for multiplying matrices A1, A2, ..., An, what is the optimal time complexity using DP?',
    options: ['O(n)', 'O(n²)', 'O(n³)', 'O(2^n)'],
    correctIndex: 2,
    explanation: 'The DP algorithm considers chain lengths from 2 to n and iterates over all split points k between i and j. There are O(n²) subproblems, each evaluating up to n splits, leading to O(n³) runtime.'
  },
  {
    id: 'daa-18',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'Topological sorting is defined exclusively for which class of graphs?',
    options: [
      'Undirected Connected Graphs',
      'Directed Acyclic Graphs (DAG)',
      'Complete Graphs with Euler Tours',
      'Bipartite Graphs only'
    ],
    correctIndex: 1,
    explanation: 'Topological sort produces a linear ordering of vertices such that for every directed edge u -> v, u comes before v. If a graph contains a cycle, no such linear ordering exists; thus it is only valid on DAGs.'
  },
  {
    id: 'daa-19',
    subject: 'daa',
    topic: 'String Matching',
    question: 'What auxiliary table is precomputed in the Knuth-Morris-Pratt (KMP) pattern matching algorithm?',
    options: ['Prefix Table (π or LPS array)', 'Hash Table of Substrings', 'Suffix Automaton Table', 'Frequency Matrix'],
    correctIndex: 0,
    explanation: 'KMP precomputes the Longest Proper Prefix which is also Suffix (LPS array), which allows the text pointer to never backtrack when a mismatch occurs.'
  },
  {
    id: 'daa-20',
    subject: 'daa',
    topic: 'String Matching',
    question: 'What is the worst-case time complexity of the KMP algorithm for searching a pattern of length m in a text of length n?',
    options: ['O(m × n)', 'O(m + n)', 'O(n log m)', 'O(2^m)'],
    correctIndex: 1,
    explanation: 'Precomputing the LPS array takes O(m) time and searching the text takes O(n) time, resulting in an optimal worst-case bound of O(m + n).'
  },
  {
    id: 'daa-21',
    subject: 'daa',
    topic: 'Heap & Priority Queue',
    question: 'What is the time complexity to build a binary max-heap from an unsorted array of n elements using the bottom-up Heapify approach?',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
    correctIndex: 1,
    explanation: 'Although inserting n elements one-by-one takes O(n log n), calling max-heapify bottom-up sums the heights: ∑ (h/2^h), which converges mathematically to linear time O(n).'
  },
  {
    id: 'daa-22',
    subject: 'daa',
    topic: 'Divide and Conquer',
    question: 'Strassen’s matrix multiplication algorithm multiplies two n × n matrices by computing how many sub-matrix multiplications instead of 8?',
    options: ['5', '6', '7', '9'],
    correctIndex: 2,
    explanation: 'Standard divide-and-conquer matrix multiplication does 8 recursive calls, yielding O(n^3). Strassen cleverly combines submatrices to use only 7 multiplications, giving O(n^(log2 7)) ≈ O(n^2.807).'
  },
  {
    id: 'daa-23',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'In Breadth-First Search (BFS) on an unweighted graph, which data structure is used to manage frontier nodes?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Disjoint Set'],
    correctIndex: 1,
    explanation: 'BFS explores vertices in order of their distance from the source using a First-In-First-Out (FIFO) queue, guaranteeing discovery of shortest paths in unweighted graphs.'
  },
  {
    id: 'daa-24',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'What algorithm is commonly used to find strongly connected components (SCCs) of a directed graph in linear time?',
    options: ['Kosaraju’s or Tarjan’s Algorithm', 'Kruskal’s Algorithm', 'Floyd-Warshall Algorithm', 'Boruvka’s Algorithm'],
    correctIndex: 0,
    explanation: 'Both Kosaraju’s algorithm (using graph transposition and two DFS passes) and Tarjan’s algorithm (using low-link values in a single DFS pass) compute SCCs in O(V + E) time.'
  },
  {
    id: 'daa-25',
    subject: 'daa',
    topic: 'Complexity Classes',
    question: 'Which of the following problems is proven to be NP-Complete?',
    options: ['Shortest Path with non-negative weights', 'Minimum Spanning Tree', '0/1 Knapsack Decision Problem', 'Fractional Knapsack'],
    correctIndex: 2,
    explanation: 'The 0/1 Knapsack decision problem is NP-Complete (solvable in pseudo-polynomial time via DP). In contrast, Fractional Knapsack, MST, and Shortest Path are in P.'
  },
  {
    id: 'daa-26',
    subject: 'daa',
    topic: 'Asymptotic Notation',
    question: 'If f(n) = O(g(n)), which formal statement is mathematically true?',
    options: [
      'f(n) grows strictly faster than g(n)',
      'There exist positive constants c and n0 such that 0 ≤ f(n) ≤ c × g(n) for all n ≥ n0',
      'f(n) ≥ c × g(n) for all n ≥ n0',
      'limit as n approaches infinity of f(n)/g(n) is infinity'
    ],
    correctIndex: 1,
    explanation: 'Big-O describes an asymptotic upper bound: f(n) = O(g(n)) means f(n) is bounded from above by c * g(n) for all sufficiently large n.'
  },
  {
    id: 'daa-27',
    subject: 'daa',
    topic: 'Asymptotic Notation',
    question: 'What does the notation f(n) = Ω(g(n)) represent?',
    options: ['Asymptotic Upper Bound', 'Asymptotic Lower Bound', 'Strict Tight Bound', 'Average Case Only'],
    correctIndex: 1,
    explanation: 'Big-Omega (Ω) represents an asymptotic lower bound: there exist positive constants c and n0 such that f(n) ≥ c * g(n) for all n ≥ n0.'
  },
  {
    id: 'daa-28',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'What is the difference between Memoization and Tabulation in Dynamic Programming?',
    options: [
      'Memoization is top-down using recursion and caching; Tabulation is bottom-up iterative table filling',
      'Memoization uses more time than tabulation always',
      'Tabulation cannot solve problems with optimal substructure',
      'Memoization does not store intermediate answers'
    ],
    correctIndex: 0,
    explanation: 'Memoization solves top-down recursively and caches subproblem results on demand. Tabulation starts from the base cases and computes values iteratively up to the target state.'
  },
  {
    id: 'daa-29',
    subject: 'daa',
    topic: 'Amortized Analysis',
    question: 'What is the amortized cost of inserting an element into a dynamic array (like C++ vector or Python list) that doubles in capacity when full?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 0,
    explanation: 'Although the rare resizing step copies n elements taking O(n), this cost is distributed across the preceding n/2 insertions, yielding an amortized constant cost of O(1) per append.'
  },
  {
    id: 'daa-30',
    subject: 'daa',
    topic: 'Backtracking',
    question: 'In Branch and Bound, how does the algorithm prune branches that cannot produce an optimal solution?',
    options: [
      'By picking a random leaf node',
      'By comparing the bound value of a subproblem against the best known solution so far',
      'By converting the problem into a tree with no cycles',
      'By inverting the objective function'
    ],
    correctIndex: 1,
    explanation: 'Branch and Bound computes an optimistic bound (lower bound for minimization, upper for maximization) at each node. If the bound is worse than the current best known solution, that entire subtree is pruned.'
  },
  {
    id: 'daa-31',
    subject: 'daa',
    topic: 'Divide and Conquer',
    question: 'Binary Search on a sorted array of length n has a recurrence relation of:',
    options: ['T(n) = T(n/2) + O(1)', 'T(n) = 2T(n/2) + O(1)', 'T(n) = T(n-1) + O(1)', 'T(n) = T(n/2) + O(n)'],
    correctIndex: 0,
    explanation: 'Binary search divides the search space in half and does constant work O(1) to compare the target with the middle element, giving T(n) = T(n/2) + O(1) = O(log n).'
  },
  {
    id: 'daa-32',
    subject: 'daa',
    topic: 'Greedy Strategy',
    question: 'In the Activity Selection problem with sorted finish times f1 ≤ f2 ≤ ... ≤ fn, which activity is greedily chosen first?',
    options: [
      'The activity with the latest start time',
      'The activity with the earliest finish time',
      'The activity with the longest duration',
      'The activity with the highest index'
    ],
    correctIndex: 1,
    explanation: 'Choosing the activity with the earliest finish time leaves the maximum remaining time available for subsequent non-overlapping activities, ensuring an optimal solution.'
  },
  {
    id: 'daa-33',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'Can the 0/1 Knapsack problem with arbitrary real-number weights be solved in polynomial time via Dynamic Programming?',
    options: [
      'Yes, always in O(nW)',
      'No, the standard DP works only for integer weights and is pseudo-polynomial',
      'Yes, by sorting real weights',
      'No, because 0/1 Knapsack is in class P'
    ],
    correctIndex: 1,
    explanation: 'The standard DP table has dimensions [n+1][W+1] which requires W to be an integer. The complexity O(nW) is pseudo-polynomial because it depends on the numerical value of W, not the number of bits.'
  },
  {
    id: 'daa-34',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'What is the maximum flow value equal to in a flow network according to the Max-Flow Min-Cut theorem?',
    options: [
      'The total number of edges in the network',
      'The capacity of the minimum s-t cut',
      'The sum of all edge capacities',
      'The degree of the sink node'
    ],
    correctIndex: 1,
    explanation: 'The Ford-Fulkerson theorem (Max-Flow Min-Cut) proves that the maximum amount of flow passing from source to sink is strictly equal to the capacity of the minimum cut separating source and sink.'
  },
  {
    id: 'daa-35',
    subject: 'daa',
    topic: 'Complexity Classes',
    question: 'Which of the following is known to be true regarding the relationship between classes P and NP?',
    options: ['P ⊆ NP', 'NP ⊆ P', 'P ∩ NP = ∅', 'NP is a subset of P-Complete'],
    correctIndex: 0,
    explanation: 'Any problem solvable in polynomial time can trivially be verified in polynomial time by simply executing the solver and checking the output. Hence P is a subset of NP.'
  },
  {
    id: 'daa-36',
    subject: 'daa',
    topic: 'Sorting Algorithms',
    question: 'What is a "stable" sorting algorithm?',
    options: [
      'An algorithm that uses O(1) auxiliary space',
      'An algorithm that preserves the relative order of elements with equal keys',
      'An algorithm that never exceeds O(n log n) runtime',
      'An algorithm that cannot crash on null inputs'
    ],
    correctIndex: 1,
    explanation: 'Stability means that if two items compare as equal, their relative order in the output list matches their original order in the input list (e.g. Merge Sort is stable, standard Heap Sort is not).'
  },
  {
    id: 'daa-37',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'What is an Articulation Point (Cut Vertex) in a connected undirected graph?',
    options: [
      'A vertex whose removal increases the number of connected components of the graph',
      'A vertex with odd degree',
      'A vertex adjacent to all other vertices',
      'A leaf node in a spanning tree'
    ],
    correctIndex: 0,
    explanation: 'An articulation point or cut vertex is any vertex whose removal (along with its incident edges) disconnects the remaining graph into two or more components.'
  },
  {
    id: 'daa-38',
    subject: 'daa',
    topic: 'Graph Algorithms',
    question: 'Prim’s algorithm and Kruskal’s algorithm both find the Minimum Spanning Tree. How do their strategies differ fundamentally?',
    options: [
      'Prim grows a single contiguous tree vertex by vertex; Kruskal adds edges globally in weight order across a forest',
      'Prim works only on directed graphs; Kruskal on undirected graphs',
      'Kruskal cannot handle disconnected graphs',
      'Prim is dynamic programming; Kruskal is divide-and-conquer'
    ],
    correctIndex: 0,
    explanation: 'Prim maintains a growing connected component and repeatedly adds the minimum weight cut-edge incident to it. Kruskal sorts all edges globally and adds safe edges anywhere in the forest that do not create cycles.'
  },
  {
    id: 'daa-39',
    subject: 'daa',
    topic: 'Randomized Algorithms',
    question: 'What is the difference between a Las Vegas algorithm and a Monte Carlo algorithm?',
    options: [
      'Las Vegas always produces the correct answer with random runtime; Monte Carlo runs in deterministic time with a small probability of error',
      'Las Vegas algorithms use floating point numbers; Monte Carlo uses integers',
      'Monte Carlo always finds the exact optimal solution',
      'Las Vegas algorithms only run on quantum hardware'
    ],
    correctIndex: 0,
    explanation: 'Las Vegas randomized algorithms (e.g., Randomized QuickSort) never compromise correctness but have variable runtime. Monte Carlo algorithms have bounded runtime but output answers with a bounded probability of error.'
  },
  {
    id: 'daa-40',
    subject: 'daa',
    topic: 'Dynamic Programming',
    question: 'In the Bellman-Ford algorithm, why is the edge relaxation loop executed exactly |V| - 1 times?',
    options: [
      'Because the shortest simple path in a graph with |V| vertices can contain at most |V| - 1 edges',
      'Because graphs cannot have more than |V| - 1 edges',
      'To prevent floating-point underflow',
      'Because trees always have |V| edges'
    ],
    correctIndex: 0,
    explanation: 'In any graph without negative weight cycles, the shortest simple path between any two vertices visits at most |V| vertices, hence contains at most |V| - 1 edges. Each round of relaxation guarantees finding shortest paths that use one additional edge.'
  }
];

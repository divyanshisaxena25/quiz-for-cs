import { Question } from '../../types';

export const DBMS_QUESTIONS: Question[] = [
  {
    id: 'dbms-1',
    subject: 'dbms',
    topic: 'Relational Model',
    question: 'In the relational model, what is the term used to denote a row in a table?',
    options: ['Attribute', 'Tuple', 'Domain', 'Relation'],
    correctIndex: 1,
    explanation: 'In relational algebra and RDBMS terminology, a row of a relation is called a tuple, while columns are referred to as attributes, and the table itself is a relation.'
  },
  {
    id: 'dbms-2',
    subject: 'dbms',
    topic: 'ACID Properties',
    question: 'Which ACID property guarantees that all operations within a work unit are completed successfully or none are saved?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 0,
    explanation: 'Atomicity follows the "all-or-nothing" rule: either all operations of the transaction are committed to the database or the entire transaction is rolled back upon failure.'
  },
  {
    id: 'dbms-3',
    subject: 'dbms',
    topic: 'Normalization',
    question: 'A relation is said to be in Second Normal Form (2NF) if it is in 1NF and what condition is met?',
    options: [
      'It contains no transitive dependencies',
      'No non-prime attribute is partially dependent on any candidate key',
      'Every determinant is a super key',
      'Multivalued dependencies are eliminated'
    ],
    correctIndex: 1,
    explanation: '2NF requires that the relation is in 1NF and there is no partial dependency—every non-prime attribute must be fully functionally dependent on the entire primary/candidate key.'
  },
  {
    id: 'dbms-4',
    subject: 'dbms',
    topic: 'Normalization',
    question: 'Which normal form is strictly defined such that for every non-trivial functional dependency X -> Y, X must be a super key?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctIndex: 3,
    explanation: 'Boyce-Codd Normal Form (BCNF) is a stricter version of 3NF requiring that every determinant X in any non-trivial functional dependency X -> Y must be a super key.'
  },
  {
    id: 'dbms-5',
    subject: 'dbms',
    topic: 'Keys',
    question: 'What is a minimal super key called in database management systems?',
    options: ['Primary Key', 'Foreign Key', 'Candidate Key', 'Composite Key'],
    correctIndex: 2,
    explanation: 'A candidate key is defined as a minimal super key—a set of attributes that uniquely identifies tuples such that no proper subset has the uniqueness property.'
  },
  {
    id: 'dbms-6',
    subject: 'dbms',
    topic: 'Transactions',
    question: 'In the Two-Phase Locking (2PL) protocol, what occurs during the shrinking phase?',
    options: [
      'New locks may be acquired but no locks can be released',
      'Locks may only be released and no new locks can be acquired',
      'All locks are converted to shared locks',
      'Deadlocks are resolved automatically'
    ],
    correctIndex: 1,
    explanation: 'Under the 2PL protocol, once a transaction enters the shrinking phase by releasing any lock, it is strictly prohibited from acquiring any new locks.'
  },
  {
    id: 'dbms-7',
    subject: 'dbms',
    topic: 'Concurrency Control',
    question: 'What is a "dirty read" anomaly in database transactions?',
    options: [
      'Reading data that has been modified by an uncommitted transaction',
      'Reading the same row twice and obtaining different values',
      'A query re-executes and finds rows inserted by another transaction',
      'Two transactions simultaneously updating the same record'
    ],
    correctIndex: 0,
    explanation: 'A dirty read occurs when Transaction A reads data modified by Transaction B before Transaction B commits. If Transaction B then rolls back, Transaction A worked with invalid (dirty) data.'
  },
  {
    id: 'dbms-8',
    subject: 'dbms',
    topic: 'SQL',
    question: 'Which SQL clause is used to filter the groups created by the GROUP BY clause?',
    options: ['WHERE', 'ORDER BY', 'HAVING', 'FILTER'],
    correctIndex: 2,
    explanation: 'The WHERE clause filters individual rows before aggregation, whereas the HAVING clause filters aggregated groups after the GROUP BY operation.'
  },
  {
    id: 'dbms-9',
    subject: 'dbms',
    topic: 'Indexing',
    question: 'What is the primary architectural benefit of a B+ Tree index over a standard B-Tree index in DBMS?',
    options: [
      'B+ Trees store all satellite data records only in leaf nodes, making range queries faster',
      'B+ Trees require less disk space for deep branches',
      'B+ Trees do not require balancing operations upon insertion',
      'B+ Trees store duplicate keys in root nodes'
    ],
    correctIndex: 0,
    explanation: 'In a B+ Tree, internal nodes only store navigation keys, while all actual data pointers/records reside in leaf nodes, linked together sequentially for ultra-efficient range traversals.'
  },
  {
    id: 'dbms-10',
    subject: 'dbms',
    topic: 'Relational Algebra',
    question: 'Which relational algebra operation selects rows that satisfy a specified predicate condition?',
    options: ['Projection (π)', 'Selection (σ)', 'Cartesian Product (×)', 'Join (⋈)'],
    correctIndex: 1,
    explanation: 'The Selection operator (represented by Greek letter sigma σ) extracts tuples (rows) that satisfy a given boolean predicate condition.'
  },
  {
    id: 'dbms-11',
    subject: 'dbms',
    topic: 'Relational Algebra',
    question: 'Which relational algebra operation outputs only designated vertical columns (attributes) from a relation?',
    options: ['Selection (σ)', 'Projection (π)', 'Division (÷)', 'Rename (ρ)'],
    correctIndex: 1,
    explanation: 'Projection (represented by Greek letter pi π) performs vertical slicing, returning only the specified attributes while eliminating duplicate tuples.'
  },
  {
    id: 'dbms-12',
    subject: 'dbms',
    topic: 'Integrity Constraints',
    question: 'Referential integrity constraint is enforced through the use of which database mechanism?',
    options: ['Primary Key', 'Foreign Key', 'Check Constraint', 'Unique Index'],
    correctIndex: 1,
    explanation: 'Referential integrity requires that any value of a foreign key in a referencing table must match a valid primary key value in the referenced table or be NULL.'
  },
  {
    id: 'dbms-13',
    subject: 'dbms',
    topic: 'Storage & File Structure',
    question: 'What is a clustered index in a relational database engine?',
    options: [
      'An index where the physical order of data rows on disk matches the indexed order',
      'An index constructed on multiple non-contiguous tables',
      'An index that only indexes foreign keys',
      'A non-dense hash index used for in-memory joins'
    ],
    correctIndex: 0,
    explanation: 'A clustered index determines the actual physical storage order of records in a table on disk. Because rows can only be ordered physically in one way, each table can have only one clustered index.'
  },
  {
    id: 'dbms-14',
    subject: 'dbms',
    topic: 'Recovery System',
    question: 'Which logging protocol mandates that log records must be written to stable storage before corresponding database disk blocks are updated?',
    options: ['Shadow Paging', 'Write-Ahead Logging (WAL)', 'Deferred Modification', 'Immediate Checkpoint'],
    correctIndex: 1,
    explanation: 'The Write-Ahead Logging (WAL) protocol dictates that log records recording any change must be flushed to stable storage before the dirty data page itself is written to disk.'
  },
  {
    id: 'dbms-15',
    subject: 'dbms',
    topic: 'Serializability',
    question: 'Which graph is constructed to test whether a concurrent transaction schedule is conflict serializable?',
    options: ['Precedence (Serialization) Graph', 'Wait-For Graph', 'Bipartite Graph', 'Spanning Tree'],
    correctIndex: 0,
    explanation: 'A Precedence Graph (or Serialization Graph) has transactions as vertices and directed edges for conflicting operations. The schedule is conflict serializable if and only if this graph is acyclic.'
  },
  {
    id: 'dbms-16',
    subject: 'dbms',
    topic: 'Deadlocks',
    question: 'In deadlock prevention, what does the Wait-Die scheme specify when an older transaction requests a lock held by a younger transaction?',
    options: [
      'The older transaction is allowed to wait',
      'The older transaction dies and aborts',
      'The younger transaction dies and aborts',
      'Both transactions roll back immediately'
    ],
    correctIndex: 0,
    explanation: 'In the Wait-Die scheme (non-preemptive): if an older transaction requests a resource held by a younger one, it is allowed to wait; if a younger transaction requests a resource from an older one, it dies (aborts).'
  },
  {
    id: 'dbms-17',
    subject: 'dbms',
    topic: 'SQL Joins',
    question: 'What does a FULL OUTER JOIN return in SQL?',
    options: [
      'Only rows where there is a match in both tables',
      'All rows from the left table and matched rows from the right',
      'All rows when there is a match in either left or right table, filling missing matches with NULL',
      'The Cartesian cross-product without NULL values'
    ],
    correctIndex: 2,
    explanation: 'FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins, returning all matching rows plus unmatched rows from both tables with NULLs in corresponding columns.'
  },
  {
    id: 'dbms-18',
    subject: 'dbms',
    topic: 'Normalization',
    question: 'What is a transitive functional dependency in the context of relational databases?',
    options: [
      'When an attribute functionally determines a candidate key',
      'When X -> Y and Y -> Z, where Y is not a candidate key and X -> Z holds indirectly',
      'When an attribute depends on a composite key partially',
      'When two attributes determine each other mutually'
    ],
    correctIndex: 1,
    explanation: 'A transitive dependency occurs when non-key attribute A determines non-key attribute B, while the primary key determines A. Thus, primary key -> B is transitive, violating 3NF.'
  },
  {
    id: 'dbms-19',
    subject: 'dbms',
    topic: 'Transaction Isolation',
    question: 'Which ANSI SQL transaction isolation level prevents dirty reads, non-repeatable reads, AND phantom reads?',
    options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
    correctIndex: 3,
    explanation: 'Serializable is the highest isolation level. It executes transactions concurrently with the guarantee of yielding the same outcome as if they executed serially, eliminating all three concurrency phenomena.'
  },
  {
    id: 'dbms-20',
    subject: 'dbms',
    topic: 'View Mechanisms',
    question: 'What is a Materialized View in DBMS?',
    options: [
      'A temporary stored query that runs on every page refresh without saving results',
      'A view whose calculated query results are physically persisted on disk and periodically refreshed',
      'A view that cannot be indexed',
      'A client-side JavaScript representation of a table'
    ],
    correctIndex: 1,
    explanation: 'Unlike a standard virtual view which runs its underlying SQL query on every call, a materialized view physically stores the query result on disk, offering much faster read access for expensive aggregations.'
  },
  {
    id: 'dbms-21',
    subject: 'dbms',
    topic: 'ER Modeling',
    question: 'In an Entity-Relationship (ER) diagram, how is a weak entity set depicted?',
    options: ['Single Rectangle', 'Double Rectangle', 'Dashed Ellipse', 'Double Diamond'],
    correctIndex: 1,
    explanation: 'In standard Chen ER notation, strong entity sets are drawn as single rectangles, whereas weak entity sets (which lack a primary key of their own) are drawn as double rectangles.'
  },
  {
    id: 'dbms-22',
    subject: 'dbms',
    topic: 'ER Modeling',
    question: 'How is an identifying relationship associated with a weak entity set represented in an ER diagram?',
    options: ['Double Diamond', 'Dashed Triangle', 'Hexagon', 'Circle'],
    correctIndex: 0,
    explanation: 'The relationship connecting a weak entity set to its identifying (owner) entity set is termed an identifying relationship and is represented by a double diamond.'
  },
  {
    id: 'dbms-23',
    subject: 'dbms',
    topic: 'Functional Dependency',
    question: 'According to Armstrong’s Axioms, what does the Augmentation rule state?',
    options: [
      'If X -> Y, then XZ -> YZ for any set of attributes Z',
      'If X -> Y and Y -> Z, then X -> Z',
      'If X -> Y, then Y -> X',
      'If X -> YZ, then X -> Y and X -> Z'
    ],
    correctIndex: 0,
    explanation: 'The Augmentation rule states that if functional dependency X -> Y holds, then adding attribute set Z to both sides (XZ -> YZ) will also hold.'
  },
  {
    id: 'dbms-24',
    subject: 'dbms',
    topic: 'Hashing',
    question: 'What is the primary disadvantage of Static Hashing when data volume expands rapidly?',
    options: [
      'Bucket overflow chains lead to degraded search time performance of O(N)',
      'Hash keys cannot store alphabetical characters',
      'Primary keys cannot be hashed',
      'Data cannot be deleted from static buckets'
    ],
    correctIndex: 0,
    explanation: 'In static hashing, the number of allocated buckets is fixed. When records exceed bucket capacity, overflow buckets must be chained, degrading search complexity from O(1) toward O(N).'
  },
  {
    id: 'dbms-25',
    subject: 'dbms',
    topic: 'Query Optimization',
    question: 'During relational query optimization, what heuristic rule should typically be applied as early as possible?',
    options: [
      'Perform Cartesian products before selections',
      'Perform Selection (σ) and Projection (π) operations early to reduce intermediate relation sizes',
      'Perform Cross joins before WHERE filters',
      'Delay all projections until the final display step'
    ],
    correctIndex: 1,
    explanation: 'Pushing selections and projections down the query tree ("early evaluation") reduces the cardinality and tuple width of intermediate relations, saving substantial CPU and memory during subsequent joins.'
  },
  {
    id: 'dbms-26',
    subject: 'dbms',
    topic: 'SQL DDL vs DML',
    question: 'Which of the following SQL statements is categorized as Data Definition Language (DDL)?',
    options: ['SELECT', 'UPDATE', 'TRUNCATE', 'INSERT'],
    correctIndex: 2,
    explanation: 'TRUNCATE is a DDL command that deallocates data pages of a table directly, whereas SELECT, UPDATE, and INSERT are DML (Data Manipulation Language) commands.'
  },
  {
    id: 'dbms-27',
    subject: 'dbms',
    topic: 'ACID Properties',
    question: 'Which database subsystem is primarily responsible for ensuring the Durability property of transactions?',
    options: ['Query Processor', 'Recovery Management Component (Log Manager)', 'Buffer Pool Allocator', 'Parser Engine'],
    correctIndex: 1,
    explanation: 'The Recovery Manager ensures durability by maintaining logs and checkpoints so that once a transaction commits, its effects survive any system crash or power failure.'
  },
  {
    id: 'dbms-28',
    subject: 'dbms',
    topic: 'Relational Calculus',
    question: 'What is the foundational difference between Relational Algebra and Tuple Relational Calculus (TRC)?',
    options: [
      'Relational Algebra is procedural (how to obtain results), while TRC is non-procedural (what results are desired)',
      'Relational Algebra cannot express joins',
      'TRC can only be computed with recursive queries',
      'Relational Algebra requires physical disk locations'
    ],
    correctIndex: 0,
    explanation: 'Relational algebra is a procedural query language specifying an operational order of evaluation, while TRC is declarative (non-procedural), describing desired conditions without specifying the evaluation recipe.'
  },
  {
    id: 'dbms-29',
    subject: 'dbms',
    topic: 'Indexing',
    question: 'What is a Sparse Index in file organization?',
    options: [
      'An index that has an index entry for every single search-key value in the data file',
      'An index that contains index records for only some of the search-key values (e.g., one per disk block)',
      'An index stored exclusively in random access memory',
      'An index that contains no key attributes'
    ],
    correctIndex: 1,
    explanation: 'A sparse index only stores an entry for some search keys (typically the first record of each block), consuming less memory than a dense index at the cost of slight additional scanning.'
  },
  {
    id: 'dbms-30',
    subject: 'dbms',
    topic: 'Transactions',
    question: 'What is a Cascading Abort (or Cascading Rollback)?',
    options: [
      'When an aborted transaction triggers the rollback of subsequent transactions that read its uncommitted data',
      'When a deadlock detector cancels all transactions simultaneously',
      'When the database engine restarts automatically',
      'When primary key values are updated in cascade'
    ],
    correctIndex: 0,
    explanation: 'Cascading rollback occurs when failure of transaction T1 necessitates rolling back transaction T2 because T2 read uncommitted values produced by T1. Protocols aim to be cascadeless to avoid this overhead.'
  },
  {
    id: 'dbms-31',
    subject: 'dbms',
    topic: 'Locking Protocols',
    question: 'What distinguishes Strict Two-Phase Locking (Strict 2PL) from standard 2PL?',
    options: [
      'Strict 2PL requires holding all exclusive (X) locks until the transaction commits or aborts',
      'Strict 2PL releases all locks immediately upon reading',
      'Strict 2PL does not use shared locks',
      'Strict 2PL allows acquiring locks during the shrinking phase'
    ],
    correctIndex: 0,
    explanation: 'Strict 2PL guarantees cascadeless recoverable schedules by holding all exclusive (write) locks until the transaction terminates (commit or abort).'
  },
  {
    id: 'dbms-32',
    subject: 'dbms',
    topic: 'Normalization',
    question: 'Which normal form is designed to eliminate multivalued dependencies (MVDs)?',
    options: ['2NF', '3NF', '4NF', '5NF'],
    correctIndex: 2,
    explanation: 'Fourth Normal Form (4NF) addresses multivalued dependencies (X ->-> Y) where attributes are independent of each other but related to a primary entity.'
  },
  {
    id: 'dbms-33',
    subject: 'dbms',
    topic: 'Normalization',
    question: 'Fifth Normal Form (5NF), also known as Project-Join Normal Form (PJNF), addresses which anomaly?',
    options: [
      'Join dependencies that cannot be decomposed losslessly without them',
      'Partial key dependencies',
      'Transitive dependencies',
      'Missing foreign key references'
    ],
    correctIndex: 0,
    explanation: '5NF deals with relations that can be reconstructed losslessly from smaller projections through join dependencies that are not implied by candidate keys.'
  },
  {
    id: 'dbms-34',
    subject: 'dbms',
    topic: 'Database Architecture',
    question: 'In the Three-Schema Architecture, which schema defines the physical storage structure of the database?',
    options: ['External Schema', 'Conceptual Schema', 'Internal Schema', 'Logical Schema'],
    correctIndex: 2,
    explanation: 'The Internal (Physical) schema describes physical storage representations, record clustering, indexing, and access paths on disk hardware.'
  },
  {
    id: 'dbms-35',
    subject: 'dbms',
    topic: 'Database Architecture',
    question: 'What is Logical Data Independence?',
    options: [
      'The capacity to change the conceptual schema without having to modify external schemas or application programs',
      'The ability to change physical storage without modifying the conceptual schema',
      'Running SQL queries without table definitions',
      'Replicating data across multiple operating systems'
    ],
    correctIndex: 0,
    explanation: 'Logical data independence ensures that alterations to the logical/conceptual schema (e.g., adding attributes or splitting tables) do not require changes to external views or application logic.'
  },
  {
    id: 'dbms-36',
    subject: 'dbms',
    topic: 'SQL Aggregate Functions',
    question: 'How do SQL aggregate functions like AVG() and SUM() handle NULL values?',
    options: [
      'They treat NULL values as 0',
      'They ignore NULL values during computation',
      'They throw a database runtime exception',
      'They return NULL for the entire aggregation'
    ],
    correctIndex: 1,
    explanation: 'Standard SQL aggregate functions (except COUNT(*)) automatically ignore/filter out NULL values when computing mathematical aggregations.'
  },
  {
    id: 'dbms-37',
    subject: 'dbms',
    topic: 'Deadlocks',
    question: 'In the Wait-For Graph (WFG) method of deadlock detection, a deadlock exists if and only if:',
    options: [
      'The graph contains a directed cycle',
      'The graph has more edges than vertices',
      'There are disconnected components',
      'All transactions hold exclusive locks'
    ],
    correctIndex: 0,
    explanation: 'In a Wait-For Graph where directed edges indicate Ti is waiting for a lock held by Tj, a deadlock exists if and only if there is a cycle in the directed graph.'
  },
  {
    id: 'dbms-38',
    subject: 'dbms',
    topic: 'SQL Subqueries',
    question: 'What is a Correlated Subquery in SQL?',
    options: [
      'A subquery that executes once independently and provides a constant table',
      'A subquery that references columns from the outer query and must evaluate once per row evaluated by the outer query',
      'A subquery that joins two unrelated databases',
      'A subquery located inside a CREATE TABLE statement'
    ],
    correctIndex: 1,
    explanation: 'A correlated subquery references one or more values from the enclosing outer query. Because of this dependency, it is evaluated repeatedly for each candidate row considered by the outer query.'
  },
  {
    id: 'dbms-39',
    subject: 'dbms',
    topic: 'Transactions',
    question: 'What does the Checkpoint operation accomplish in database recovery logs?',
    options: [
      'It eliminates the need to scan and redo/undo the entire log history from the system inception upon restart',
      'It permanently deletes all previous committed transactions',
      'It rolls back all active transactions immediately',
      'It converts relational tables into flat files'
    ],
    correctIndex: 0,
    explanation: 'A checkpoint flushes dirty buffer pages and writes checkpoint records to stable storage. During crash recovery, the DBMS only needs to process log records starting from the checkpoint, vastly speeding recovery.'
  },
  {
    id: 'dbms-40',
    subject: 'dbms',
    topic: 'Keys',
    question: 'Can a relational table possess multiple candidate keys, and if so, how is the primary key selected?',
    options: [
      'No, a table can only possess one candidate key',
      'Yes, and the database designer chooses one candidate key as the primary key; the rest become alternate keys',
      'Yes, and all candidate keys automatically become primary keys',
      'No, candidate keys only exist in NoSQL document databases'
    ],
    correctIndex: 1,
    explanation: 'A relation may possess multiple candidate keys (e.g., Student_ID and Passport_Number). The schema architect designates one as the primary key, while the remaining candidate keys are designated as alternate keys.'
  }
];

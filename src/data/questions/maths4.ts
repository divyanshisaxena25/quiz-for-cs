import { Question } from '../../types';

export const MATHS4_QUESTIONS: Question[] = [
  {
    id: 'maths4-1',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'What is the order of convergence of the Newton-Raphson method for finding a simple root of f(x) = 0?',
    options: ['1 (Linear)', '2 (Quadratic)', '1.618 (Superlinear)', '3 (Cubic)'],
    correctIndex: 1,
    explanation: 'The Newton-Raphson method has quadratic convergence (order p = 2) for simple roots, meaning the number of correct decimal places approximately doubles in each iteration.'
  },
  {
    id: 'maths4-2',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'For a complex function f(z) = u(x,y) + i v(x,y) to be analytic, which Cauchy-Riemann equations must be satisfied?',
    options: [
      '∂u/∂x = ∂v/∂y and ∂u/∂y = -∂v/∂x',
      '∂u/∂x = -∂v/∂y and ∂u/∂y = ∂v/∂x',
      '∂u/∂x + ∂v/∂y = 0',
      '∂²u/∂x² + ∂²v/∂y² = 1'
    ],
    correctIndex: 0,
    explanation: 'The necessary condition for complex differentiability (analyticity) is given by the Cauchy-Riemann equations: u_x = v_y and u_y = -v_x, along with continuity of first partial derivatives.'
  },
  {
    id: 'maths4-3',
    subject: 'maths4',
    topic: 'Probability Distributions',
    question: 'In a Poisson distribution with parameter λ, what is the relationship between the Mean and the Variance?',
    options: [
      'Mean = Variance = λ',
      'Mean = λ and Variance = λ²',
      'Mean = λ and Variance = √λ',
      'Mean = 2λ and Variance = λ'
    ],
    correctIndex: 0,
    explanation: 'A unique characteristic of the Poisson distribution P(X = k) = (e^(-λ) * λ^k) / k! is that its expectation E[X] and variance Var(X) are both strictly equal to parameter λ.'
  },
  {
    id: 'maths4-4',
    subject: 'maths4',
    topic: 'Numerical Integration',
    question: 'Simpson’s 1/3 Rule for numerical integration requires the total number of subintervals n to be:',
    options: ['An even number', 'An odd number', 'A multiple of 3', 'A prime number'],
    correctIndex: 0,
    explanation: 'Simpson’s 1/3 rule fits a parabolic curve over every pair of consecutive intervals (2 subintervals per parabolic segment); thus, the total number of subintervals n must always be an even integer.'
  },
  {
    id: 'maths4-5',
    subject: 'maths4',
    topic: 'Numerical Integration',
    question: 'Simpson’s 3/8 Rule for numerical integration requires the total number of subintervals n to be:',
    options: ['A multiple of 3', 'An even number', 'A multiple of 4', 'An odd number'],
    correctIndex: 0,
    explanation: 'Simpson’s 3/8 rule approximates the integrand by cubic polynomials passing through groups of 4 points (3 subintervals), necessitating that n is an exact multiple of 3.'
  },
  {
    id: 'maths4-6',
    subject: 'maths4',
    topic: 'Differential Equations',
    question: 'In the Runge-Kutta fourth-order method (RK4) for solving dy/dx = f(x, y), how many slope evaluations are combined to compute each step?',
    options: ['2', '3', '4 (k1, k2, k3, k4)', '6'],
    correctIndex: 2,
    explanation: 'RK4 evaluates four incremental slopes: k1 at the start, k2 and k3 at the trial midpoints, and k4 at the trial end, combining them as y_{n+1} = y_n + (1/6)(k1 + 2k2 + 2k3 + k4).'
  },
  {
    id: 'maths4-7',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'According to Cauchy’s Integral Theorem, if f(z) is analytic everywhere inside and on a simple closed contour C, then ∮_C f(z) dz is equal to:',
    options: ['0', '2πi', '2πi × f(0)', '1'],
    correctIndex: 0,
    explanation: 'Cauchy’s Integral Theorem states that if a function f(z) is analytic within and on a simple closed contour C, the contour line integral ∮_C f(z) dz is identically zero.'
  },
  {
    id: 'maths4-8',
    subject: 'maths4',
    topic: 'Normal Distribution',
    question: 'For a standard normal random variable Z ~ N(0, 1), what percentage of total area lies between -1.96 and +1.96?',
    options: ['68.27%', '90.00%', '95.00% (approximately 95.45%)', '99.73%'],
    correctIndex: 2,
    explanation: 'Under the standard normal bell curve, approximately 95% of the total probability lies within ±1.96 standard deviations from the mean (P(-1.96 ≤ Z ≤ 1.96) ≈ 0.95).'
  },
  {
    id: 'maths4-9',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What is a Harmonic function in applied mathematics?',
    options: [
      'A real-valued function that satisfies Laplace’s equation (∇²φ = ∂²φ/∂x² + ∂²φ/∂y² = 0)',
      'A function that repeats periodically with frequency 2π',
      'A polynomial with integer roots',
      'A matrix whose eigenvalues are strictly real'
    ],
    correctIndex: 0,
    explanation: 'A function φ(x, y) with continuous second-order partial derivatives is harmonic if it satisfies Laplace’s equation: ∂²φ/∂x² + ∂²φ/∂y² = 0. The real and imaginary components of any analytic function are harmonic conjugates.'
  },
  {
    id: 'maths4-10',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What is the Residue of f(z) = 1 / (z - 3) at its simple pole z = 3?',
    options: ['0', '1', '2πi', '3'],
    correctIndex: 1,
    explanation: 'For a simple pole at z = a, Res(f, a) = lim_{z -> a} [(z - a) * f(z)] = lim_{z -> 3} [(z - 3) * (1 / (z - 3))] = 1.'
  },
  {
    id: 'maths4-11',
    subject: 'maths4',
    topic: 'Residue Theorem',
    question: 'According to Cauchy’s Residue Theorem, ∮_C f(z) dz for an enclosed set of isolated singular points z_k is:',
    options: [
      '2πi × ∑ [Residues at all poles inside C]',
      'πi × ∑ [Residues]',
      '0',
      '∑ [Residues inside C]'
    ],
    correctIndex: 0,
    explanation: 'Cauchy’s Residue Theorem states that the contour integral of f(z) along a counterclockwise closed path C equals 2πi times the sum of residues of f(z) at all singular points enclosed by C.'
  },
  {
    id: 'maths4-12',
    subject: 'maths4',
    topic: 'Numerical Linear Algebra',
    question: 'What is a sufficient condition for the convergence of the Gauss-Seidel and Jacobi iterative methods?',
    options: [
      'The coefficient matrix A is strictly diagonally dominant',
      'The matrix A is upper triangular',
      'All eigenvalues of A are negative',
      'The determinant of A is zero'
    ],
    correctIndex: 0,
    explanation: 'Strict diagonal dominance (|a_ii| > ∑_{j ≠ i} |a_ij| for all rows i) is a sufficient condition guaranteeing convergence of Gauss-Seidel and Jacobi iterative methods regardless of initial guess.'
  },
  {
    id: 'maths4-13',
    subject: 'maths4',
    topic: 'Binomial Distribution',
    question: 'What are the Mean and Variance of a Binomial distribution B(n, p) with n trials and probability of success p?',
    options: ['Mean = np, Variance = np(1 - p)', 'Mean = np, Variance = np²', 'Mean = n/p, Variance = np', 'Mean = np(1-p), Variance = np'],
    correctIndex: 0,
    explanation: 'For n independent Bernoulli trials with probability of success p and failure q = 1 - p, the expected value is E[X] = np and the variance is Var(X) = npq = np(1 - p).'
  },
  {
    id: 'maths4-14',
    subject: 'maths4',
    topic: 'Hypothesis Testing',
    question: 'What constitutes a Type I error in statistical hypothesis testing?',
    options: [
      'Rejecting the null hypothesis (H0) when it is actually true',
      'Failing to reject the null hypothesis when it is false',
      'Selecting an unrepresentative sample size',
      'Computing the wrong standard deviation'
    ],
    correctIndex: 0,
    explanation: 'A Type I error (false positive, denoted by alpha α) occurs when the researcher rejects a true null hypothesis H0.'
  },
  {
    id: 'maths4-15',
    subject: 'maths4',
    topic: 'Hypothesis Testing',
    question: 'What constitutes a Type II error in statistical hypothesis testing?',
    options: [
      'Failing to reject the null hypothesis (H0) when it is actually false',
      'Rejecting the null hypothesis when it is true',
      'Setting alpha equal to 0.05',
      'Using a two-tailed test instead of a one-tailed test'
    ],
    correctIndex: 0,
    explanation: 'A Type II error (false negative, denoted by beta β) occurs when the test fails to reject a false null hypothesis.'
  },
  {
    id: 'maths4-16',
    subject: 'maths4',
    topic: 'Chi-Square Distribution',
    question: 'In a Chi-square (χ²) test of independence for a contingency table with r rows and c columns, what are the degrees of freedom?',
    options: ['(r - 1)(c - 1)', 'r × c - 1', 'r + c - 1', '(r - 1) + (c - 1)'],
    correctIndex: 0,
    explanation: 'The degrees of freedom for an r × c contingency table is given by (r - 1)(c - 1), reflecting the number of cell frequencies that can be chosen freely.'
  },
  {
    id: 'maths4-17',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'The Trapezoidal Rule for numerical integration approximates the area under the curve using what type of interpolating polynomial?',
    options: ['Linear (degree 1) segments', 'Parabolic (degree 2) segments', 'Cubic splines', 'Exponential decay curves'],
    correctIndex: 0,
    explanation: 'The Trapezoidal rule approximates the function by straight lines connecting consecutive data points (first-degree Newton-Cotes formula), forming trapezoids.'
  },
  {
    id: 'maths4-18',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'If f(z) = z² = (x + iy)², what is its real part u(x, y)?',
    options: ['x² - y²', 'x² + y²', '2xy', 'x - y'],
    correctIndex: 0,
    explanation: 'Expanding (x + iy)² gives x² + 2ixy + i²y² = (x² - y²) + i(2xy). Thus the real part is u(x, y) = x² - y² and the imaginary part is v(x, y) = 2xy.'
  },
  {
    id: 'maths4-19',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'What is the Secant Method formula for finding roots, and how does it compare to Newton-Raphson?',
    options: [
      'It replaces the analytical derivative f’(x) with a finite-difference quotient using two prior approximations',
      'It requires computing second derivatives',
      'It always guarantees monotonic convergence',
      'It uses random sampling of the interval'
    ],
    correctIndex: 0,
    explanation: 'The Secant method approximates f’(x_n) ≈ [f(x_n) - f(x_{n-1})] / [x_n - x_{n-1}], eliminating the need to evaluate symbolic derivatives at the cost of slightly lower convergence order (~1.618).'
  },
  {
    id: 'maths4-20',
    subject: 'maths4',
    topic: 'Student’s t-Distribution',
    question: 'When is the Student’s t-test preferred over the standard normal Z-test for testing sample means?',
    options: [
      'When the population variance σ² is unknown and the sample size is small (n < 30)',
      'When the sample size is greater than 10,000',
      'When data is non-numeric',
      'Only when testing proportions of coin flips'
    ],
    correctIndex: 0,
    explanation: 'Student’s t-test is applied when testing the mean of a normally distributed population whose variance is unknown and estimated using the sample standard deviation s on small samples (n < 30).'
  },
  {
    id: 'maths4-21',
    subject: 'maths4',
    topic: 'Interpolation',
    question: 'Which interpolation formula is most computationally efficient when adding new data points incrementally without recalculating previous coefficients?',
    options: ['Newton’s Divided Difference Formula', 'Lagrange’s Interpolation', 'Taylor Series Expansion', 'Fourier Transform'],
    correctIndex: 0,
    explanation: 'Newton’s divided difference formula allows adding new interpolation nodes simply by appending a new term to the polynomial without recomputing earlier coefficients, unlike Lagrange which requires a full recalculation.'
  },
  {
    id: 'maths4-22',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'What is the local truncation error of the Euler method for solving initial value ODEs dy/dx = f(x, y) with step size h?',
    options: ['O(h²)', 'O(h)', 'O(h³)', 'O(h⁴)'],
    correctIndex: 0,
    explanation: 'From Taylor series expansion y(x + h) = y(x) + h y’(x) + (h²/2) y’’(ξ), the single-step (local) truncation error of Euler’s method is O(h²), while its cumulative global error is O(h).'
  },
  {
    id: 'maths4-23',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What is a Conformal Mapping in the complex plane?',
    options: [
      'A transformation that preserves both the magnitude and sense of angles between curves',
      'A transformation that only stretches distances uniformly',
      'A mapping that sends circles to squares',
      'A transformation that sets all derivatives to zero'
    ],
    correctIndex: 0,
    explanation: 'A mapping w = f(z) is conformal at all points where f(z) is analytic and f’(z) ≠ 0, preserving both the magnitude and orientation of angles between intersecting curves.'
  },
  {
    id: 'maths4-24',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What are the points called where f’(z) = 0 for a mapping w = f(z)?',
    options: ['Critical points', 'Removable singularities', 'Branch cuts', 'Poles of order 2'],
    correctIndex: 0,
    explanation: 'Points at which the derivative f’(z) vanishes (or fails to exist) are known as critical points; at these points, conformality fails because angles are magnified by integer multiples.'
  },
  {
    id: 'maths4-25',
    subject: 'maths4',
    topic: 'Probability Theory',
    question: 'If X and Y are independent random variables, what is the Covariance Cov(X, Y)?',
    options: ['0', '1', 'Var(X) × Var(Y)', 'E[X] + E[Y]'],
    correctIndex: 0,
    explanation: 'When X and Y are independent, E[XY] = E[X]E[Y], which directly makes Cov(X, Y) = E[XY] - E[X]E[Y] = 0.'
  },
  {
    id: 'maths4-26',
    subject: 'maths4',
    topic: 'Complex Integration',
    question: 'Evaluate ∮_C [1 / (z - 2)] dz around the circle C: |z| = 3 oriented counterclockwise.',
    options: ['2πi', '0', 'πi', '4πi'],
    correctIndex: 0,
    explanation: 'The integrand has a simple pole at z = 2, which lies strictly inside the circle |z| = 3. By Cauchy’s integral formula, ∮_C [1/(z - 2)] dz = 2πi * 1 = 2πi.'
  },
  {
    id: 'maths4-27',
    subject: 'maths4',
    topic: 'Complex Integration',
    question: 'Evaluate ∮_C [e^z / (z - 5)] dz around the unit circle C: |z| = 1 oriented counterclockwise.',
    options: ['0', '2πi e^5', 'e^5', 'πi'],
    correctIndex: 0,
    explanation: 'The singularity z = 5 lies completely outside the contour |z| = 1. Since the integrand is analytic everywhere inside and on |z| = 1, Cauchy’s Integral Theorem guarantees the integral is 0.'
  },
  {
    id: 'maths4-28',
    subject: 'maths4',
    topic: 'Probability & Statistics',
    question: 'What is the Central Limit Theorem (CLT)?',
    options: [
      'The sum (or mean) of a large number of independent and identically distributed random variables approaches a normal distribution, regardless of the original distribution',
      'All continuous random variables have zero variance',
      'The mean of any distribution is always zero',
      'Probabilities must always sum to 100'
    ],
    correctIndex: 0,
    explanation: 'The CLT establishes that the normalized sum of n independent random variables with mean μ and finite variance σ² converges in distribution to a standard normal N(0, 1) as n -> ∞.'
  },
  {
    id: 'maths4-29',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'What is the Bisection Method based upon in numerical analysis?',
    options: [
      'Intermediate Value Theorem (Bolzano’s Theorem)',
      'Rolle’s Theorem',
      'Mean Value Theorem for integrals',
      'Taylor’s remainder theorem'
    ],
    correctIndex: 0,
    explanation: 'The Bisection method relies on the Intermediate Value Theorem: if continuous function f(x) has opposite signs at endpoints a and b (f(a)f(b) < 0), there exists at least one root c ∈ (a, b).'
  },
  {
    id: 'maths4-30',
    subject: 'maths4',
    topic: 'Numerical Linear Algebra',
    question: 'How does the Gauss-Seidel method differ from the Jacobi method in solving linear systems Ax = b?',
    options: [
      'Gauss-Seidel immediately uses newly computed variable values within the same iteration as soon as they become available',
      'Jacobi uses fewer arithmetic operations per cycle',
      'Gauss-Seidel requires matrix inversion explicitly',
      'Jacobi always converges twice as fast'
    ],
    correctIndex: 0,
    explanation: 'In Gauss-Seidel, updated values of x_1, ..., x_{i-1} are substituted immediately into the equation for x_i in the current iteration, whereas Jacobi holds values fixed from the previous iteration.'
  },
  {
    id: 'maths4-31',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What type of singularity does f(z) = sin(z) / z have at the origin z = 0?',
    options: ['Removable Singularity', 'Simple Pole', 'Essential Singularity', 'Branch Point'],
    correctIndex: 0,
    explanation: 'Since lim_{z -> 0} [sin(z) / z] = 1 (finite limit exists), the singularity at z = 0 can be removed by defining f(0) = 1; thus it is a removable singularity.'
  },
  {
    id: 'maths4-32',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What type of singularity does f(z) = e^(1/z) have at z = 0?',
    options: ['Essential Singularity', 'Simple Pole', 'Pole of order 2', 'Removable Singularity'],
    correctIndex: 0,
    explanation: 'The Laurent series expansion e^(1/z) = 1 + 1/z + 1/(2! z²) + ... contains an infinite number of negative power terms in its principal part; therefore z = 0 is an essential singularity.'
  },
  {
    id: 'maths4-33',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'What is the bilinear (Möbius) transformation defined as?',
    options: [
      'w = (az + b) / (cz + d) with ad - bc ≠ 0',
      'w = az² + bz + c',
      'w = e^(az + b)',
      'w = ln(z) / (cz + d)'
    ],
    correctIndex: 0,
    explanation: 'A bilinear or Möbius transformation has the form w = (az + b)/(cz + d) where a, b, c, d are complex constants satisfying ad - bc ≠ 0, mapping circles/lines in the z-plane to circles/lines in the w-plane.'
  },
  {
    id: 'maths4-34',
    subject: 'maths4',
    topic: 'Probability Theory',
    question: 'What is the relationship between the joint probability density function f(x, y) and marginal pdf f_X(x) for continuous random variables?',
    options: ['f_X(x) = ∫_{-∞}^{∞} f(x, y) dy', 'f_X(x) = f(x, y) / f_Y(y)', 'f_X(x) = d/dx [f(x, y)]', 'f_X(x) = ∫ f(x, y) dx'],
    correctIndex: 0,
    explanation: 'The marginal density function f_X(x) is obtained by integrating the joint density f(x, y) over the entire range of the other variable y: f_X(x) = ∫_{-∞}^{∞} f(x, y) dy.'
  },
  {
    id: 'maths4-35',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'In Regula-Falsi (False Position) method, the next root approximation is obtained by finding:',
    options: [
      'The x-intercept of the chord (secant line) joining (a, f(a)) and (b, f(b))',
      'The midpoint (a + b) / 2',
      'The tangent line slope at x = a',
      'The average of derivatives'
    ],
    correctIndex: 0,
    explanation: 'Regula-Falsi replaces the curve with a secant chord between bracketed points a and b, computing the root approximation x = [a f(b) - b f(a)] / [f(b) - f(a)].'
  },
  {
    id: 'maths4-36',
    subject: 'maths4',
    topic: 'Sampling Theory',
    question: 'What is the Standard Error of the mean for a sample of size n drawn from a population with standard deviation σ?',
    options: ['σ / √n', 'σ / n', 'σ² / n', '√σ / n'],
    correctIndex: 0,
    explanation: 'The standard error of the sample mean measures the dispersion of sample means around the true population mean and equals SE = σ / √n.'
  },
  {
    id: 'maths4-37',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'If u(x, y) = x² - y² is the real part of an analytic function f(z), what is its harmonic conjugate v(x, y)?',
    options: ['2xy + C', '-2xy + C', 'x² + y² + C', 'xy + C'],
    correctIndex: 0,
    explanation: 'By Cauchy-Riemann equations: ∂v/∂y = ∂u/∂x = 2x => integrating gives v = 2xy + g(x). Then ∂v/∂x = 2y + g’(x) = -∂u/∂y = 2y => g’(x) = 0 => v(x, y) = 2xy + C.'
  },
  {
    id: 'maths4-38',
    subject: 'maths4',
    topic: 'Hypothesis Testing',
    question: 'In an ANOVA (Analysis of Variance) F-test, what is the statistic F calculated as?',
    options: [
      'Variance between samples / Variance within samples',
      'Sample mean / Standard deviation',
      'Sample size / Degrees of freedom',
      'Correlation coefficient squared'
    ],
    correctIndex: 0,
    explanation: 'The F-ratio in ANOVA compares the variance between group means (treatment effect) against the variance within individual groups (error variance): F = MS_between / MS_within.'
  },
  {
    id: 'maths4-39',
    subject: 'maths4',
    topic: 'Numerical Methods',
    question: 'What is the degree of exactness (algebraic precision) of Simpson’s 1/3 rule?',
    options: ['3 (exact for polynomials of degree ≤ 3)', '1', '2', '4'],
    correctIndex: 0,
    explanation: 'Even though Simpson’s 1/3 rule fits parabolas (degree 2), symmetry causes the cubic error term to cancel out, making it exact for all polynomials of degree up to 3.'
  },
  {
    id: 'maths4-40',
    subject: 'maths4',
    topic: 'Complex Analysis',
    question: 'According to Liouville’s Theorem, an entire function (analytic everywhere in the complex plane) that is bounded must be:',
    options: ['A constant function', 'A polynomial of degree 1', 'Zero everywhere', 'An exponential function'],
    correctIndex: 0,
    explanation: 'Liouville’s theorem states that if f(z) is entire and there exists M such that |f(z)| ≤ M for all z ∈ ℂ, then f(z) is strictly constant throughout the complex plane.'
  }
];

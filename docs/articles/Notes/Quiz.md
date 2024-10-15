# Machine Learning Quizzes 

## Quiz 1

### Question 

$y=Ax + v$, where $v$ is a Gaussian noise.

1. What is the optimal solution for $x$?
2. What is the optimal solution for $x$ if $v ~ \mathcal{N}(0, R)$?
3. What is the optimal solution for $x$ if $v ~ \mathcal{N}(0, R)$ and $X ~ N(0, aI)$?
4. $A$ and $X$ are unknown, what is the optimal solution for $x$?

### Answer

1. $J(x) = \frac{1}{2} (y - Ax)^T(y-Ax)$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TA)^{-1}A^Ty$
2. $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax)$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A)^{-1}A^TR^{-1}y$
3. $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax) + \frac{1}{2} x^T(aI)^{-1}x$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A + aI)^{-1}A^TR^{-1}y$
4. We can distinguish two cases:
    1. For x: $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax) + \frac{1}{2} x^T(aI)^{-1}x$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A + aI)^{-1}A^TR^{-1}y$
    2. For A: $Y^T = X^TA^T$ $J(A) = \frac{1}{2} (Y - XA)^TR^{-1}(Y-XA)$, $\frac{\partial J}{\partial A} = 0$, $A^T = (XR^{-1}X^T)^{-1}XR^{-1}Y^T$
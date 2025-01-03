---
title: Machine Learning Quizzes
date: 2025-01-02 20:17:00
tags: [Algorithm, Machine Learning, PRML]
categories: Machine Learning
toc: true
mathjax: true
---

Quizzes for Maching Learning Course CS405 and CS329 at SUSTech. (Before 2024 Fall Semester)

<!--more-->

## Quiz 1

### Question 

$y=Ax + v$, where $v$ is a Gaussian noise.

1. What is the optimal solution for $x$?
2. What is the optimal solution for $x$ if $v \sim \mathcal{N}(0, R)$?
3. What is the optimal solution for $x$ if $v \sim \mathcal{N}(0, R)$ and $X \sim N(0, aI)$?
4. $A$ and $X$ are unknown, what is the optimal solution for $x$?

### Answer

1. $J(x) = \frac{1}{2} (y - Ax)^T(y-Ax)$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TA)^{-1}A^Ty$
2. $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax)$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A)^{-1}A^TR^{-1}y$
3. $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax) + \frac{1}{2} x^T(aI)^{-1}x$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A + aI)^{-1}A^TR^{-1}y$
4. We can distinguish two cases:
    1. For x: $J(x) = \frac{1}{2} (y - Ax)^TR^{-1}(y-Ax) + \frac{1}{2} x^T(aI)^{-1}x$, $\frac{\partial J}{\partial x} = 0$, $x = (A^TR^{-1}A + aI)^{-1}A^TR^{-1}y$
    2. For A: $Y^T = X^TA^T$ $J(A) = \frac{1}{2} (Y - XA)^TR^{-1}(Y-XA)$, $\frac{\partial J}{\partial A} = 0$, $A^T = (XR^{-1}X^T)^{-1}XR^{-1}Y^T$


## Quiz 2

### Question
$Y = AX + \omega$, where $\omega \sim \mathcal{N}(0, Q)$ and  $X \sim \mathcal{N}(\mu_0, \Sigma_0)$

1. What is $p(Y|X)$?
2. What is $p(Y)$?
3. What is $p(X|Y)$?
4. What is $p(Y'|Y)$?

### Answer
1. $p(Y|X) \sim \mathcal{N}(AX, Q)$ We regard $X$ as a constant under conditional probability.
2. $p(Y) \sim \int p(Y|X) p(X) d x \sim \mathcal{N}(A\mu_0, A\Sigma_0 A^T + Q)$.
    $$
    var[Y] = var[AX] + var[\omega] = A\Sigma_0 A^T + Q
    $$
3. Assume that $p(X|Y) \sim \mathcal{N}(m, L)$, then we can use the equality of quadratic from to solve the problems. 
    1. $p(X|Y) \sim p(Y|X)p(X) = \mathcal{N}(Y| AX, Q) \mathcal{N}(X| \mu_0, \Sigma_9)$ 
    2. $-\frac{1}{2}(x-m)^T L^{-1}(x-m) \propto  -\frac{1}{2}(y-Ax)^T Q^{-1}(y-Ax) -\frac{1}{2}(x-\mu_0)^T \Sigma_0^{-1}(x-\mu_0)$
    3. We can get the result: 
    $$
    \begin{aligned} 
        L^{-1} &= A^T Q^{-1} A + \Sigma_0^{-1} \\ 
        L^{-1} m &= A^T Q^{-1} y + \Sigma_0^{-1} \mu_0 
    \end{aligned}
    $$
    4. By applying $[A+BCD]^{-1} = A^{-1} - A^{-1}B[C^{-1} + DA^{-1}B]^{-1} D A^{-1}$
    $$
    \begin{aligned} 
        L &= (I - KA) \Sigma_0 \\ 
        m &= \mu_0 + K(y - A\mu_0) 
    \end{aligned}
    $$
    where $K = \Sigma_0 A^T (A^T\Sigma_0A + Q)^{-1}$
4. $p(Y'|Y) \sim \int p(Y'|X) p(X|Y) d x \sim \mathcal{N}(Am, AL A^T + Q)$. The same format as question 2. 

## Quiz 3
{% note primary %}
1. Learning: $p(\theta|\mathcal{D}) \propto p(\mathcal{D}|\theta)p(\theta)$
2. Prediction: $p(\mathcal{D}^{new}|\mathcal{D}) = \int p(\mathcal{D}^{new}|\theta)p(\theta|\mathcal{D})d\theta$
3. Evaluation: $p(\mathcal{D}) = \int p(\mathcal{D}|\theta)p(\theta)d\theta$
{% endnote %}

### Question

Given $t = \Phi(x) \omega + v$ where $\Phi(x) = [1, x, x..., x^M]$ and $v \sim \mathcal{N}(0, \beta^{-1})$, $\mathcal{D} = \{[x_1,...,x_N], [t_1, ..., t_N]\}$
1. What is the solution of $\omega_{ML}$?
2. What is the solution of $\omega_{MAP}$ if $\omega \sim \mathcal{N}(0, \alpha^{-1}I)$?
3. What is the predictive distribution if $\mathcal{D}^{new} = \{x^{new}, t^{new}\}$?
4. What is the model evaluation?

### Answer
1. $J(\omega) = \frac{\beta}{2}(T-\Phi \omega)^T(T-\Phi\omega) \rightarrow \omega_{ML} = (\Phi^T\Phi)^{-1}\Phi^T T$
2. $J(\omega) = \frac{\beta}{2}(T-\Phi\omega)^T(T-\Phi\omega) + \frac{\alpha}{2} \omega^T\omega \rightarrow \omega_{MAP} = (\beta\Phi^T\Phi + \alpha I)^{-1}\beta\Phi^T T$
3. $\mathcal{N}(\Phi(x^{new})\omega_{MAP}, \Phi(x^{new})\Sigma_{MAP}\Phi(x^{new})^T+\beta I)$
4. $\mathcal{N}(0, \alpha^{-1}\Phi\Phi^T+\beta^{-1}I)$

## Quiz 4

### Question

For $y = \sigma(\Phi(x) w)$, and $\mathcal{D} = \{[x_1,...,x_N], [t_1, ..., t_N]\}$, where $\sigma(x) = \frac{1}{1+e^{-x}}$.
1. What is the solution of $w_{ML}$?
2. What is the solution of $w_{MAP}$ if $w \sim \mathcal{N}(m_0, S_0)$?
3. What is the predictive distribution if $\mathcal{D}^{new} = \{x^{new}, t^{new}=1\}$?
4. What is the model evaluation?

### Answer

1. $J(w) = -\sum_{n=1}^N \{t_n \log y_n + (1-t_n) \log(1-y_n)\} \ b = \triangledown J(w) = \sum_{n=1}^N \phi^T(y_n - t_n) \ H = \triangledown \triangledown J(w) = \sum_{n=1}^N y_n(1-y_n) \phi_n^T\phi$ 
    
    Because $\sigma$ is not a linear function, there are no explicit solution to find $w_{ML}$. We can use the gradient descent method to find the solution.
    
    $w^+ \rightarrow w - H^{-1}b$
2. $J(w) = -\sum_{n=1}^N \{t_n \log y_n + (1-t_n) \log(1-y_n)\} + \frac{1}{2}(w-m_0)^TS_0^{-1}(w-m_0)$
    
    Therefore, $b = \triangledown J(w) = \sum_{n=1}^N \phi^T(y_n - t_n) + S_0^{-1}(w - m_0) $ and $H = \triangledown \triangledown J(w) =\sum_{n=1}^N y_n(1-y_n) \phi_n^T\phi + S_0^{-1}$

3. $p(t^{new}=1 | x^{new}, \mathcal{D}) = \int p(t^{new}=1|w)p(w|\mathcal{D})dw = \int \sigma(\phi^{new} w) \mathcal{N}(w_{MAP}, H^{-1})dw$

    $\sigma(\kappa(\sigma_a^2)\mu_a)$

4. $\sum_{n=1}^N \left[t_n \ln y_n + (1 - t_n) \ln (1 - y_n)\right]_{\text{MAP}} - \frac{1}{2} (w_\text{MAP}- m_0)^T S_0^{-1}(w_\text{MAP}- m_0)+ \frac{M}{2} \ln 2\pi - \frac{1}{2}\ln |H|_\text{MAP}$
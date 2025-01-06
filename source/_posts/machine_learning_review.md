---
title: Machine Learning Review Notes
date: 2025-01-05 17:18:00
tags: [SUSTech, Machine Learning, PRML]
categories: Machine Learning
toc: true
mathjax: true
---

Pattern Recognition and Machine Learning (PRML) focuses on traditional machine learning algorithms and their probabilistic interpretations. 

<!--more-->

## Clustering

### K-means (Hard Clustering)

$J = \sum_{n=1}^N \sum_{k=1}^K r_{n k} \|\| x_n - \mu_k \|\|^2$, where  $r_{n k} \in \{0, 1\}$, $\sum_{k=1}^K r_{n k} = 1$

$$
r_{n k} = \begin{cases}
1 & \text{if } k = \arg \min_j \|\| x_n - \mu_j \|\|^2 \\\\
0 & \text{otherwise}
\end{cases}
$$

$\mu_k = \frac{\sum_{n=1}^N r_{n k} x_n}{\sum_{n=1}^N r_{n k}}$


### Probabilistic Clustering (Soft Clustering)

|   | GMM       | Bernoulli                                  |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| $p(x \| \theta)$                 | $p(x \| \mu_k, \Sigma_k) = \mathcal{N}(x \| \mu_k, \Sigma_k)$  | $p(x \| \mu_k) = \prod_{i=1}^D \mu_{k i}^{x_i} (1 - \mu_{k i})^{1 - x_i}$                                |
| $ p(x \| \pi, \theta) $            | $ \sum_{k=1}^K \pi_k \mathcal{N}(x \| \mu_k, \Sigma_k) $                                                 | $ \sum_{k=1}^K \pi_k p(x \| \mu_k) $                                                                       |
| $ \ln p(X \| \pi, \theta) $        | $ \ln p(X \| \pi, \mu, \Sigma) = \sum_{n=1}^N \ln \left( \sum_{k=1}^K \pi_k \mathcal{N}(x_n \| \mu_k, \Sigma_k) \right) $ | $ \ln p(X \| \mu, \pi) = \sum_{n=1}^N \ln \left( \sum_{k=1}^K \pi_k p(x_n \| \mu_k) \right) $                |
| $ p(z \| \pi) $                    | $ p(z \| \pi) = \prod_{k=1}^K \pi_k^{z_k} $                                                              | $ p(z \| \pi) = \prod_{k=1}^K \pi_k^{z_k} $                                                                 |
| $ p(x \| z, \theta) $              | $ p(x \| z, \mu, \Sigma) = \prod_{k=1}^K \mathcal{N}(x \| \mu_k, \Sigma_k)^{z_k} $                        | $ p(x \| z, \mu) = \prod_{k=1}^K p(x \| \mu_k)^{z_k} $                                                       |
| $ p(X, Z \| \pi, \theta) $         | $ p(X, Z \| \mu, \Sigma, \pi) = \prod_{n=1}^N \prod_{k=1}^K \pi_k^{z_{n k}} \mathcal{N}(x_n \| \mu_k, \Sigma_k)^{z_{n k}} $ | $ p(X, Z \| \mu, \pi) = \prod_{n=1}^N \prod_{k=1}^K \pi_k^{z_{n k}} p(x_n \| \mu_k)^{z_{n k}} $             |
| $ \gamma(z_{n k}) = \mathbb{E}[z_{n k}] $ | $ \frac{\pi_k \mathcal{N}(x_n \| \mu_k, \Sigma_k)}{\sum_{j=1}^K \pi_j \mathcal{N}(x_n \| \mu_j, \Sigma_j)} $ | $ \frac{\pi_k p(x_n \| \mu_k)}{\sum_{j=1}^K \pi_j p(x_n \| \mu_j)} $                                         |
| $ \mathbb{E}_Z[\ln p(X, Z \| \pi, \theta)] $ | $ \sum_{n=1}^N \sum_{k=1}^K \gamma(z_{n k}) \left[ \ln \pi_k + \ln \mathcal{N}(x_n \| \mu_k, \Sigma_k) \right] $ | $ \sum_{n=1}^N \sum_{k=1}^K \gamma(z_{n k}) \left[ \ln \pi_k + \ln p(x \| \mu_k) \right] $                 |
| Expectation                         | $ \gamma(z_{n k}) = \frac{\pi_k \mathcal{N}(x_n \| \mu_k, \Sigma_k)}{\sum_{j=1}^K \pi_j \mathcal{N}(x_n \| \mu_j, \Sigma_j)} $ <br> $ N_k = \sum_{n=1}^N \gamma(z_{n k}) $ | $ \gamma(z_{n k}) = \frac{\pi_k p(x_n \| \mu_k)}{\sum_{j=1}^K \pi_j p(x_n \| \mu_j)} $ <br> $ N_k = \sum_{n=1}^N \gamma(z_{n k}) $ |
| Maximization                        | $ \mu_k^{(\text{new})} = \frac{1}{N_k} \sum_{n=1}^N \gamma(z_{n k}) x_n $ <br> $ \Sigma_k^{(\text{new})} = \frac{1}{N_k} \sum_{n=1}^N \gamma(z_{n k})(x_n - \mu_k)(x_n - \mu_k)^T $ <br> $ \pi_k^{(\text{new})} = \frac{N_k}{N} $ | $ \mu_k^{(\text{new})} = \frac{1}{N_k} \sum_{n=1}^N \gamma(z_{n k}) x_n $ <br> $ \pi_k^{(\text{new})} = \frac{N_k}{N} $ |

{% note danger %}
When a $\ \mu_k\ $ is degraded to a specific data point, the $\ \Sigma_k\ $ will be degraded to 0 and singularity will occur. This will lead to the unbounded value of the likelihood function.
{% endnote %}


### The connction between GMM and K-means

We can consider a GMM with $\Sigma_k = \varepsilon I$. The distribution will be 

$$
p(x|\mu_k, \Sigma_k) = \prod_{i=1}^D \frac{1}{\sqrt{2\pi \varepsilon}} \exp \left( -\frac{(x_i - \mu_{k i})^2}{2 \varepsilon} \right)
$$

We see $\varepsilon$ as a constant, then for a specific data point, the responsibility will be

$$
\gamma(z_{n k}) = \frac{\pi_k \exp \left( -\frac{\|x_n - \mu_k\|^2}{2 \varepsilon} \right)}{\sum_{j=1}^K \pi_j \exp \left( -\frac{\|x_n - \mu_j\|^2}{2 \varepsilon} \right)}
$$

If we consider $\ \varepsilon \to 0$, then the responsibility will be

$$
\gamma(z_{n k}) = \begin{cases}
1 & \text{if } k = \arg \min_j \|\| x_n - \mu_j \|\|^2 \\\\
0 & \text{otherwise}
\end{cases}
$$

$\gamma(z_{n k}) \to r_{n k}\ $ which is the same as K-means.

### The generalization of EM algorithm

Consider a **probabilistic model** where:  
- **Observed variable**: $ X $  
- **Latent variable**: $ Z $  
- **Model parameters**: $ \theta $  

The goal is to **maximize the likelihood function**:

$$
p(X | \theta) = \sum_Z p(X, Z | \theta)
$$

{% note primary %}
**Directly maximizing $\ p(X | \theta)\ $ is more difficult than maximizing the joint distribution $\ p(X, Z | \theta)\ $.**
{% endnote %}

We can decompose the log-likelihood function as:  

$$
\ln p(X | \theta) = \mathcal{L}(q, \theta) + \mathcal{D}_{KL}(q || p)
$$

where:
- $ q(Z) $ is the distribution over the latent variables.  
- **Lower bound**:

$$
\mathcal{L}(q, \theta) = \sum_Z q(Z) \ln \frac{p(X, Z | \theta)}{q(Z)}
$$

- **KL divergence**:

$$
\mathcal{D}_{KL}(q || p) = - \sum_Z q(Z) \ln \frac{p(Z | X, \theta)}{q(Z)}
$$

Since KL divergence satisfies: $\ \mathcal{D}_{KL}(q || p) \geq 0\ $, it implies that: $\ \mathcal{L}(q, \theta)\ $ serves as a **lower bound** for $\ \ln p(X | \theta)\ $.

Based on the above observations, the **EM algorithm** consists of two steps:

1. **E-step**:  
   - Keep $\ \theta\ $ fixed.  
   - Maximize $\ \mathcal{L}(q, \theta)\ $ by minimizing $\ \mathcal{D}_{KL}(q || p)\ $.  
   - At maximum $\ \mathcal{D}_{KL}(q || p) = 0\ $, which implies: $\ q(Z) = p(Z | X, \theta^{\text{old}})\ $.

2. **M-step**:  
   - Maximize the **lower bound** $ \mathcal{L}(q, \theta) $ with respect to $ \theta $.  
   - Since $\ \mathcal{D}_{KL}(q || p) \geq 0\ $, any increase in $ \mathcal{L} $ ensures that $\ \ln p(X | \theta)\ $ also **increases**.  

#### **Practical Reformulation**  

From the **E-step**, we use:

$$
q(Z) = p(Z | X, \theta^{\text{old}})
$$

and derive:

$$
\mathcal{L}(q, \theta) = \sum_Z p(Z | X, \theta^{\text{old}}) \ln p(X, Z | \theta) - \sum_Z p(Z | X, \theta^{\text{old}}) \ln p(Z | X, \theta^{\text{old}})
$$

Let:

$$
\mathcal{Q}(\theta, \theta^{\text{old}}) = \sum_Z p(Z | X, \theta^{\text{old}}) \ln p(X, Z | \theta)
$$

The remaining term is a **constant** (information entropy), so the **M-step** effectively maximizes $\ \mathcal{Q}(\theta, \theta^{\text{old}}) $.

- The **EM algorithm** alternates between estimating the latent variable distribution ($ q(Z) $) and maximizing the lower bound with respect to parameters ($ \theta $).  
- The KL divergence guarantees that each iteration **increases the likelihood** $\ p(X | \theta) $.  
- The reformulated objective function simplifies computations by focusing on the **expected complete-data log-likelihood** ($ \mathcal{Q} $).

## Hidden Markov Matrix

{% note primary %}
**Why Do We Need Hidden Markov Models (HMMs)?**

The complexity of **Markov Chain Models** is tightly linked to the dependency on prior data for conditional probabilities. This dependency leads to an **exponentially growing model complexity** as the order of dependencies increases.  

To address this, **Hidden Markov Models (HMMs)** are introduced to construct **arbitrary-order sequence models** without being constrained by the **Markov assumption**, while requiring **fewer parameters**.  
{% endnote %}

- **Transmission Probabilities**: $\ p(z_n = k | z_{n-1} = j) = A_{jk}\ $
  - Initial state probabilities: $\ p(z_1 = k) = \pi_k$
- **Emission Probabilities**: $\ p(x_n | z_n, \phi) = \prod_{k=1}^K p(x_n | \phi_k)^{z_{nk}}\ $
  - Example with Gaussian emissions: $\ p(x_n | z_n, \phi) = \prod_{k=1}^K \mathcal{N}(x_n | \mu_k, \Sigma_k)^{z_{nk}}\ $
- **Joint Probability of Observations and Hidden States**: $\ p(\{x_N\}, \{z_N\}) = p(z_1) \left[ \prod_{n=2}^{N} p(z_n | z_{n-1}) \right] \prod_{n=1}^{N} p(x_n | z_n, \phi)\ $
  - Thus, the parameters controlling the model can be represented as: $\ \theta = \{\pi, A, \phi\}\ $

### **Three Key Problems for HMMs**  

1. **Learning (Parameter Estimation):**  
   - **Goal:** What is the most likely HMM model ($\theta$) for a given observation sequence $\ \\\{x_1, \dots, x_N\\\}\ $?  
   - **Solution:** Use the **Expectation-Maximization (EM)** strategy.

2. **Evaluation (Likelihood Computation):**  
   - **Goal:** Given an HMM model $\ \theta = \\\{\pi, A, \phi\\\}\ $, what is the **likelihood** of the observation sequence $\ \\\{x_1, \dots, x_N\\\}\ $ generated by this model?  
   - **Solution:** Use the **Forward-Backward Algorithm** to efficiently compute probabilities.

3. **Decoding (Hidden State Inference):**  
   - **Goal:** Given an HMM model $\ \theta = \\\{\pi, A, \phi\\\}\ $, what is the **most likely sequence of latent states** $\ \\\{z_1, \dots, z_N\\\}\ $ for an observation sequence $\ \\\{x_1, \dots, x_N\\\}\ $?  
   - **Solution:** Use the **Viterbi Algorithm** to determine the most probable hidden state path.  

### Expectation-Maximization (EM) for HMMs

| **E-Step**             | **Equations**                                                                                                                                                                                                 |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $\gamma(z_n), \gamma(z_{n k})$ | $$ p(z_n \| X, \theta^{\text{old}}), \quad \mathbb{E}[z_{n k}] = \sum_{z_n} \gamma(z) z_{n k} $$ |
| $\xi(z_{n-1}, z_n), \xi(z_{[n-1][j]}, z_{[n][k]})$ | $$ p(z_{n-1}, z_n \| X, \theta^{\text{old}}), \quad \mathbb{E}[z_{[n-1][j]} z_{[n][k]}] = \sum_{z_{n-1}, z_n} \xi(z_{n-1}, z_n) z_{[n-1][j]} z_{[n][k]} $$ |
| **M-Step**                     | **Equations**                                                                                                                                                                                                                         |
| $Q(\theta, \theta^{\text{old}})$ | $$ \sum_k \gamma(z_{1 k}) \ln \pi_k + \sum_{n=2}^N \sum_j^K \sum_k^K \xi(z_{[n-1][j]}, z_{[n][k]}) \ln A_{j k} + \sum_n \sum_k \gamma(z_{n k}) \ln p(x_n \| \phi_k) $$                        |
| $\pi_k$                      | $$ \frac{\gamma(z_{1 k})}{\sum_{j=1}^K \gamma(z_{1 j})} $$                                                                                                                                                                           |
| $A_{j k}$                    | $$ \frac{\sum_{n=2}^N \xi(z_{[n-1][j]}, z_{[n][k]})}{\sum_{l=1}^K \sum_{n=2}^N \xi(z_{[n-1][j]}, z_{[n][l]})} $$                                                                                 |
| Gaussian 
$p(x \| z, \phi) = \prod_{k=1}^K \mathcal{N}(x \| \mu_k, \Sigma_k)^{z_k}$ | $$ \mu_k = \frac{\sum_{n=1}^N \gamma(z_{n k}) x_n}{\sum_{n=1}^N \gamma(z_{n k})}, \quad \Sigma_k = \frac{\sum_{n=1}^N \gamma(z_{n k})(x_n - \mu_k)(x_n - \mu_k)^T}{\sum_{n=1}^N \gamma(z_{n k})} $$ |
| Discrete
$p(x \| z, \phi) = \prod_{i=1}^D \prod_{k=1}^K \mu_{i k}^{x_i z_k}$ | $$ \mu_{i k} = \frac{\sum_{n=1}^N \gamma(z_{n k}) x_{n i}}{\sum_{n=1}^N \gamma(z_{n k})} $$                                                                                   |

### Forward-Backward Algorithm

- **Forward Algorithm**:
  - **Initialization**: $\ \alpha_1(z_1) = p(x_1 | z_1, \phi) p(z_1 | \pi)\ $
  - **Recursion**: $\ \alpha_{n+1}(z_{n+1}) = p(x_{n+1} | z_{n+1}, \phi) \sum_{z_n} \alpha_n(z_n) p(z_{n+1} | z_n, A)\ $
  - **Termination**: $\ p(x | \theta) = \sum_{z_N} \alpha_N(z_N)\ $
- **Backward Algorithm**:
  - **Initialization**: $\ \beta_N(z_N) = 1\ $
  - **Recursion**: $\ \beta_n(z_n) = \sum_{z_{n+1}} p(x_{n+1} | z_{n+1}, \phi) p(z_{n+1} | z_n, A) \beta_{n+1}(z_{n+1})\ $
  - **Termination**: $\ p(x | \theta) = \sum_{z_1} \pi(z_1) p(x_1 | z_1, \phi) \beta_1(z_1)\ $

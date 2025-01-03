---
title: Gaussian Distribution
date: 2025-01-02 20:17:00
tags: [Machine Learning, PRML]
categories: Machine Learning
toc: true
mathjax: true
---

高斯分布（Gaussian Distribution）是一种连续概率分布，也称为正态分布（Normal Distribution）。高斯分布的概率密度函数（Probability Density Function, PDF）为：

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

其中，$\mu$ 是均值（Mean），$\sigma$ 是标准差（Standard Deviation）。
多元高斯分布的概率密度函数为：

$$
f(x) = \frac{1}{(2\pi)^{\frac{d}{2}}|\Sigma|^{\frac{1}{2}}} e^{-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)}
$$

其中，$\mu$ 是 $d$ 维均值向量，$\Sigma$ 是 $d \times d$ 的协方差矩阵，$d$ 是维度。

{% note primary %}
**高斯分布的性质**

1. 高斯分布是一个钟形曲线，左右对称，中心点为均值 $\mu$
2. 标准差 $\sigma$ 决定了曲线的宽窄，标准差越大，曲线越矮胖；标准差越小，曲线越瘦高
3. 高斯分布的期望值为均值 $\mu$，方差为 $\sigma^2$
4. 高斯分布的协方差矩阵 $\Sigma$ 是对称正定矩阵
5. **高斯分布的边缘分布是高斯分布**（边缘分布是指将多元高斯分布中的某几个维度的变量积分掉后得到的分布）
6. **高斯分布的条件分布是高斯分布**（条件分布是指在已知某些变量的情况下，对另一些变量的分布）
7. **高斯分布的线性变换仍然是高斯分布**（线性变换是指 $y = Ax + b$，其中 $A$ 是矩阵，$b$ 是向量）
{% endnote %}

高斯分布会在不同的问题中产生，例如：

1. 对于一个一元实值向量，使熵最大的分布是高斯分布
2. 中心极限定理表明，独立同分布的随机变量和服从任意分布的随机变量的和，当样本量足够大时，其分布会趋近于高斯分布

## 高斯分布中的均值与方差的计算

首先，考虑高斯分布的二次型：

$$
\Delta^2 = (x-\mu)^T\Sigma^{-1}(x-\mu) 
$$

其中，$\Delta^2$ 是一个标量，$x$ 是一个列向量，$\mu$ 是一个列向量，$\Sigma$ 是一个实对称正定矩阵

{% note primary %}
**实对称正定矩阵的性质**

对于一个实对称正定矩阵 $\Sigma$，存在一个正交矩阵 $Q$，使得 $\Sigma = Q\Lambda Q^T$，其中 $\Lambda$ 是一个对角矩阵，对角线上的元素是 $\Sigma$ 的特征值，那么按照特征值展开定理，有：

$$
\Sigma^{-1} = (Q\Lambda Q^T)^{-1} = Q\Lambda^{-1}Q^T = \sum_{i=1}^d \frac{1}{\lambda_i}q_iq_i^T
$$

其中，$q_i$ 是 $Q$ 的第 $i$ 列（也就是第 $i$个特征向量），$\lambda_i$ 是 $\Lambda$ 的第 $i$ 个对角元素
{% endnote %}

使用上面的公式代入二次型，有：

$$
\Delta^2 = (x-\mu)^TQ\Lambda^{-1}Q^T(x-\mu) = (Q^T(x-\mu))^T\Lambda^{-1}(Q^T(x-\mu))
$$

令 $y = Q^T(x-\mu)$，则有：

$$
\Delta^2 = y^T\Lambda^{-1}y = \sum_{i=1}^d \frac{y_i^2}{\lambda_i}
$$

{% note primary %}
**高斯分布的几何理解**
![高斯分布的几何理解](/images/machine_learning/gaussian_distribution.png)
本质上，高斯分布的一般形式都可以看作是在标准形式 $N(0, I)$ 上进行线性变换得到的. 对于一个二元高斯分布，其等高线是一个椭圆，椭圆的长轴和短轴方向分别是协方差矩阵的特征向量方向，长轴和短轴的长度分别是特征值的平方根. （我们讨论正定矩阵，也就是特征值全部大于零的情况，如果特征值大于等于零，那么我们会遇到一个退化的情况，也就是得到一个低纬度的椭圆，甚至是一个线段或者点）
{% endnote %}

这样，我们可以代入高斯分布的概率密度函数，得到：

$$
p(y) = p(x)\left|\frac{dx}{dy}\right| = \frac{1}{(2\pi)^{\frac{d}{2}}|\Sigma|^{\frac{1}{2}}} e^{-\frac{1}{2}y^T\Lambda^{-1}y} = \prod_{j=1}^d  \frac{1}{(2\pi)^{\frac{d}{2}}|\Sigma|^{\frac{1}{2}}} e^{-\frac{1}{2}\frac{y_i^2}{\lambda_i}}  
$$

这样，我们可以看出，高斯分布的每一个维度都是独立的，且服从标准正态分布 $N(0, 1)$，这样我们就可以得到高斯分布的均值和方差：

$$
\begin{aligned}
\mathbb{E}[x] &= \mathbb{E}[Qy+\mu] = \mathbb{E}[Qy]+\mu = Q\mathbb{E}[y]+\mu = \mu \\
\text{Var}[x] &= \text{Var}[Qy+\mu] = \text{Var}[Qy] = Q\text{Var}[y]Q^T = Q\Lambda Q^T = \Sigma
\end{aligned}
$$

## 高斯分布的局限性

高斯分布的局限性主要体现在以下几个方面：

1. 高斯分布参数量大，而且求逆计算的计算复杂度高，对于高维数据，计算量会很大
1. 高斯分布本质是单峰，因此不能很好的近似多峰分布

解决这类的问题，我们可以通过引入潜在变量（隐藏变量、未观察变量）来解决，例如混合高斯分布
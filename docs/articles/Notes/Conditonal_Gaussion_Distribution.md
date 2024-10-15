# 条件高斯分布

多元高斯分布的一个重要性质是，如果两组变量是联合高斯分布，那么以其中一组变量为条件，另一组变量同样是高斯分布.这个性质在贝叶斯网络中经常被用到.假设$x$是一个服从高斯分布$\mathcal{N}(\mathbf{\mu}, \mathbf{\Sigma})$的随机变量，其中$\mathbf{\mu}$是均值向量，$\mathbf{\Sigma}$是协方差矩阵.我们可以将$x$分为两部分：$x = \begin{bmatrix} x_a \\ x_b \end{bmatrix}$，其中$x_a$是我们要求的变量，$x_b$是我们已知的变量.我们可以将$x$的概率密度函数写成如下形式：

$$
p(x) = \mathcal{N} \left( \begin{bmatrix} x_a \\ x_b \end{bmatrix} \middle| \begin{bmatrix} \mu_a \\ \mu_b \end{bmatrix}, \begin{bmatrix} \Sigma_{aa} & \Sigma_{ab} \\ \Sigma_{ba} & \Sigma_{bb} \end{bmatrix} \right)
$$

其中$\mu_a$和$\mu_b$分别是$x_a$和$x_b$的均值，$\Sigma_{aa}$、$\Sigma_{ab}$、$\Sigma_{ba}$和$\Sigma_{bb}$分别是$x_a$和$x_b$之间的协方差矩阵.从协方差矩阵的对称性质，我们可以得到$\Sigma_{ab} = \Sigma_{ba}^T$.

::: tip **精度矩阵**
我们定义精度矩阵$\Lambda$为协方差矩阵的逆：

$$
\Lambda = \Sigma^{-1}
$$

有些性质使用协方差来描述很方便，有些性质使用精度来描述很方便.例如，对于多元高斯分布的指数部分，使用精度矩阵来描述更方便：

$$
-\frac{1}{2} (x - \mu)^T \Sigma^{-1} (x - \mu) = -\frac{1}{2} x^T \Lambda x + x^T \Lambda \mu + \text{const}
$$
:::

接下来我们可以推导出条件概率分布$p(x_a | x_b)$.条件分布可以根据联合分布$p(x) = p(x_a, x_b)$和边缘分布$p(x_b)$的关系得到.通过把$x_b$固定为观测值，然后对得到的表达式进行归一化，我们可以得到$x_a$的一个合法的概率分布.

我们可以通过以下步骤来推导条件概率分布：

$$
\begin{aligned}
p(x_a | x_b) & = \frac{p(x_a, x_b)}{p(x_b)} \\
& = \frac{\mathcal{N} \left( \begin{bmatrix} x_a \\ x_b \end{bmatrix} \middle| \begin{bmatrix} \mu_a \\ \mu_b \end{bmatrix}, \begin{bmatrix} \Sigma_{aa} & \Sigma_{ab} \\ \Sigma_{ba} & \Sigma_{bb} \end{bmatrix} \right)}{\mathcal{N} \left( x_b \middle| \mu_b, \Sigma_{bb} \right)} \\
& = \frac{1}{Z} \exp \left\{ -\frac{1}{2} \begin{bmatrix} x_a - \mu_a \\ x_b - \mu_b \end{bmatrix}^T \begin{bmatrix} \Sigma_{aa} & \Sigma_{ab} \\ \Sigma_{ba} & \Sigma_{bb} \end{bmatrix}^{-1} \begin{bmatrix} x_a - \mu_a \\ x_b - \mu_b \end{bmatrix} \right\} \\
& = \frac{1}{Z} \exp \left\{ -\frac{1}{2} \left( x_a - \mu_a \right)^T \Lambda_{aa} \left( x_a - \mu_a \right) + \left( x_a - \mu_a \right)^T \Lambda_{ab} \left( x_b - \mu_b \right) + \text{const} \right\}
\end{aligned}
$$

我们知道一个高斯分布的二阶系数应该是$\Sigma^{-1}$， 一阶项系数是$\Sigma^{-1}\mu$. 基于这个条件，我们可以继续推导出条件概率分布的均值和协方差：

$$
\begin{aligned}
\Sigma_{a|b} & = \Lambda_{aa}^{-1} \\
\mu_{a|b} & = \Sigma_{a|b} [\Lambda_{aa}\mu_a - \Lambda_{ab}(x_b - \mu_b)] \\
& = \mu_a - \Lambda_{aa}^{-1} \Lambda_{ab} (x_b - \mu_b)
\end{aligned}
$$

::: tip **舒尔补**
我们可以利用舒尔补来计算分块矩阵的逆.假设我们有一个分块矩阵$M = \begin{bmatrix} A & B \\ C & D \end{bmatrix}$，其中$A$和$D$是方阵.我们可以得到$M$的逆：

$$
M^{-1} = \begin{bmatrix} K & -KBD^{-1} \\ -D^{-1}CK & D^{-1} + D^{-1} CKBD^{-1} \end{bmatrix}
$$

其中$K=(A-BD^{-1}C)^{-1}$. 因此我们可以有以下公式：

$$
\begin{aligned}
\Lambda_{aa} & = (\Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba})^{-1} \\
\Lambda_{ab} & = -(\Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba})^{-1} \Sigma_{ab} \Sigma_{bb}^{-1}
\end{aligned}
$$

这个公式可以用来计算$\Sigma_{a|b}$.
:::

这个结果表明，如果我们知道$x_b$的值，那么$x_a$的条件分布是一个高斯分布，均值是$\mu_a + \Lambda_{aa}^{-1} \Lambda_{ab} (x_b - \mu_b)$，协方差是$\Lambda_{aa}^{-1}$.

结合上述的推导，我们可以得到条件概率分布$p(x_a | x_b)$的均值和协方差.

$$
\begin{aligned}
p(x_a | x_b) & = \mathcal{N} \left( x_a \middle| \mu_{a|b}, \Sigma_{a|b} \right) \\
\mu_{a|b} & = \mu_a + \Sigma_{ab} \Sigma_{bb}^{-1} (x_b - \mu_b) \\
\Sigma_{a|b} & = \Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba}
\end{aligned}
$$

我们可以看到，对于条件概率分布，使用精度矩阵来描述更方便.


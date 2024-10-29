# 关于CNN的简明介绍 <Badge type="tip" text="CNN" /> <Badge type="tip" text="Machine Learning" />

为什么要提起CNN和RNN？在写下这篇博客的前一天，我正在和我的同学分享一些我阅读Transformer结构的心得. 我们的项目会用到大语言模型，理解Transformer结构是必须的. 但是在讲述Transformer结构的过程当中，我发现我没有办法对Transformer结构为什么要这么设计有更加深入的解释. 我只能说，这是一种新的结构，它的效果很好. 但是这样的解释是不够的. 我需要更加深入的理解. 于是我决定从CNN和RNN开始，逐渐深入到Transformer结构.

深度学习目前比较重要的几种结构就是MLP, CNN, RNN 和 Transformer. MLP是最为基础的线性神经元多层感知机，CNN是卷积神经网络，RNN是循环神经网络，Transformer是自注意力机制. 这四种结构是深度学习的基础，也是深度学习的核心. 很多衍生的网络都是基于这四种基本结构之上.

## CNN的基本构成

在讨论CNN的基本构成之前，我们可能要先了解为什么我们需要CNN，CNN是为了解决MLP的什么痛点问题而设计的？

MLP的结构非常适合处理表格结构，行对应的是我们的样本，列对应的是相应的特征. 机器学习本质上在于**寻找数据之中的某种特征模式**（Pattern Recognition因此得名），MLP利用线性神经元的组合来寻找这种特征模式. 对于一个没有预先结构的数据，MLP是一个很好的选择. 但是在面临下面几个问题的时候，MLP就有些捉襟见肘：

- 当维度很高的时候，MLP的参数会非常多，训练起来非常困难
- 当数据之间存在空间/时间关系的时候，MLP无法表示这种已知的关系

因此卷积神经网络的出现就是为了利用自然图像中一些已知结构的创造性方法，它利用了图片的一些特征

::: tip **一些关于图片的特征**
- *平移不变性*： 不管图片中的物体在图片中的位置如何变化，神经网络的前面几层应该对相同的图像区域有相似的反应($\mathbb{V}$不依赖于图像的位置)
$$
[\mathbb{H}]_{ij} = u + \sum_{a=1}^{n} \sum_{b=1}^{n} [\mathbb{V}]_{ab} [\mathbb{X}]_{i+a, j+b}
$$

- *局部性*：神经网络的前面几层应该只关注图像中局部区域的特征，而不需要关注整个图像的特征（不关心$|a|> \Delta$或者$|b|> \Delta$的情况）
$$
[\mathbb{H}]_{ij} = u + \sum_{a=-\Delta}^{\Delta} \sum_{b=-\Delta}^{\Delta} [\mathbb{V}]_{ab} [\mathbb{X}]_{i+a, j+b}
$$
:::

CNN的基本构成就是利用**卷积核**来提取图片的特征，然后通过**池化层**来减少特征的维度，最后通过**全连接层**来进行分类. 

### 卷积层

卷积层实际上就是对**输入**和**卷积核权重**进行**互相关运算**（这里埋个问题，这种互相关运算和注意力机制中的互相关运算有什么关系呢？）

```python
class Conv2D(nn.Module):
    def __init__(self, kernel_size):
        super().__init__()
        self.weight = nn.Parameter(torch.rand(kernel_size))
        self.bias = nn.Parameter(torch.zeros(1))

    def forward(self, x):
        return corr2d(x, self.weight) + self.bias
```

卷积核可以是一种提前设计的模式，但是同时我们也可以通过数据来学习卷积核的权重. 通过比较标签$Y$和预测值$\hat{Y}$的平方误差，我们可以通过梯度下降的方法来更新卷积核的权重.

```python
def train_conv2d(conv2d, X, Y, lr, num_epochs):
    for epoch in range(num_epochs):
        Y_hat = conv2d(X)
        l = (Y_hat - Y) ** 2
        conv2d.zero_grad()
        l.sum().backward()
        conv2d.weight.data[:] -= lr * conv2d.weight.grad
        if (epoch + 1) % 2 == 0:
            print(f'epoch {epoch + 1}, loss {l.item()}')
    return conv2d
```

::: details 一些问题
1. 卷积核的大小如何选择？
2. 设计一些卷积核：表示二阶导数？表示积分？
3. 得到$d$次导数的最小核的大小？
:::

### 池化层

在进入池化层之前，我们同时也需要对填充、步幅、多输入输出通道等概念有一定的了解. 

::: details **填充、步幅、多输入输出通道**

填充和步幅可用于有效地调整数据的维度:

- 填充可以增加输出的高度和宽度. 这常用来使输出与输入具有相同的高和宽. 

- 步幅可以减小输出的高和宽，例如输出的高和宽仅为输入的高和宽的$1/n$. （$n$是一个大于$1$的整数, 可以快速降低输出的维度）

多输入多输出通道可以用来扩展卷积层的模型：

- 多输入通道：可以用来处理多个输入的数据，例如RGB三个通道的图片. 最终的输出是多个通道的输出的叠加.
- 多输出通道：可以将每个通道看作对不同特征的响应，为每个输出通道创建一个形状为$c_i \times k_h \times k_w$的卷积核，这样卷积核的形状就是$c_o \times c_i \times k_h \times k_w$.
- $1 \times 1$ 卷积核用于控制多输入输出通道的维度，从而控制模型的复杂度.

:::

池化层的作用是减少特征的维度，常用的有最大池化和平均池化. 

```python
def pool2d(X, pool_size, mode='max'):
    p_h, p_w = pool_size
    Y = torch.zeros(X.shape[0] - p_h + 1, X.shape[1] - p_w + 1)
    for i in range(Y.shape[0]):
        for j in range(Y.shape[1]):
            if mode == 'max':
                Y[i, j] = X[i: i + p_h, j: j + p_w].max()
            elif mode == 'avg':
                Y[i, j] = X[i: i + p_h, j: j + p_w].mean()
    return Y
```

池化层可以降低卷积层对位置的敏感性，同时降低对空间降采样表示的敏感性. 我们可以指定汇聚层的填充和步幅. 使用最大汇聚层以及大于1的步幅，可减少空间维度（如高度和宽度）.汇聚层的输出通道数与输入通道数相同.
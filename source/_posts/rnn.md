---
title: All you need to know about RNN
date: 2025-04-02 10:53:00
tags: [SUSTech, Machine Learning, RNN]
categories: Machine Learning
toc: true
mathjax: true
---

## Language Modeling

Language modeling is the task of predicting the next word in a sequence.

### Pre-Neural Network Solutions: N-gram Models

{% note [info] %}
An $\ n$-gram is a chunk of $n$ consecutive words.
{% endnote %}

$n$-gram models are based on the Markov assumption: the probability of a word depends only on the previous $\ n-1$ words.

$$
p(x^{t+1}|x^{1}, x^{2}, \cdots, x^{t}) = p(x^{t+1}|x^{t-n+2}, \cdots, x^{t}) = \frac{p(x^{t-n+2}, \cdots, x^{t}, x^{t+1})}{p(x^{t-n+2}, \cdots, x^{t})}
$$

The probability of the sentence is the product of the probabilities of the words, which can be collected from some large corpus. There are two main problems:

1. **Sparsity Problem**: The words might not be in the corpus.
2. **Storage Problem**: Need to store all the n-grams in the corpus.

The generated result is usually grammatically correct but not consistent.

### Neural Network Solutions: Fixed-Window Neural LM

Represent words with embedding vectors; predict the next word using the concatenated embeddings from a fixed context window.

$$
\begin{aligned}
    \text{Input Tokens: } & x^{(1)}, x^{(2)}, x^{(3)}, x^{(4)} \\\\
    \text{Embeddings: } & \mathbf{e} = [\mathbf{e}^{(1)}, \mathbf{e}^{(2)}, \mathbf{e}^{(3)}, \mathbf{e}^{(4)}] \in \mathbb{R}^{4 \times d} \\\\
    \text{Hidden Layer: } & \mathbf{h} = g(\mathbf{W}\mathbf{e}^T + \mathbf{b}) \in \mathbb{R}^{d'} \\\\
    \text{Output Layer: } & \hat{\mathbf{y}} = \text{softmax}(\mathbf{U}\mathbf{h} + \mathbf{c}) \in \mathbb{R}^{|V|}
\end{aligned}
$$

This improves the sparsity problem but gets restricted by the fixed context window. If we want to include more context, we need to increase the window size, which leads to a higher complexity.

### Neural Network Solutions: RNN

### RNN Variants: LSTM

## Sequence Labeling


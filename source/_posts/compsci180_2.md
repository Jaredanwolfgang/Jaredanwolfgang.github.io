---
title: "[COMPSCI 180] Filters and Frequencies"
date: 2025-09-24 10:39:00
tags: [COMPSCI_180]
categories: COMPSCI_180
mathjax: true
---

# Overview

In this project, I explore some interesting features with regards to filters and frequencies and have produced some of the very interesting results. It really hits me that the operations we see in our app are not just so simple as it seems, it actually requires a lot of thinking and implementation.

# Part 1: Fun with Filters

We always start our journey with the simple convolution kernel.

$$
D_x = \begin{bmatrix}
1 & 0 & -1
\end{bmatrix}
\quad \text{and} \quad 
D_y = \begin{bmatrix}
1 \\ 0 \\ -1
\end{bmatrix}
$$

## 1.1 Convolution from scratch

In this part, I implement the convolution using 4 loops and the 2 loops methods. 

For the 4 loops method, I iterate over the output dimensions and then the kernel dimensions to calculate the sum of the product of the image and the kernel.

```python
def conv2d_4loops(image, kernel, padding: Tuple[int, int] = (0, 0)):
    image = np.pad(image, ((padding[0], padding[0]), (padding[1], padding[1])), mode='constant')
    kernel = np.flip(kernel, axis=(0, 1))
    
    im_h, im_w = image.shape
    kh, kw = kernel.shape
    assert kh % 2 == 1 and kw % 2 == 1, "Kernel must have odd dimensions, currently {}x{}".format(kh, kw)
    
    out_h = im_h - kh + 1
    out_w = im_w - kw + 1
    output = np.zeros((out_h, out_w))
    
    for i in range(out_h):
        for j in range(out_w):
            acc = 0.0
            for m in range(kh):
                for n in range(kw):
                    ii = i + m
                    jj = j + n
                    acc += image[ii, jj] * kernel[m, n]
            output[i, j] = acc
    return output
```

We can observe that actually each of the kernel entry is multiplied by the image entry and then summed up, so we can first flip the kernel and use the kernel entries to multiply slice of the image. This avoids the frequent indexing of the image. Here is the implementation of the 2 loops method:

```python
def conv2d_2loops(image, kernel, padding: Tuple[int, int] = (0, 0)):
    image = np.pad(image, ((padding[0], padding[0]), (padding[1], padding[1])), mode='constant')
    im_h, im_w = image.shape
    kh, kw = kernel.shape
    out_h = im_h - kh + 1
    out_w = im_w - kw + 1
    output = np.zeros((out_h, out_w))
    
    kernel = np.flip(kernel, axis=(0, 1))
    
    for i in range(kh):
        for j in range(kw):
            output += image[i:i+out_h, j:j+out_w] * kernel[i, j] # Key Computation
    return output
```

By comparing the two implementations with scipy convolution implementation, we can see that the second method is much faster.

| Method | 4 Loops | 2 Loops | Scipy |
|--------|----------|----------|----------|
| Time (s) | 187.68 | 1.25 | 2.11 |

<div align="center">
    <img src="/images/compsci180/proj_2/1_1.png" alt="Results" width="80%" />
</div>

## 1.2 Finite Difference Operator

In this part, we are trying to detect the edges of the image using the finite difference operator.

<div align="center">
    <img src="/images/compsci180/proj_2/1_2.png" alt="Results" width="80%" />
</div>


The edge detection is simply by calculating the magnitude of the gradient of the image. And then use the threshold to get the edge image. Here I choose 0.15 as the threshold.

```python
grad_mag = np.sqrt(Ix**2 + Iy**2)
threshold = 0.15
edge_image = grad_mag > threshold
```

As we can see, even though we deliberately choose the threshold, the result still contains a lot of noise. 

## 1.3 Derivative of Gaussian (DoG) Filter

Let us try to use the derivative of Gaussian filter to detect the edges to see if we can get rid of the noisy noise. We have two options:

1. Gaussian Blur first and then do Derivative separately
2. Precompute DoG kernels and apply them to the image

<div align="center">
    <img src="/images/compsci180/proj_2/1_3.png" alt="Results" width="80%" />
</div>

As we can see from the results, both methods can help remove the noise. These methods leave a clear edge for the image.

## Bells & Whistles

<div align="center">
    <img src="/images/compsci180/proj_2/bells_and_whistle.png" alt="Results" width="50%" />
</div>

# Part 2: Fun with Frequencies!

## 2.1 Image Sharpening


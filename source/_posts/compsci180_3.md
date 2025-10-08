---
title: "[COMPSCI 180] Image Warping and Mosaicing"
date: 2025-10-06 10:39:00
tags: [COMPSCI_180]
categories: COMPSCI_180
---

# Overview

Here we only demonstrate the first part of the project 3, which aims to implement the image warping and mosaicing process.

# Part A.1: Shoot the Pictures!

To get a perfect picture for the project, I take several tries and summarize some of the rules that we should follow:

1. Try not to move the camera, just try to rotate the camera.
2. Do not take pictures from far away, or the pictures are already at the same plane and the projection effect is not obvious.
3. Try to have more than 30% of overlap between the pictures, or after the projection, your warped image will experience severe distortion.
4. Do not use focal length that captures a wide field of view, this makes the image distorted badly.

After several takes, the pictures took in the main stack library quite fit the requirements. Here is the demonstration:

<div align="center">
    <img src="/images/compsci180/proj_3/main_stack.png" alt="Main Stack Library" width="80%" />
</div>

Also here is another example that I took for the Doe library:

<div align="center">
    <img src="/images/compsci180/proj_3/doe.png" alt="Doe Library" width="80%" />
</div>

I really like the dome structure in the Main Stack Library so I also choose it to make the mosaic.

<div align="center">
    <img src="/images/compsci180/proj_3/dome.png" alt="Main Stack Library" width="80%" />
</div>


# Part A.2: Recover Homographies!

Here we should implement the function `H = computeH(im1_pts,im2_pts)` to compute the homography matrix by using the coordinates of the points in both images.

First we have the transformation matrix $H$ that functions as belows:

$$
\lambda \cdot 
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
H 
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
= 
\begin{bmatrix}
h_1 & h_2 & h_3 \\
h_4 & h_5 & h_6 \\
h_7 & h_8 & h_9
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
$$


For one point, we can transform the above equation to a matrix equation:

$$
\begin{aligned}
\lambda \cdot u_i &= h_1 \cdot x_i + h_2 \cdot y_i + h_3 \\
\lambda \cdot v_i &= h_4 \cdot x_i + h_5 \cdot y_i + h_6 \\
\lambda &= h_7 \cdot x_i + h_8 \cdot y_i + h_9 \\
\end{aligned}
$$

Then we can get the $A$ matrix with regards to one point:

$$
A = 
\begin{bmatrix}
x_i & y_i & 1 & 0 & 0 & 0 & -x_i \cdot u_i & -y_i \cdot u_i \\
0 & 0 & 0 & x_i & y_i & 1 & -x_i \cdot v_i & -y_i \cdot v_i
\end{bmatrix}
\begin{bmatrix}
h_1 \\
h_2 \\
... \\
h_8
\end{bmatrix}
=
\begin{bmatrix}
u_1 \\
v_1 \\
... \\
u_i \\
v_i
\end{bmatrix}
$$

We need at least 4 points to solve for the 9 parameters in $H$ because there are in total 8 degrees of freedom. Write in batch form and we can get:

$$
\begin{bmatrix}
a_1^T \\
a_2^T \\
... \\
a_n^T
\end{bmatrix}
\begin{bmatrix}
h_1 \\
h_2 \\
... \\
h_8
\end{bmatrix}
=
\begin{bmatrix}
u_1 \\
v_1 \\
... \\
u_i \\
v_i
\end{bmatrix}
$$

{% note primary %}
The corresponding points are get from the previous student's work [here](https://cal-cs180.github.io/fa23/hw/proj3/tool.html). Thanks to this brilliant work!
{% endnote %}

Let's have a look at the matching points:

<div align="center">
    <img src="/images/compsci180/proj_3/point_matching.png" alt="Matching Points" width="80%" />
</div>

<div align="center">
    <img src="/images/compsci180/proj_3/point_matching_doe.png" alt="Matching Points" width="80%" />
</div>

<div align="center">
    <img src="/images/compsci180/proj_3/point_matching_dome.png" alt="Matching Points" width="80%" />
</div>


# Part A.3: Warp the Images!

From the above part, we can see that we are getting a good homography matrix, however the images have black vacancies in between because we did not implement the interpolation. In this part, we need to warp the images to align them:

```python
imwarped_nn = warpImageNearestNeighbor(im,H)
imwarped_bil = warpImageBilinear(im,H)
```

Implementing the warping functions we need to be aware of the following things:

1. We are trying to warp the image to the destination image, so we are mapping the coordinates at the exact location of the destination image, but because we are actually taking pictures with the same CoP but differen angle, we have to make a translation afterwards.

2. To decide on the translation, we need to find the minimum and maximum x and y coordinates of the warped image, and then subtract the minimum from the maximum to get the size of the translated image.

3. Then, to calculate the interpolated pixel values, we need to use the inverse of the homography matrix to map the coordinates back to the source image.

Here is the illustration of the translation process, we actually need to matrices, one for the homography transformation $H$ and one for the translation $T$.

<div align="center">
    <img src="/images/compsci180/proj_3/illustration.png" alt="Illustration" width="80%" />
</div>

We first use the rectification process to ensure that our algorithm is actually working. Take a photo that contains a rectangular like in the figure having the N sign. Then we use the matching points as: [[160 260], [300 260], [160 400], [300 400]]. This indicates that we hope to transform the N sign to a square.

<div align="center">
    <img src="/images/compsci180/proj_3/n_transformation.png" alt="Rectification Transformation" width="80%" />
</div>

After testing out the result, I use both functions on the main stack library images and the Doe library images. Here is the result:

<div align="center">
    <img src="/images/compsci180/proj_3/warped_main_stack.png" alt="Main Stack Library Warped" width="80%" />
</div>

<div align="center">
    <img src="/images/compsci180/proj_3/warped_doe.png" alt="Doe Library Warped" width="80%" />
</div>

<div align="center">
    <img src="/images/compsci180/proj_3/warped_dome.png" alt="Dome Library Warped" width="80%" />
</div>

| Image | Nearest Neighbor | Bilinear | Point Number |
| ----- | ---------------- | --------- | ------------ |
| Main Stack Library | 18.39 seconds | 30.15 seconds | 10 |
| Doe Library Left | 4.46 seconds | 6.94 seconds | 9 | 
| Doe Library Right | 2.94 seconds | 4.62 seconds | 10 |
| Dome Library Left | 2.42 seconds | 3.99 seconds | 10 |
| Dome Library Right | 2.42 seconds | 3.91 seconds | 9 |


The time taken for both method is shown in the table above. We can see that the nearest neighbor method is usually faster than the bilinear method. As for the image quality, we can see in general both methods can produce a good result. However, if we zoom in on the upper left corner, we can see that using bilinear method can produce a smoother result. (There are these zigzag patterns in the line of the nearest neighbor method.)

# Part A.4: Blend the Images into a Mosaic

For this part, we need to be careful about the size of the images because of the stretch and all the black vacancies. Also, we need to make sure that the mask is working properly. Here is an illustration of blending:

<div align="center">
    <img src="/images/compsci180/proj_3/blending.png" alt="Blending" width="80%" />
</div>

There is one thing that I need to stress that the size of the two original images might not have the same size.

1. We need to find the warped image coordinates in the system of the reference image.
2. Then we need to find the coordinates in the system of the reference image in the final image.

Here in this part, I use the Laplacian blending to blend the images together. However, usually the transformed images are big in size, therefore calculating the whole images will be very time-consuming. I try to calculate the overlap part of the original images and the warped images and then only blend the overlap part. This helps accelerate the process.

Therefore the whole 2-image blending process can be summarized as:

1. **Warp & Align**
   - Warp `image_homo` to align with `image_ref` using homography `H`
   - Calculate alignment info: shifts, final canvas size, and overlap mask region

2. **Extract Overlap Region**
   - Extract the overlapping pixels from both the warped image and reference image
   - Create a binary blend mask (left half = 1, right half = 0)

3. **Build Pyramids**
   - Create **Laplacian stacks** for each RGB channel of both overlap regions (multi-resolution frequency decomposition)
   - Create **Gaussian stack** of the blend mask (smooth transition weights)

4. **Stack RGB Channels**
   - Combine R, G, B Laplacian stacks into color pyramids

5. **Blend at Each Pyramid Level**
   - At each frequency level: $blended = warped \times mask + reference \times (1 - mask)$
   - This blends high frequencies sharply and low frequencies smoothly

6. **Reconstruct Final Blend**
   - Collapse the blended pyramid: start from coarsest level, add each finer level
   - Normalize the result

7. **Compose Final Panorama**
   - For each pixel in the final canvas:
     - If in overlap region: use blended result (seamless transition)
     - Else if in reference image: use reference directly
     - Else if in warped image: use warped directly
  
Here is the Laplacian stack of the warped images:

<div align="center">
    <img src="/images/compsci180/proj_3/stack_warped.png" alt="Laplacian Stack for warped images" width="80%" />
</div>

And here is the Laplacian stack of the original images:

<div align="center">
    <img src="/images/compsci180/proj_3/stack_original.png" alt="Laplacian Stack Original" width="80%" />
</div>

The gaussian stack for the mask:

<div align="center">
    <img src="/images/compsci180/proj_3/stack_mask.png" alt="Gaussian Stack for mask" width="80%" />
</div>

And here is the result of the blending for the main stack library:

<div align="center">
    <div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
        <img src="/images/compsci180/proj_3/library_0.jpg" alt="Left" style="max-width: 30%; height: auto;" />
        <img src="/images/compsci180/proj_3/library_1.jpg" alt="Right" style="max-width: 30%; height: auto;" />
        <img src="/images/compsci180/proj_3/blending_result.png" alt="Tom Holland" style="max-width: 30%; height: auto;" />
    </div>
</div>

The blending process for three images is basically the same as the two images. We need to warp the left and the right images to the middle image and then blend them together. Here is the result for the Doe library:

<div align="center">
    <img src="/images/compsci180/proj_3/doe.png" alt="Doe Library" width="80%" />
    <img src="/images/compsci180/proj_3/doe_blending_result.png" alt="Doe Library" width="80%" />
</div>

Here is the result for the dome of the Main Stack Library:

<div align="center">
    <img src="/images/compsci180/proj_3/dome.png" alt="Dome Library" width="80%" />
    <img src="/images/compsci180/proj_3/dome_blending_result.png" alt="Dome Library" width="80%" />
</div>

Although there are still this inconsistencies on the color and the size, the results are still quite good.


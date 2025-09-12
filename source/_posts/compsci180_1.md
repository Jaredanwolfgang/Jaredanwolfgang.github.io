---
title: "[COMPSCI 180] Colorize the History"
date: 2025-09-11 10:39:00
tags: [COMPSCI_180]
categories: COMPSCI_180
post_cover: /images/compsci180/proj_1/flight.png
post_cover_height: 250
mathjax: true
---
## Overview

This project focuses on colorizing historical black and white images by aligning three separate color channels (red, green, and blue) that were captured using different filters. The main challenge is that these channels are often misaligned due to camera movement between exposures, requiring precise alignment algorithms to reconstruct the original color image. I implemented a multi-scale pyramid alignment algorithm using normalized cross-correlation (NCC) as the similarity metric. 

### Approach

The approach works by:

1. **Image Preprocessing**: Crop border (10% from each edge) to eliminate artifacts that could interfere with alignment
2. **Multi-scale Alignment**: Build image pyramids to handle large displacements efficiently
3. **Normalized Cross-Correlation**: Use NCC to find optimal alignment offsets between color channels
4. **Edge-based Alignment**: Sobel edge detection followed by NCC on the edge maps to solve Emir case

# Part 1: Start with the simple example

To start the project, I start with the simple smaller example `monastry.jpg` and `cathedral.jpg`. After cropping the image into three separate parts (b, g, r), each part has a size of around (341, 390). While we are suggested to use alignment to align three different channels, naively calculating the result will lead to this:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/cathedral_naive.jpg" alt="Cathedral Naive" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Cathedral - Naive Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (1, -1), Red shift: (7, -1)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 1.13 seconds</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/monastery_naive.jpg" alt="Monastery Naive" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Monastery - Naive Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (-6, 0), Red shift: (9, 1)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 1.15 seconds</div>
  </div>
</div>

We can see that the naive implementation is not good enough, the actual building is not aligned. Why is this happening? In the alignment process, I am using normalized cross-correlation to align the image. The normalized cross-correlation is a measure of the similarity between two images. The higher the normalized cross-correlation, the more similar the two images are. To find out the reason, I print out all the channels and we can see that there are borders along the edges of the image, and these borders contribute to the high normalized cross-correlation score.

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/monastery_blue_naive.jpg" alt="Monastery Blue Naive" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Monastery Blue Channel</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/monastery_green_naive.jpg" alt="Monastery Green Naive" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Monastery Green Channel</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/monastery_red_naive.jpg" alt="Monastery Red Naive" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Monastery Red Channel</div>
  </div>
</div>

Therefore, I choose to crop the image borders (each by 10% of the width and height) to get the following result:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/cathedral.jpg" alt="Cathedral" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Cathedral - Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (5, 2), Red shift: (12, 3)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 0.82 seconds</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/monastery.jpg" alt="Monastery" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Monastery - Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (-3, 2), Red shift: (3, 2)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 0.91 seconds</div>
  </div>
</div>

# Part 2: Play with Image Pyramid

To cope with larger files, I implement the image pyramid to downsample the image. This is because the simple way of aligning the image is of $O(n^2)$ complexity for the search range. For a larger image, the search range will be larger, and the compute time will be intolerable. 

By downsampling the image, we can first conduct a coarse alignment on the smaller image, upsample the image to the original size, and then conduct a finer alignment with smaller search range. This way, we can avoid the expensive computation of the large image.

| Image               | Shape        | Regular Time (s) | Pyramid Time (s) | Speedup  | Green Shift (Reg → Pyr) | Red Shift (Reg → Pyr) |
|---------------------|-------------|------------------|------------------|----------|--------------------------|-----------------------|
| emir.tif            | 2570×2963   | 126.24           | 14.13            | 8.94×    | (15, 15) → (49, 24)      | (15, -4) → (26, -829) |
| italil.tif          | 2586×2978   | 133.96           | 10.31            | 12.99×   | (15, 15) → (38, 21)      | (15, 15) → (76, 35)   |
| church.tif          | 2563×2909   | 131.11           | 21.51            | 6.09×    | (15, 4) → (25, 4)        | (15, -13) → (58, -4)  |
| three_generations.tif | 2570×2973 | 114.83           | 8.26             | 13.90×   | (15, 12) → (53, 14)      | (15, 8) → (112, 11)   |
| lugano.tif          | 2597×3026   | 110.24           | 9.02             | 12.23×   | (15, -15) → (41, -16)    | (15, -15) → (92, -29) |
| melons.tif          | 2594×3017   | 103.43           | 7.81             | 13.25×   | (15, 3) → (81, 10)       | (15, 10) → (178, 13)  |
| lastochikino.tif    | 2594×2961   | 99.84            | 7.50             | 13.30×   | (-2, -2) → (-2, -2)      | (15, 0) → (75, -8)    |
| icon.tif            | 2597×2994   | 96.98            | 7.65             | 12.68×   | (15, 15) → (41, 17)      | (0, 15) → (89, 23)    |
| siren.tif           | 2601×3056   | 121.68           | 9.88             | 12.32×   | (15, -7) → (49, -6)      | (15, -15) → (95, -25) |
| self_portrait.tif   | 2602×3049   | 127.43           | 10.11            | 12.60×   | (15, 15) → (78, 29)      | (15, 15) → (176, 37)  |
| harvesters.tif      | 2577×2948   | 118.20           | 10.04            | 11.77×   | (15, 15) → (59, 16)      | (15, 6) → (124, 13)   |

We can see that if we use the naive implementation, most of the images will reach the shifting bound. However, with the image pyramid, the pictures are allowed to align with each other from a larger search range, thus leading to a much better result. The results from pyramid are here:

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/emir_pyramid.jpg" alt="Emir Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Emir - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/italil_pyramid.jpg" alt="Italil Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Italil - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/church_pyramid.jpg" alt="Church Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Church - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/three_generations_pyramid.jpg" alt="Three Generations Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Three Generations - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/lugano_pyramid.jpg" alt="Lugano Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Lugano - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/melons_pyramid.jpg" alt="Melons Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Melons - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/lastochikino_pyramid.jpg" alt="Lastochikino Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Lastochikino - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/icon_pyramid.jpg" alt="Icon Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Icon - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/siren_pyramid.jpg" alt="Siren Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Siren - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/self_portrait_pyramid.jpg" alt="Self Portrait Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Self Portrait - Pyramid Result</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/harvesters_pyramid.jpg" alt="Harvesters Pyramid" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Harvesters - Pyramid Result</div>
  </div>
</div>

It is really interesting though that one of the images produced by the pyramid has relatively large shift error, which is the `emir.tif`. As mentioned in the project description:

>
> Note that in the case like the Emir of Bukhara (show on right), the images to be matched do not actually have the same brightness values (they > are different color channels), so you might have to use a cleverer metric, or different features than the raw pixels.
>

Therefore, I separately implement a different metric to align the image. I use the sobel kernel to extract the edges of the image, and then use the normalized cross-correlation to align the image. Here you can see the edges are much more aligned.

<div style="display: center">
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin: 32px 0;">
    <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
      <img src="/images/compsci180/proj_1/emir_green.png" alt="Emir First Channel" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
      <div style="font-size: 1.1em; color: #333; font-weight: 600;">Emir First Channel</div>
    </div>
    <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
      <img src="/images/compsci180/proj_1/emir_red.png" alt="Emir Second Channel" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
      <div style="font-size: 1.1em; color: #333; font-weight: 600;">Emir Second Channel</div>
    </div>
    <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
      <img src="/images/compsci180/proj_1/emir_blue.png" alt="Emir Reference Channel" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
      <div style="font-size: 1.1em; color: #333; font-weight: 600;">Emir Reference Channel</div>
    </div>
  </div>
</div>
The result of the emir image is shown below:

<div style="display: grid; grid-template-columns: 0.5fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/emir.jpg" alt="Emir" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Emir - Result</div>
  </div>
</div>

# Part 3: Self-selected Example

I have selected two more examples from the gallery, naming the house and the lake. And here are the results:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/house.jpg" alt="House" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">House - Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (26, 18), Red shift: (121, 35)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 10.93 seconds</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_1/lake.jpg" alt="Lake" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 1/1; object-fit: cover;">
    <div style="font-size: 1.1em; color: #333; font-weight: 600;">Lake - Result</div>
    <div style="font-size: 0.9em; color: #666;">Green shift: (-22, 8), Red shift: (-33, 10)</div>
    <div style="font-size: 0.9em; color: #666;">Time taken: 21.70 seonds</div>
  </div>
</div>
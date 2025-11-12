---
title: "[COMPSCI 180] Neural Radiance Field!"
date: 2025-11-09 10:00:00
tags: [COMPSCI_180]
categories: COMPSCI_180
---

# Part 0: Calibrating Your Camera and Capture a 3D Scan!

Here is the 3D scan of my doggy! You can drag and scroll to explore different views.

<div class="doggy-render-spin"
     data-frame-count="19"
     tabindex="0"
     role="region"
     aria-label="Interactive render viewer">
  <img id="doggyRenderSpinImage"
       src="/images/compsci180/proj_4/doggy_render_view/render_0.png"
       alt="Interactive render perspective preview"
       loading="lazy"
       draggable="false" />
  <div class="doggy-render-spin__hint">Drag or scroll to explore different views</div>
</div>

# Part 1: Fit a Neural Field to a 2D Image

## Part 1.1: Model Architecture

| Property | Description |
| --- | --- |
| **Model Type** | Multi-Layer Perceptron (MLP) with sinusoidal positional encoding |
| **Purpose** | 2D coordinate-based neural radiance field (NeRF-style) for image regression |
| **Input** | 2D spatial coordinates `(x, y)` |
| **Output** | RGB color values `(r, g, b)` in range `[0, 1]` |
| **Number of HiddenLayers** | 3 |
| **Layer Width** | 128 |
| **Sinusoidal Encoding** | Sinusoidal encoding with `L = 10` frequency bands |
| **Activation Function** | ReLU for hidden layers, Sigmoid for output |
| **Optimizer** | Adam |
| **Learning Rate** | `1e-2` |
| **Loss Function** | Mean Squared Error (MSE) |

## Part 1.2: Training progression visualization

<div class="train-slider">
  <div class="train-slider__controls">
    <label for="trainStepSlider_part1" class="train-slider__label">
      <span>
        <strong>Training Step (Standard Image):</strong>
        <span id="trainStepValue_2">0</span>
      </span>
      <span>
        <strong>Training Step (Self-Chosen Image):</strong>
        <span id="trainStepValue_3">0</span>
      </span>
    </label>
    <input type="range"
           id="trainStepSlider_part1"
           min="0"
           max="10"
           step="1"
           value="0" />
  </div>
  <div class="train-slider__layout train-slider__layout--side-by-side">
    <div class="train-slider__image-wrapper">
      <img id="trainStepImage_2"
           src="/images/compsci180/proj_4/part1_results/iter_0.png"
           alt="Part 1.2: Training progression visualization"
           loading="lazy" />
    </div>
    <div class="train-slider__image-wrapper">
      <img id="trainStepImage_3"
           src="/images/compsci180/proj_4/part1_results/iter_0_self.png"
           alt="Part 1.2: Training progression visualization"
           loading="lazy" />
    </div>
  </div>
</div>

## Part 1.3: Grid for demonstrating the effect of hidden dimensions and L

| Dimension/L (dB) | 4 | 10 | 16 | 25 |
| --- | --- | --- | --- | --- |
| [128, 128, 128] | 26.03 | 27.81 | 27.67 | 27.44 |
| [256, 256, 256] | 26.01 | 28.33 | **28.42** | 27.69 |

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem 1rem; justify-content: center; margin: 2rem 0;">
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/128_128_128_4.png" alt="[4, 128, 128, 128]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/128_128_128_10.png" alt="[10, 128, 128, 128]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/128_128_128_16.png" alt="[16, 128, 128, 128]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/128_128_128_25.png" alt="[25, 128, 128, 128]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/256_256_256_4.png" alt="[4, 256, 256, 256]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/256_256_256_10.png" alt="[10, 256, 256, 256]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/256_256_256_16.png" alt="[16, 256, 256, 256]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
  <div style="flex: 1 1 180px; max-width: 24%; min-width: 160px; text-align: center;">
    <img src="/images/compsci180/proj_4/part1_results/256_256_256_25.png" alt="[25, 256, 256, 256]" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.10);margin-bottom:0.5rem;">
  </div>
</div>

## Part 1.4: PSNR Curve when training

This is the PSNR curve and Loss curve when training with the self-chosen image. The dimensions are [128, 128, 128] and L = 10.

<div class="psnr-curve">
  <img src="/images/compsci180/proj_4/part1_results/psnr_curve_self.png" alt="PSNR Curve" loading="lazy">
</div>

# Part 2: Fit a Neural Radiance Field from Multi-view Images

Now we move on to the more challenging part of implementing a Neural Radiance Field from multi-view images.

## Part 2.1: Brief Introduction 

The NeRF model part can be devided into the following steps:

1. We first need to calculate the rays from the cameras.
2. After we get the rays, we need to sample the points along the rays.
3. We need to implement the models, the models take the point coordinates and the camera rays as input and output the color and density of the point.
4. Then we need to integrate the density along the ray to get the final color of the ray.

### Calculate rays from cameras

Follow the instruction given, I implement 3 functions for calculating the rays from cameras namly:

1. `transfrom` : This function transforms a point from the camera coordinates to world coordinates. (Extrinsic Transformation Matrix)
2. `pixel_to_camera` : This function transforms a pixel to the camera coordinates. (Intrinsic Transformation Matrix)
3. `pixel_to_ray` : This function transforms a pixel to the ray direction in the camera coordinates. It first us the `pixel_to_camera` to get the camera coordinates of the pixel, then use the camera coordinates to get the ray direction in the camera coordinates. `ray_o` represents the camera origin direction in the world coordinates and `ray_d` represents the ray direction in the world coordinates.

After the process, we can get the rays in the world coordinates. Then we can sample the points along the rays to get the color and density of the point.

### Sample points along the ray

Here I just implement a class `RaysData` for handling all the arrays in a group of images. Inside the class, I implement the function `sample_rays` by first sampling `num_images` number of images from the image pool and then sample `tot_samples/num_images` number of rays for each image.

After sampling the rays, we need to sample along the rays by using the `sample_along_rays` function. This function is implemented by first sampling `num_samples` number of points along the ray and then transform the points to the world coordinates.

### Implement the models

Here I implement a class `NeRF3D` inheriting from `torch.nn.Module` class. The class is used to implement the NeRF model. 

| **Component**                  | **Input**              | **Output**                   | **Description**                            |
| ------------------------------ | ---------------------- | ---------------------------- | ------------------------------------------ |
| **Inputs**                     | `x ∈ ℝ³`, `ray_d ∈ ℝ³` | —                            | 3D point and ray direction                 |
| **Position Encoding (x)**      | `(B, 3)`               | `(B, 63)`                    | 10-frequency sinusoidal encoding           |
| **Direction Encoding (ray_d)** | `(B, 3)`               | `(B, 27)`                    | 4-frequency sinusoidal encoding            |
| **MLP Trunk**                  | `(B, 63)`              | `(B, 256)`                   | 4-layer MLP with ReLU activations          |
| **Skip Block**                 | `(B, 256 + 63)`        | `(B, 256)`                   | Combines trunk output and encoded position |
| **Density Head**               | `(B, 256)`             | `(B, 1)`                     | Predicts volume density (Softplus)         |
| **Feature Layer**              | `(B, 256)`             | `(B, 256)`                   | Latent feature for color prediction        |
| **Color Head**                 | `(B, 256 + 27)`        | `(B, 3)`                     | Predicts RGB color (Sigmoid)               |
| **Outputs**                    | —                      | `density ∈ ℝ¹`, `color ∈ ℝ³` | Final NeRF outputs per sample              |

### Integrate the density along the ray

Then after we put the 3D coordinates and rays into the model, we can get the density and the color of the point. Then we need to integrate the density along the ray to get the final color of the ray by implementing the `volrend` function.

In the function, we use the `t_val` from the `sample_along_rays` function to know that after the purtubation what is the distance between each sample point. Then we can use the density to integrate the color along the ray.

### Training the model

Then we set the optimizer to be Adam and the loss function to be the mean squared error. We then train the model for 1000/5000/10000 steps based on the task we have.

## Part 2.2: Visualization of rays and samples with cameras

This is the visualization of rays and samples with cameras. We can see that the rays are sampled from the camera and the samples are sampled from the rays.

<div class="render-spin"
     data-frame-count="32"
     tabindex="0"
     role="region"
     aria-label="Interactive render viewer">
  <img id="renderSpinImage"
       src="/images/compsci180/proj_4/render-view/render_0.png"
       alt="Interactive render perspective preview"
       loading="lazy"
       draggable="false" />
  <div class="render-spin__hint">Drag or scroll to explore different views</div>
</div>

## Part 2.3: Training visualization / PSNR curve

<div class="train-slider">
  <div class="train-slider__controls">
    <label for="trainStepSlider" class="train-slider__label">
      <span>
        <strong>Training Step:</strong>
        <span id="trainStepValue_0">50</span>
      </span>
      <span>
        <strong>PSNR:</strong>
        <span id="psnrValue_0">11.61</span> dB
      </span>
    </label>
    <input type="range"
           id="trainStepSlider"
           min="50"
           max="1000"
           step="50"
           value="50" />
  </div>
  <div class="train-slider__layout">
    <div class="train-slider__image-wrapper">
      <img id="trainStepImage_0"
           src="/images/compsci180/proj_4/train_val/50_1000_0.png"
           alt="Validation sample at step 50"
           loading="lazy" />
    </div>
    <div class="train-slider__chart-wrapper">
      <canvas id="psnrChart_0" aria-label="PSNR curve across training steps"></canvas>
    </div>
  </div>
  <div class="train-slider__controls">
    <label for="trainStepSlider" class="train-slider__label">
      <span>
        <strong>Training Step:</strong>
        <span id="trainStepValue_1">50</span>
      </span>
      <span>
        <strong>PSNR:</strong>
        <span id="psnrValue_1">24.1</span> dB
      </span>
    </label>
  </div>
  <div class="train-slider__layout">
    <div class="train-slider__image-wrapper">
      <img id="trainStepImage_1"
           src="/images/compsci180/proj_4/train_val/50_1000_1.png"
           alt="Validation sample at step 50"
           loading="lazy" />
    </div>
    <div class="train-slider__chart-wrapper">
      <canvas id="psnrChart_1" aria-label="PSNR curve across training steps"></canvas>
    </div>
  </div>
</div>

## Part 2.4: Spherical rendering video

After training the model, we can render the test scenes in spherical coordinates.

<div class="video_result">
  <div class="video_result__label">
    <strong>Test Video</strong>
  </div>
  <video src="/images/compsci180/proj_4/test.mp4"
         controls
         aria-label="Test video for training run"></video>
</div>

# Part 2.6 Training with Your Own Data

The training data that I use is a doggy of mine. Here is the demonstration of the data:

<div class="psnr-curve">
  <img src="/images/compsci180/proj_4/doggy_data.jpg" alt="Doggy Data" loading="lazy">
</div>

I have taken in total 38 images of the doggy from different angles and different distances. I try to keep the distance of the camera nearly the same for each image. After ArUco tags detection, only 29 images survive with having ID 4 tags in the image. Using the 28 of the images for training and the other 1 image for validation, I get the following results:


<div class="video_result">
  <div class="video_result__label">
    <strong>Test Video</strong>
  </div>
  <video src="/images/compsci180/proj_4/self_test.mp4"
         controls
         aria-label="Test video for own data"></video>
</div>

## Hyperparameter Tuning

Here I tune the hyperparameters of the model to get the best performance. I tune the following hyperparameters:

1. Sample `near` and `far` distance from the camera.
2. Sample `num_samples` number of points along the ray.
3. Training steps

These parameters are important as if we choose the distance too far, it has high possibility that those points are occluded and therefore do not contribute to the final color of the ray. Also, if we sample too few points, it will not be able to capture the details of the scene and will lead to some bad holes in the rendering.

## Training loss over iterations

<div class="psnr-curve">
  <img src="/images/compsci180/proj_4/doggy_loss.png" alt="Doggy Loss Curve" loading="lazy">
</div>

## Intermediate renders of the scene during training

Here are the intermediate renders of the scene during training. We can see that the model is able to fit the training data well.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
  const renderSpin = document.querySelector('.render-spin');
  const doggyRenderSpin = document.querySelector('.doggy-render-spin');
  if (renderSpin && doggyRenderSpin) {
    const frameCount = Number(renderSpin.dataset.frameCount) || 32;
    const doggyFrameCount = Number(doggyRenderSpin.dataset.frameCount) || 19;
    const renderImage = document.getElementById('renderSpinImage');
    const doggyRenderImage = document.getElementById('doggyRenderSpinImage');
    const renderHint = renderSpin.querySelector('.render-spin__hint');
    const doggyRenderHint = doggyRenderSpin.querySelector('.doggy-render-spin__hint');
    const renderBasePath = '/images/compsci180/proj_4/';
    const frames = Array.from({ length: frameCount }, (_, idx) => `${renderBasePath}render-view/render_${idx}.png`);
    const doggyRenderFrames = Array.from({ length: doggyFrameCount }, (_, idx) => `${renderBasePath}doggy_render_view/render_${idx}.png`);
    const preloadedFrames = new Array(frameCount);
    const preloadedDoggyFrames = new Array(doggyFrameCount);
    let currentFrame = 0;
    let doggyCurrentFrame = 0;
    let startX = 0;
    let doggyStartX = 0;
    let isPointerDown = false;
    let isDoggyPointerDown = false;
    const dragSensitivity = 6;

    function preloadFrame(index) {
      const normalized = ((index % frameCount) + frameCount) % frameCount;
      if (preloadedFrames[normalized]) return;
      const image = new Image();
      image.src = frames[normalized];
      preloadedFrames[normalized] = image;
    }
    function preloadDoggyFrame(index) {
      const normalized = ((index % doggyFrameCount) + doggyFrameCount) % doggyFrameCount;
      if (preloadedDoggyFrames[normalized]) return;
      const image = new Image();
      image.src = doggyRenderFrames[normalized];
      preloadedDoggyFrames[normalized] = image;
    }

    function updateFrame(index) {
      const normalized = ((index % frameCount) + frameCount) % frameCount;
      if (!renderImage || normalized === currentFrame) return;
      currentFrame = normalized;
      renderImage.src = frames[currentFrame];
      renderImage.alt = `Interactive render perspective ${currentFrame + 1} of ${frameCount}`;
      preloadFrame(currentFrame + 1);
      preloadFrame(currentFrame - 1);
    }

    function updateDoggyFrame(index) {
      const normalized = ((index % doggyFrameCount) + doggyFrameCount) % doggyFrameCount;
      if (!doggyRenderImage || normalized === doggyCurrentFrame) return;
      doggyCurrentFrame = normalized;
      doggyRenderImage.src = doggyRenderFrames[doggyCurrentFrame];
      doggyRenderImage.alt = `Interactive render perspective ${doggyCurrentFrame + 1} of ${doggyFrameCount}`;
      preloadDoggyFrame(doggyCurrentFrame + 1);
      preloadDoggyFrame(doggyCurrentFrame - 1);
    }

    function markInteracted() {
      if (renderHint) {
        renderHint.classList.add('render-spin__hint--hidden');
      }
      if (doggyRenderHint) {
        doggyRenderHint.classList.add('doggy-render-spin__hint--hidden');
      }
    }

    renderSpin.addEventListener('pointerdown', (event) => {
      isPointerDown = true;
      startX = event.clientX;
      renderSpin.setPointerCapture(event.pointerId);
      markInteracted();
    });

    doggyRenderSpin.addEventListener('pointerdown', (event) => {
      isDoggyPointerDown = true;
      doggyStartX = event.clientX;
      doggyRenderSpin.setPointerCapture(event.pointerId);
      if (doggyRenderHint) {
        doggyRenderHint.classList.add('doggy-render-spin__hint--hidden');
      }
    });

    renderSpin.addEventListener('pointermove', (event) => {
      if (!isPointerDown) return;
      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) >= dragSensitivity) {
        const frameDelta = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / dragSensitivity);
        updateFrame(currentFrame - frameDelta);
        startX = event.clientX;
      }
    });

    doggyRenderSpin.addEventListener('pointermove', (event) => {
      if (!isDoggyPointerDown) return;
      const deltaX = event.clientX - doggyStartX;
      if (Math.abs(deltaX) >= dragSensitivity) {
        const frameDelta = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / dragSensitivity);
        updateDoggyFrame(doggyCurrentFrame - frameDelta);
        doggyStartX = event.clientX;
      }
    });

    const releasePointer = (event) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      try {
        renderSpin.releasePointerCapture(event.pointerId);
      } catch (error) {
        // ignore if pointer already released
      }
    };

    const releaseDoggyPointer = (event) => {
      if (!isDoggyPointerDown) return;
      isDoggyPointerDown = false;
      try {
        doggyRenderSpin.releasePointerCapture(event.pointerId);
      } catch (error) {
        // ignore if pointer already released
      }
    };

    doggyRenderSpin.addEventListener('pointerup', releaseDoggyPointer);
    doggyRenderSpin.addEventListener('pointercancel', releaseDoggyPointer);
    doggyRenderSpin.addEventListener('pointerleave', () => {
      isDoggyPointerDown = false;
    });

    renderSpin.addEventListener('pointerup', releasePointer);
    renderSpin.addEventListener('pointercancel', releasePointer);
    renderSpin.addEventListener('pointerleave', () => {
      isPointerDown = false;
    });

    renderSpin.addEventListener('wheel', (event) => {
      event.preventDefault();
      if (!event.deltaY && !event.deltaX) return;
      markInteracted();
      const direction = event.deltaY || event.deltaX;
      const step = direction > 0 ? 1 : -1;
      updateFrame(currentFrame + step);
    }, { passive: false });

    doggyRenderSpin.addEventListener('wheel', (event) => {
      event.preventDefault();
      if (!event.deltaY && !event.deltaX) return;
      if (doggyRenderHint) {
        doggyRenderHint.classList.add('doggy-render-spin__hint--hidden');
      }
      const direction = event.deltaY || event.deltaX;
      const step = direction > 0 ? 1 : -1;
      updateDoggyFrame(doggyCurrentFrame + step);
    }, { passive: false });

    renderSpin.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        markInteracted();
        updateFrame(currentFrame + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        markInteracted();
        updateFrame(currentFrame - 1);
      }
    });

    doggyRenderSpin.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        if (doggyRenderHint) {
          doggyRenderHint.classList.add('doggy-render-spin__hint--hidden');
        }
        updateDoggyFrame(doggyCurrentFrame + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (doggyRenderHint) {
          doggyRenderHint.classList.add('doggy-render-spin__hint--hidden');
        }
        updateDoggyFrame(doggyCurrentFrame - 1);
      }
    });

    if (renderImage) {
      renderImage.alt = `Interactive render perspective 1 of ${frameCount}`;
    }
    if (doggyRenderImage) {
      doggyRenderImage.alt = `Interactive render perspective 1 of ${doggyFrameCount}`;
    }
    preloadFrame(0);
    preloadDoggyFrame(0);
    preloadFrame(1);
    preloadDoggyFrame(1);
    if (renderHint) {
      renderHint.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && renderHint.classList.contains('render-spin__hint--hidden')) {
          renderHint.style.display = 'none';
        }
      });
    }
    if (doggyRenderHint) {
      doggyRenderHint.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && doggyRenderHint.classList.contains('doggy-render-spin__hint--hidden')) {
          doggyRenderHint.style.display = 'none';
        }
      });
    }
  }

  const slider = document.getElementById('trainStepSlider');
  const slider_part1 = document.getElementById('trainStepSlider_part1');
  const valueLabel_0 = document.getElementById('trainStepValue_0');
  const valueLabel_1 = document.getElementById('trainStepValue_1');
  const valueLabel_2 = document.getElementById('trainStepValue_2');
  const valueLabel_3 = document.getElementById('trainStepValue_3');
  const image_0 = document.getElementById('trainStepImage_0');
  const image_1 = document.getElementById('trainStepImage_1');
  const image_2 = document.getElementById('trainStepImage_2');
  const image_3 = document.getElementById('trainStepImage_3');
  const psnrLabel_0 = document.getElementById('psnrValue_0');
  const psnrLabel_1 = document.getElementById('psnrValue_1');
  const basePath = '/images/compsci180/proj_4/train_val/';
  const steps = [
    50, 100, 150, 200, 250,
    300, 350, 400, 450, 500,
    550, 600, 650, 700, 750,
    800, 850, 900, 950, 1000
  ];
  // Mapping arrays for Part 1.2: 11 images each
  // Image 2: steps from 0 to 500 with step size 50
  const steps_part1_2 = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
  // Image 3: steps from 0 to 1000 with step size 100
  const steps_part1_3 = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const psnrValues_0 = [
    11.61, 12.83, 16.75, 17.96, 18.86,
    19.31, 19.89, 20.42, 20.86, 21.36,
    21.48, 21.96, 22.23, 22.74, 22.94,
    23.04, 23.23, 23.25, 23.71, 23.83
  ];
  const psnrValues_1 = [
    9.51, 10.22, 15.25, 17.89, 19.73,
    20.06, 21.15, 21.53, 22.04, 22.28,
    22.74, 22.97, 23.22, 23.57, 23.75,
    24.07, 23.91, 24.38, 24.51, 24.53
  ];

  const defaultPointColor = '#2196f3';
  const highlightPointColor = '#e53935';

  const chartContext_0 = document.getElementById('psnrChart_0').getContext('2d');
  const psnrChart_0 = new Chart(chartContext_0, {
    type: 'line',
    data: {
      labels: steps,
      datasets: [{
        label: 'PSNR (dB)',
        data: psnrValues_0,
        borderColor: defaultPointColor,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.25,
        pointRadius: steps.map(() => 3),
        pointHoverRadius: 6,
        pointBackgroundColor: steps.map(() => defaultPointColor),
        pointBorderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `PSNR: ${context.parsed.y.toFixed(2)} dB`
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Training Step'
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'PSNR (dB)'
          },
          suggestedMin: Math.floor(Math.min(...psnrValues_0)) - 1,
          suggestedMax: Math.ceil(Math.max(...psnrValues_0)) + 1
        }
      }
    }
  });
  const chartContext_1 = document.getElementById('psnrChart_1').getContext('2d');
  const psnrChart_1 = new Chart(chartContext_1, {
    type: 'line',
    data: {
      labels: steps,
      datasets: [{
        label: 'PSNR (dB)',
        data: psnrValues_1,
        borderColor: defaultPointColor,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.25,
        pointRadius: steps.map(() => 3),
        pointHoverRadius: 6,
        pointBackgroundColor: steps.map(() => defaultPointColor),
        pointBorderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `PSNR: ${context.parsed.y.toFixed(2)} dB`
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Training Step'
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'PSNR (dB)'
          },
          suggestedMin: Math.floor(Math.min(...psnrValues_1)) - 1,
          suggestedMax: Math.ceil(Math.max(...psnrValues_1)) + 1
        }
      }
    }
  });

  function highlightChartPoint_0(step) {
    const index = steps.indexOf(Number(step));
    if (index === -1) return;

    const dataset = psnrChart_0.data.datasets[0];
    dataset.pointBackgroundColor = steps.map(() => defaultPointColor);
    dataset.pointRadius = steps.map(() => 3);

    dataset.pointBackgroundColor[index] = highlightPointColor;
    dataset.pointRadius[index] = 6;

    psnrChart_0.update('none');
  }

  function updatePreview_0() {
    const step = slider.value;
    valueLabel_0.textContent = step;
    const imageName = `${step}_1000_0.png`;
    image_0.src = `${basePath}${imageName}`;
    image_0.alt = `Validation sample at step ${step}`;
    const index = steps.indexOf(Number(step));
    if (index !== -1) {
      const psnr = psnrValues_0[index];
      psnrLabel_0.textContent = psnr.toFixed(1);
      highlightChartPoint_0(step);
    } else {
      psnrLabel_0.textContent = '—';
    }
  }

  function highlightChartPoint_1(step) {
    const index = steps.indexOf(Number(step));
    if (index === -1) return;

    const dataset = psnrChart_1.data.datasets[0];
    dataset.pointBackgroundColor = steps.map(() => defaultPointColor);
    dataset.pointRadius = steps.map(() => 3);

    dataset.pointBackgroundColor[index] = highlightPointColor;
    dataset.pointRadius[index] = 6;

    psnrChart_1.update('none');
  }

  function updatePreview_1() {
    const step = slider.value;
    valueLabel_1.textContent = step;
    const imageName = `${step}_1000_1.png`;
    image_1.src = `${basePath}${imageName}`;
    image_1.alt = `Validation sample at step ${step}`;
    const index = steps.indexOf(Number(step));
    if (index !== -1) {
      const psnr = psnrValues_1[index];
      psnrLabel_1.textContent = psnr.toFixed(1);
      highlightChartPoint_1(step);
    } else {
      psnrLabel_1.textContent = '—';
    }
  }

  function updatePreview_2() {
    if (!slider_part1 || !image_2 || !valueLabel_2) return;
    const index = Number(slider_part1.value);
    if (index < 0 || index >= steps_part1_2.length) return;
    const step = steps_part1_2[index];
    valueLabel_2.textContent = step;
    const imageName = `iter_${step}.png`;
    const imagePath = `/images/compsci180/proj_4/part1_results/${imageName}`;
    image_2.src = imagePath;
    image_2.alt = `Part 1.2: Training progression visualization at iteration ${step}`;
    image_2.onerror = function() {
      console.error('Failed to load image:', imagePath);
      this.style.border = '2px solid red';
    };
    image_2.onload = function() {
      this.style.border = '';
    };
  }

  function updatePreview_3() {
    if (!slider_part1 || !image_3 || !valueLabel_3) return;
    const index = Number(slider_part1.value);
    if (index < 0 || index >= steps_part1_3.length) return;
    const step = steps_part1_3[index];
    valueLabel_3.textContent = step;
    const imageName = `iter_${step}_self.png`;
    const imagePath = `/images/compsci180/proj_4/part1_results/${imageName}`;
    image_3.src = imagePath;
    image_3.alt = `Part 1.2: Training progression visualization at iteration ${step}`;
    image_3.onerror = function() {
      console.error('Failed to load image:', imagePath);
      this.style.border = '2px solid red';
    };
    image_3.onload = function() {
      this.style.border = '';
    };
  }

  if (slider) {
    slider.addEventListener('input', updatePreview_0);
    slider.addEventListener('change', updatePreview_0);
    slider.addEventListener('input', updatePreview_1);
    slider.addEventListener('change', updatePreview_1);
    updatePreview_0();
    updatePreview_1();
  }

  if (slider_part1) {
    slider_part1.addEventListener('input', updatePreview_2);
    slider_part1.addEventListener('change', updatePreview_2);
    slider_part1.addEventListener('input', updatePreview_3);
    slider_part1.addEventListener('change', updatePreview_3);
    updatePreview_2();
    updatePreview_3();
  }
  } // end of init function
})();
</script>

<style>
.render-spin {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 2rem auto 2.5rem;
  text-align: center;
  user-select: none;
  cursor: grab;
  touch-action: none;
}

.render-spin:active {
  cursor: grabbing;
}

.render-spin:focus-visible {
  outline: 2px solid #2196f3;
  outline-offset: 6px;
}

.render-spin img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

.render-spin__hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(33, 33, 33, 0.75);
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.render-spin__hint--hidden {
  opacity: 0;
  transform: translate(-50%, 12px);
}

.doggy-render-spin {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 2rem auto 2.5rem;
  text-align: center;
  user-select: none;
  cursor: grab;
  touch-action: none;
}

.doggy-render-spin:active {
  cursor: grabbing;
}

.doggy-render-spin:focus-visible {
  outline: 2px solid #2196f3;
  outline-offset: 6px;
}

.doggy-render-spin img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

.doggy-render-spin__hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(33, 33, 33, 0.75);
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.doggy-render-spin__hint--hidden {
  opacity: 0;
  transform: translate(-50%, 12px);
}

.train-slider {
  margin: 2rem auto;
  max-width: 960px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
}

.train-slider__controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.train-slider__label {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.train-slider input[type="range"] {
  width: 100%;
}

.train-slider__layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.75rem;
}

.train-slider__layout--side-by-side {
  flex-direction: row;
  gap: 1rem;
}

.train-slider__layout--side-by-side .train-slider__image-wrapper {
  flex: 1;
  width: 50%;
}

.train-slider__image-wrapper {
  width: 100%;
}

.train-slider__image-wrapper img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.train-slider__chart-wrapper {
  position: relative;
  width: 100%;
  height: 320px;
}

.video_result {
  width: 100%;
  max-width: 960px;
  margin: 2rem auto;
  text-align: center;
}

.video_result__label {
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
}

.video_result video {
  width: 70%;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.psnr-curve {
  width: 70%;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.psnr-curve img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

@media (max-width: 767px) {
  .train-slider__layout--side-by-side {
    flex-direction: column;
  }

  .train-slider__layout--side-by-side .train-slider__image-wrapper {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .train-slider__layout {
    flex-direction: row;
    align-items: stretch;
  }

  .train-slider__image-wrapper {
    flex: 0 0 66%;
    max-width: 66%;
  }

  .train-slider__chart-wrapper {
    flex: 0 0 34%;
    max-width: 34%;
  }

  .train-slider__layout--side-by-side .train-slider__image-wrapper {
    flex: 1;
    max-width: 50%;
  }
}
</style>


---
title: "[COMPSCI 180] Diffusion Models!"
date: 2025-11-24 10:00:00
mathjax: true
tags: [COMPSCI_180]
categories: COMPSCI_180
---

# Part A: The Power of Diffusion Models!

## Part 0: Setup

### Results Comparison: Different Resolutions and Inference Steps

The following table shows the generated images for 5 different prompts, comparing low resolution (after stage 1 of the network) vs high resolution (after stage 2 of the network), and 20 inference steps vs 50 inference steps.

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Prompt</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Low Resolution<br/>20 Steps</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Low Resolution<br/>50 Steps</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">High Resolution<br/>20 Steps</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">High Resolution<br/>50 Steps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold;">1. An oil painting of a snowy mountain village</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_20/1.png" alt="Low Res 20 Steps - Snowy Mountain Village" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_50/1.png" alt="Low Res 50 Steps - Snowy Mountain Village" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_20/1.png" alt="High Res 20 Steps - Snowy Mountain Village" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_50/1.png" alt="High Res 50 Steps - Snowy Mountain Village" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold;">2. An oil painting of an old man</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_20/2.png" alt="Low Res 20 Steps - Old Man" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_50/2.png" alt="Low Res 50 Steps - Old Man" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_20/2.png" alt="High Res 20 Steps - Old Man" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_50/2.png" alt="High Res 50 Steps - Old Man" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold;">3. An oil painting of a young lady</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_20/3.png" alt="Low Res 20 Steps - Young Lady" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_50/3.png" alt="Low Res 50 Steps - Young Lady" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_20/3.png" alt="High Res 20 Steps - Young Lady" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_50/3.png" alt="High Res 50 Steps - Young Lady" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold;">4. A lithograph of waterfalls</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_20/4.png" alt="Low Res 20 Steps - Waterfalls" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_50/4.png" alt="Low Res 50 Steps - Waterfalls" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_20/4.png" alt="High Res 20 Steps - Waterfalls" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_50/4.png" alt="High Res 50 Steps - Waterfalls" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold;">5. A lithograph of a skull</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_20/5.png" alt="Low Res 20 Steps - Skull" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/low_resolution_50/5.png" alt="Low Res 50 Steps - Skull" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_20/5.png" alt="High Res 20 Steps - Skull" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_0/high_resolution_50/5.png" alt="High Res 50 Steps - Skull" style="max-width: 200px; height: auto; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>
</div>

### Analysis

This comparison demonstrates the effects of:
- **Resolution**: High resolution images provide more detail and clarity compared to low resolution versions
- **Inference Steps**: More inference steps (50 vs 20) generally result in more refined and detailed outputs, though the improvement may vary depending on the prompt (For example, for the two scenary views, the results in more inference steps do not look much better than the results in less inference steps, they seem both unrealistic.)


## Part 1: Sampling Loops

### Part 1.1 Implementing the Forward Process

The implementation of the `forward` function is as follows:

```python
def forward(im, t):
    """
    Args:
        im : torch tensor of size (1, 3, 64, 64) representing the clean image
        t : integer timestep

    Returns:
        im_noisy : torch tensor of size (1, 3, 64, 64) representing the noisy image at timestep t
    """
    with torch.no_grad():
        noise = torch.randn_like(im)
        alphas_t = alphas_cumprod[t]
        im_noisy = im * torch.sqrt(alphas_t) + torch.sqrt(1 - alphas_t) * noise
    return im_noisy
```

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1/250.png" alt="Campanile at noise level 250" style="max-width: 300px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 10px; font-weight: bold;">Noise Level: 250</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1/500.png" alt="Campanile at noise level 500" style="max-width: 300px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 10px; font-weight: bold;">Noise Level: 500</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1/750.png" alt="Campanile at noise level 750" style="max-width: 300px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 10px; font-weight: bold;">Noise Level: 750</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original Campanile" style="max-width: 300px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 10px; font-weight: bold;">Original</p>
  </div>
</div>

### Part 1.2 Classical Denoising

This section demonstrates the effect of traditional Gaussian blur denoising on noisy images. The images below show a comparison between the noisy images (before denoising) and the results after applying Gaussian blur denoising.

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Noise Level</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Before Denoising<br/>(Noisy Image)</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">After Gaussian Blur<br/>(Denoised Image)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 250</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/250.png" alt="Noisy image at noise level 250" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_2/250.png" alt="Denoised image at noise level 250" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 500</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/500.png" alt="Noisy image at noise level 500" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_2/500.png" alt="Denoised image at noise level 500" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 750</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/750.png" alt="Noisy image at noise level 750" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_2/750.png" alt="Denoised image at noise level 750" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Original</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original image" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_2/Original.png" alt="Original image after Gaussian blur" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>
</div>

The comparison above demonstrates the effect of Gaussian blur denoising:
- **Noise Reduction**: Gaussian blur effectively reduces high-frequency noise, making the images appear smoother. While noise is reduced, Gaussian blur also tends to blur fine details and edges, resulting in a loss of sharpness
- **Limitations**: Traditional Gaussian blur is a simple denoising method that doesn't preserve image structure as well as more advanced denoising techniques like diffusion models

### Part 1.3 Implementing One Step Denoising

The one step denoising is mainly by the following steps:
1. Use `forward` to get the noisy image at timestep `t`
2. Estimate the noise at timestep `t`
3. Remove the noise to get an estimate of the original image

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Noise Level</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Original Image</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Before Denoising<br/>(Noisy Image)</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">After One Step Denoising<br/>(Denoised Image)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 250</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original image" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/250.png" alt="Noisy image at noise level 250" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_3/250.png" alt="Denoised image at noise level 250" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 500</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original image" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/500.png" alt="Noisy image at noise level 500" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_3/500.png" alt="Denoised image at noise level 500" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; vertical-align: middle; font-weight: bold; text-align: center;">Noise Level: 750</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original image" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/750.png" alt="Noisy image at noise level 750" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_3/750.png" alt="Denoised image at noise level 750" style="max-width: 300px; height: auto; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>
</div>

### Part 1.4 Implementing Iterative Denoising

The iterative denoising loop repeatedly applies our learned denoiser while walking backward through the noise schedule. Each pass removes the predicted noise for the current timestep and re-injects the correct level of randomness, giving the next, slightly cleaner image. Repeating this across many steps (rather than performing a single giant leap) preserves structure while gradually restoring finer details. The implementation of the `iterative_denoising` function is as follows:

```python
def iterative_denoise(im_noisy, i_start, prompt_embeds, timesteps, display=True):
  image = im_noisy
  images_to_display = []

  with torch.no_grad():
    for i in range(i_start, len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]

      # get `alpha_cumprod` and `alpha_cumprod_prev` for timestep t from `alphas_cumprod`
      # compute `alpha`
      # compute `beta`
      # ===== your code here! =====
      alpha_cumprod = alphas_cumprod[t]
      alpha_cumprod_prev = alphas_cumprod[prev_t]
      alpha_t_step = alpha_cumprod / alpha_cumprod_prev
      beta_t_step = 1 - alpha_t_step
      # ==== end of code ====

      # Get noise estimate
      model_output = stage_1.unet(
          image.half().cuda(),
          t,
          encoder_hidden_states=prompt_embeds,
          return_dict=False
      )[0]

      # Split estimate into noise and variance estimate
      noise_est, predicted_variance = torch.split(model_output, image.shape[1], dim=1)

      # compute `pred_prev_image` (x_{t'}), the DDPM estimate for the image at the
      # next timestep, which is slightly less noisy. Use the equation 3.
      # This is the core of DDPM
      # ===== your code here! =====
      x0_pred = (image - torch.sqrt(1 - alpha_cumprod) * noise_est) / torch.sqrt(alpha_cumprod)

      # Apply equation 3
      pred_prev_image = (
          (torch.sqrt(alpha_cumprod_prev) * beta_t_step / (1 - alpha_cumprod)) * x0_pred +
          (torch.sqrt(alpha_t_step) * (1 - alpha_cumprod_prev) / (1 - alpha_cumprod)) * image
      )
      pred_prev_image = add_variance(predicted_variance, t, pred_prev_image)

      if t in [90, 240, 390, 540, 690]:
        iterative_images[t] = (pred_prev_image.squeeze(0) * 0.5 + 0.5).clamp(0, 1).cpu().numpy().transpose(1, 2, 0)

      # ==== end of code ====

      image = pred_prev_image

    clean = image.cpu().detach().numpy()
  return clean
```

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Original</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Gaussian Blur</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">One-Step Denoising</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: center; background-color: #f5f5f5;">Iterative Denoising</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1/Original.png" alt="Original image" style="max-width: 250px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_4/gaussian.png" alt="Gaussian blur denoised image" style="max-width: 250px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_4/one-step.png" alt="One-step denoised image" style="max-width: 250px; height: auto; border-radius: 4px;">
      </td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
        <img src="/images/compsci180/proj_5/part_1_4/iterative.png" alt="Iteratively denoised image" style="max-width: 250px; height: auto; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>
</div>

<div style="max-width: 400px; margin: 0 auto 30px;">
  <div style="text-align: center; margin-bottom: 10px;">
    <img id="iterative-preview" src="/images/compsci180/proj_5/part_1_4/690.png" alt="Iterative denoising step" style="width: 100%; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p id="iterative-label" style="margin-top: 8px; font-weight: bold;">Noise Level: 690</p>
  </div>
  <input type="range" id="iterative-slider" min="0" max="5" value="0" step="1" style="width: 100%;">
</div>

<script>
  const frames = [
    { src: '/images/compsci180/proj_5/part_1_4/690.png', label: 'Noise Level: 690' },
    { src: '/images/compsci180/proj_5/part_1_4/540.png', label: 'Noise Level: 540' },
    { src: '/images/compsci180/proj_5/part_1_4/390.png', label: 'Noise Level: 390' },
    { src: '/images/compsci180/proj_5/part_1_4/240.png', label: 'Noise Level: 240' },
    { src: '/images/compsci180/proj_5/part_1_4/90.png', label: 'Noise Level: 90' },
    { src: '/images/compsci180/proj_5/part_1_4/iterative.png', label: 'Final Iterative Result' }
  ];

  function initIterativeSlider(){
    const slider = document.getElementById('iterative-slider');
    const image = document.getElementById('iterative-preview');
    const label = document.getElementById('iterative-label');
    if (!slider || !image || !label) return;

    slider.addEventListener('input', function () {
      const frame = frames[parseInt(this.value, 10)];
      image.src = frame.src;
      label.textContent = frame.label;
    });
  }

  document.addEventListener('DOMContentLoaded', initIterativeSlider);
  document.addEventListener('pjax:complete', initIterativeSlider);
</script>


The slider highlights how the sample becomes progressively clearer as we move from heavy noise (690) toward the final reconstruction. The gradual refinement with multiple steps avoids the over-smoothing artifacts seen in the Gaussian blur and produces noticeably sharper edges than the single-step approach.

### Part 1.5 Diffusion Model Sampling
The full sampling loop produces high-quality generations from pure noise. Below are five samples (using the same prompt embeddings from 'a high quality photo') captured at the final timestep of the iterative procedure:

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_5/0.png" alt="Sample 0" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 1</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_5/1.png" alt="Sample 1" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 2</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_5/2.png" alt="Sample 2" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 3</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_5/3.png" alt="Sample 3" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 4</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_5/4.png" alt="Sample 4" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 5</p>
  </div>
</div>

### Part 1.6 Classifier-Free Guidance (CFG)

I implement the `iterative_denoise_cfg` function to add classifier-free guidance to the iterative denoising process. The implementation is as follows:

```python
def iterative_denoise_cfg(im_noisy, i_start, prompt_embeds, uncond_prompt_embeds, timesteps, scale=7):
  image = im_noisy
  images_to_display = []

  with torch.no_grad():
    for i in range(i_start, len(timesteps) - 1):
      # Get timesteps
      t = timesteps[i]
      prev_t = timesteps[i+1]

      # Get `alpha_cumprod`, `alpha_cumprod_prev`, `alpha`, `beta`
      # ===== your code here! =====
      alpha_cumprod = alphas_cumprod[t]
      alpha_cumprod_prev = alphas_cumprod[prev_t]
      alpha_t_step = alpha_cumprod / alpha_cumprod_prev # This is alpha_t in equation 3
      beta_t_step = 1 - alpha_t_step # This is beta_t in equation 3
      # ==== end of code ====

      # Get cond noise estimate
      model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=prompt_embeds,
          return_dict=False
      )[0]

      # Get uncond noise estimate
      uncond_model_output = stage_1.unet(
          image,
          t,
          encoder_hidden_states=uncond_prompt_embeds,
          return_dict=False
      )[0]

      # Split estimate into noise and variance estimate
      noise_est, predicted_variance = torch.split(model_output, image.shape[1], dim=1)
      uncond_noise_est, _ = torch.split(uncond_model_output, image.shape[1], dim=1)

      # Compute the CFG noise estimate based on equation 4
      # ===== your code here! =====
      noise_est_cfg = uncond_noise_est + scale * (noise_est - uncond_noise_est)
      # ==== end of code ====


      # Get `pred_prev_image`, the next less noisy image.
      # Predict x0 using the CFG noise estimate
      # ===== your code here! =====
      x0_pred = (image - torch.sqrt(1 - alpha_cumprod) * noise_est_cfg) / torch.sqrt(alpha_cumprod)

      # Apply equation 3
      pred_prev_image = (
          (torch.sqrt(alpha_cumprod_prev) * beta_t_step / (1 - alpha_cumprod)) * x0_pred +
          (torch.sqrt(alpha_t_step) * (1 - alpha_cumprod_prev) / (1 - alpha_cumprod)) * image
      )
      pred_prev_image = add_variance(predicted_variance, t, pred_prev_image)
      # ==== end of code ====

      image = pred_prev_image

    clean = image.cpu().detach().numpy()
  return clean
```

The following images show the results of the iterative denoising with CFG:

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_6/0.png" alt="Sample 0" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 1</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_6/1.png" alt="Sample 1" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 2</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_6/2.png" alt="Sample 2" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 3</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_6/3.png" alt="Sample 3" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 4</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/compsci180/proj_5/part_1_6/4.png" alt="Sample 4" style="max-width: 220px; height: auto; border-radius: 4px; border: 1px solid #ddd;">
    <p style="margin-top: 8px; font-weight: bold;">Sample 5</p>
  </div>
</div>

### Part 1.7 Image-to-image Translation

We now explore how strongly the diffusion process can pull a slightly corrupted real image back to the learned image manifold when we start the reverse process at different points in the noise schedule. I add a small amount of noise to the Campanile photo, then jump into the sampler at indices `[1, 3, 5, 7, 10, 20]` (the indices correspond to positions within the noise schedule; smaller values mean we restart from a noisier state and therefore denoise over a longer trajectory). 

<div style="display: flex; overflow-x: auto; gap: 18px; padding: 15px 5px; margin: 10px 0; border: 1px solid #eee; border-radius: 6px;">
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 1</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 3</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 5</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 7</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 10</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 20</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7/campanile/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original</p>
  </div>
</div>

### Part 1.7.1 Editing Hand-Drawn and Web Images

In this section, we will use pictures from the web and hand-drawn images to test the editing ability of the diffusion model.

<div style="display: flex; overflow-x: auto; gap: 18px; padding: 15px 5px; margin: 10px 0; border: 1px solid #eee; border-radius: 6px;">
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 1</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 3</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 5</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 7</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 10</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 20</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original</p>
  </div>
</div>

### Part 1.7.2 Inpainting

In this section, we will use the inpainting method to fill in the missing parts of the images. The technique is to only allow denoising in the masked region and keep the rest of the image unchanged.

<div style="display: flex; overflow-x: auto; gap: 18px; padding: 15px 5px; margin: 10px 0; border: 1px solid #eee; border-radius: 6px;">
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/campanella/image.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/face/image.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/zootopia/image.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original Image</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/campanella/mask.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/face/mask.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/zootopia/mask.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Mask Image</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/campanella/replace.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/face/replace.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/zootopia/replace.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Replace Area</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/campanella/inpaint.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/face/inpaint.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_2/zootopia/inpaint.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Result Image</p>
  </div>
</div>

### Part 1.7.3 Text-Conditioned Image-to-image Translation

In this section, we change the prompt 'A high quality photo' to my own prompt and see the translation results. The technique is to use pictures with similar structure, or the translation process will not be smooth.


<div style="display: flex; overflow-x: auto; gap: 18px; padding: 15px 5px; margin: 10px 0; border: 1px solid #eee; border-radius: 6px;">
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/1.png" alt="Iterative denoising start index 1" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 1</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/3.png" alt="Iterative denoising start index 3" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 3</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/5.png" alt="Iterative denoising start index 5" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 5</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/7.png" alt="Iterative denoising start index 7" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 7</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/10.png" alt="Iterative denoising start index 10" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 10</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/20.png" alt="Iterative denoising start index 20" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Start @ 20</p>
  </div>
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/cat/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/calbears/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_3/campanile/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original</p>
  </div>
</div>

### Part 1.8 Visual Anagrams

In this section, we will use the visual anagrams method to create a new image from the original images. The visual anagrams are created using the following steps:

1. $\epsilon_1 = \text{CFG of UNet}(x_t, t, p_1)$

2. $\epsilon_2 = \text{flip}(\text{CFG of UNet}(\text{flip}(x_t), t, p_2))$

3. $\epsilon = (\epsilon_1 + \epsilon_2) / 2$

where UNet is the diffusion model UNet from before, $\text{flip}(\cdot)$ is a function that flips the image, and $p_1$ and $p_2$ are two different text prompt embeddings.

<div style="display: flex; justify-content: center; gap: 30px; margin: 30px 0; flex-wrap: wrap;">
  <div style="text-align: center;">
    <div id="anagram-container-1" style="perspective: 1000px; width: 400px; height: 400px; cursor: pointer; margin: 0 auto;">
      <div id="anagram-card-1" style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s;">
        <div id="anagram-front-1" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <img src="/images/compsci180/proj_5/part_1_8/oldman_woman/oldman.png" alt="Old Man" style="width: 100%; height: 100%; object-fit: contain; display: block;">
        </div>
        <div id="anagram-back-1" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <img src="/images/compsci180/proj_5/part_1_8/oldman_woman/woman.png" alt="Woman" style="width: 100%; height: 100%; object-fit: contain; display: block;">
        </div>
      </div>
    </div>
    <p style="margin-top: 15px; font-weight: bold; color: #333;">An oil painting of an old man <br> ↔ <br> An oil painting of an young lady</p>
    <p style="margin-top: 5px; color: #666; font-size: 0.9em;">Click to flip</p>
  </div>
  
  <div style="text-align: center;">
    <div id="anagram-container-2" style="perspective: 1000px; width: 400px; height: 400px; cursor: pointer; margin: 0 auto;">
      <div id="anagram-card-2" style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s;">
        <div id="anagram-front-2" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <img src="/images/compsci180/proj_5/part_1_8/snowy_village_campfire/snowy_village.png" alt="Snowy Village" style="width: 100%; height: 100%; object-fit: contain; display: block;">
        </div>
        <div id="anagram-back-2" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          <img src="/images/compsci180/proj_5/part_1_8/snowy_village_campfire/campfire.png" alt="Campfire" style="width: 100%; height: 100%; object-fit: contain; display: block;">
        </div>
      </div>
    </div>
    <p style="margin-top: 15px; font-weight: bold; color: #333;">An oil painting of a snowy mountain village <br> ↔ <br> An oil painting of people around a campfire</p>
    <p style="margin-top: 5px; color: #666; font-size: 0.9em;">Click to flip</p>
  </div>
</div>

<style>
  #anagram-card-1.flipped {
    transform: rotateY(180deg);
  }
  #anagram-card-2.flipped {
    transform: rotateY(180deg);
  }
</style>

<script>
  function initAnagramFlip() {
    // First anagram (oldman_woman)
    const card1 = document.getElementById('anagram-card-1');
    const container1 = document.getElementById('anagram-container-1');
    
    if (card1 && container1) {
      let isFlipped1 = false;
      container1.addEventListener('click', function() {
        isFlipped1 = !isFlipped1;
        if (isFlipped1) {
          card1.classList.add('flipped');
        } else {
          card1.classList.remove('flipped');
        }
      });
    }
    
    // Second anagram (snowy_village_campfire)
    const card2 = document.getElementById('anagram-card-2');
    const container2 = document.getElementById('anagram-container-2');
    
    if (card2 && container2) {
      let isFlipped2 = false;
      container2.addEventListener('click', function() {
        isFlipped2 = !isFlipped2;
        if (isFlipped2) {
          card2.classList.add('flipped');
        } else {
          card2.classList.remove('flipped');
        }
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', initAnagramFlip);
  document.addEventListener('pjax:complete', initAnagramFlip);
</script>

### Part 1.9 Hybrid Images

For the Hybrid Images, we are taking the low-pass noise of the first image and the high-pass noise of the second image and then add them together to get the hybrid image. The algorithm is as follows:

1. $\epsilon_1 = \text{CFG of UNet}(x_t, t, p_1)$

2. $\epsilon_2 = \text{CFG of UNet}(x_t, t, p_2)$

3. $\epsilon = f_\text{lowpass}(\epsilon_1) + f_\text{highpass}(\epsilon_2)$

where UNet is the diffusion model UNet, $f_\text{lowpass}$ is a low pass function, $f_\text{highpass}$ is a high pass function, and $p_1$ and $p_2$ are two different text prompt embeddings. Our final noise estimate is $\epsilon$. 

The following are the results of the hybrid images:

<div style="display: flex; justify-content: center; gap: 30px; margin: 30px 0; flex-wrap: wrap;">
  <div style="text-align: center;">
    <div id="hybrid-1-container" style="position: relative; width: 400px; height: 400px; margin: 0 auto;">
      <img id="hybrid-1-full" src="/images/compsci180/proj_5/part_1_9/hybrid_1_small.png" alt="Hybrid Image 1 - Low Pass" onclick="return false;" data-no-lightbox style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 1; pointer-events: none;">
      <img id="hybrid-1-small" src="/images/compsci180/proj_5/part_1_9/hybrid_1.png" alt="Hybrid Image 1 - High Pass" onclick="return false;" data-no-lightbox style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; pointer-events: none;">
    </div>
    <p style="margin-top: 15px; font-weight: bold; color: #333;">A lithograph of a skull <br> ↔ <br> A lithograph of waterfalls</p>
    <p id="hybrid-1-label" style="margin-top: 5px; color: #666; font-size: 0.9em;">High Pass (Normal Picture)</p>
  </div>
  <div style="text-align: center;">
    <div id="hybrid-2-container" style="position: relative; width: 400px; height: 400px; margin: 0 auto;">
      <img id="hybrid-2-full" src="/images/compsci180/proj_5/part_1_9/hybrid_2_small.png" alt="Hybrid Image 2 - Low Pass" onclick="return false;" data-no-lightbox style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 1; pointer-events: none;">
      <img id="hybrid-2-small" src="/images/compsci180/proj_5/part_1_9/hybrid_2.png" alt="Hybrid Image 2 - High Pass" onclick="return false;" data-no-lightbox style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; pointer-events: none;">
    </div>
    <p style="margin-top: 15px; font-weight: bold; color: #333;">A painting of a red panda <br> ↔ <br> A painting of houseplant</p>
    <p id="hybrid-2-label" style="margin-top: 5px; color: #666; font-size: 0.9em;">High Pass (Normal Picture)</p>
  </div>
</div>

<style>
  @keyframes hybridFade {
    0%, 45% {
      opacity: 1;
      transform: scale(0.2);
    }
    50%, 95% {
      opacity: 0;
      transform: scale(0.2);
    }
    100% {
      opacity: 1;
      transform: scale(0.2);
    }
  }
  
  @keyframes hybridFadeReverse {
    0%, 45% {
      opacity: 0;
      transform: scale(0.9);
    }
    50%, 95% {
      opacity: 1;
      transform: scale(0.9);
    }
    100% {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  #hybrid-1-full, #hybrid-2-full {
    animation: hybridFade 4s ease-in-out infinite;
    transform-origin: center center;
  }
  
  #hybrid-1-small, #hybrid-2-small {
    animation: hybridFadeReverse 4s ease-in-out infinite;
    transform-origin: center center;
  }
</style>

<script>
  function updateHybridLabel(prefix) {
    const fullImg = document.getElementById(prefix + '-full');
    const label = document.getElementById(prefix + '-label');
    
    if (!fullImg || !label) return;
    
    const opacity = parseFloat(window.getComputedStyle(fullImg).opacity);
    
    if (opacity > 0.5) {
      label.textContent = 'High Pass (Normal Picture)';
    } else {
      label.textContent = 'Low Pass (Small Picture - Zoomed)';
    }
  }
  
  function initHybridAnimation() {
    const fullImg1 = document.getElementById('hybrid-1-full');
    const fullImg2 = document.getElementById('hybrid-2-full');
    const container1 = document.getElementById('hybrid-1-container');
    const container2 = document.getElementById('hybrid-2-container');
    
    // Prevent click events on containers to disable lightbox preview
    if (container1) {
      container1.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);
    }
    
    if (container2) {
      container2.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);
    }
    
    if (fullImg1) {
      // Update label periodically to match animation for hybrid-1
      setInterval(() => updateHybridLabel('hybrid-1'), 100);
    }
    
    if (fullImg2) {
      // Update label periodically to match animation for hybrid-2
      setInterval(() => updateHybridLabel('hybrid-2'), 100);
    }
  }
  
  document.addEventListener('DOMContentLoaded', initHybridAnimation);
  document.addEventListener('pjax:complete', initHybridAnimation);
</script>
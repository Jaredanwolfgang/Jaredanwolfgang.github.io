---
title: "[COMPSCI 180] Diffusion Models!"
date: 2025-11-24 10:00:00
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
    <img src="/images/compsci180/proj_5/part_1_7/campanile/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/cat/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7/calbears/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original</p>
  </div>
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
</div>

### Part 1.7.1 Editing Hand-Drawn and Web Images

In this section, we will use pictures from the web and hand-drawn images to test the editing ability of the diffusion model.

<div style="display: flex; overflow-x: auto; gap: 18px; padding: 15px 5px; margin: 10px 0; border: 1px solid #eee; border-radius: 6px;">
  <div style="text-align: center; min-width: 220px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/web/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_1/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <img src="/images/compsci180/proj_5/part_1_7_1/hand_2/Original.png" alt="Original Campanile image" style="width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
    <p style="margin-top: 8px; font-weight: bold;">Original</p>
  </div>
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
</div>

### Part 1.7.2 Inpainting


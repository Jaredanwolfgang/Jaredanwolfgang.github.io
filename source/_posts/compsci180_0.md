---
title: "[COMPSCI 180] Camera will surely fool you"
date: 2025-08-29 10:39:00
tags: [COMPSCI_180]
categories: COMPSCI_180
post_cover: /images/compsci180/proj_0/view.jpg
post_cover_height: 120
---

# Part 1: Selfie: The Wrong Way vs. The Right Way

I ask my friend to help take these photos for me. Photos are taken with Apple iPhone 16, so I have to use photo editing software so that my skin does not look so bad. (T T) Surely, the first line of photos look way better than the second line. 

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/195mm.jpg" alt="Selfie 1" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "A nice handsome guy!"
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">The "right way": camera at eye level, proper distance, natural proportions.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">195mm @ around 1.5m</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/146mm.jpg" alt="Selfie 2" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "Nice smile!"
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">A little close-up, the details are richer.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">146mm @ around 1m</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/83mm.jpg" alt="Selfie 3" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "Your face seems a little fat!"
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">The facial expression takes more part of the image.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">83mm @ around 0.75m</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/47mm.jpg" alt="Selfie 4" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "Why are your right face bigger than your left?"
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">The distortion starts to kick in.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">47mm @ around 0.5m</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/25mm.jpg" alt="Selfie 5" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "Excuse me, Apple Face ID seems not working."
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">Your face starts to distort like a spindle.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">25mm @ around 0.3m</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/16mm.jpg" alt="Selfie 6" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="position: relative; margin: 12px 0;">
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 15px; padding: 12px 16px; font-size: 1.05em; color: #1976d2; font-style: italic; position: relative; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);">
        "Wait. Who are you by the way?"
        <div style="position: absolute; bottom: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #2196f3;"></div>
        <div style="position: absolute; bottom: -6px; left: 22px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #e3f2fd;"></div>
      </div>
    </div>
    <div style="font-size: 1.05em; color: #333;">The distortion is so bad that you can't even recognize yourself.</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">16mm @ around 0.1m</div>
  </div>
</div>

According to [the video by Think Media](https://www.youtube.com/watch?v=mDGEHrv9FyY), the focal length of the camera determines the FOV(Field of View) of the image. While the shorter focal length captures wider FOV, the longer focal length can capture subjects from afar with narrower FOV. Also, the shorter focal length will lead to less compression (the background is less blurred) and more distortion of the image (the face is more distorted and stretched).

# Part 2: Architectural Perspective Compression

This is the view from below our apartment:
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 32px 0;">
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/331mm_street.jpg" alt="Selfie 4" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="font-size: 1.05em; color: #333;">Flattend view </div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">331mm</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/32mm_street.jpg" alt="Selfie 5" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="font-size: 1.05em; color: #333;">You can see the sky right now!</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">32mm</div>
  </div>
  <div style="background: #f8f8f8; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 16px; text-align: center; transition: transform 0.2s; cursor: pointer;">
    <img src="/images/compsci180/proj_0/14mm_street.jpg" alt="Selfie 6" style="width: 100%; border-radius: 8px; margin-bottom: 12px; aspect-ratio: 3/4; object-fit: cover;">
    <div style="font-size: 1.05em; color: #333;">Wider FOV (The door aside becomes distorted now!)</div>
    <div style="font-size: 0.8em; color:rgb(165, 165, 165);">14mm</div>
  </div>
</div>

# Part 3: The Dolly Zoom

During the scavenger hunt, I tried to use the Dolly Zoom technique to film one of my friends. By using the camera with iPhone 16, I was able to adjust the focal length of the camera to adjust the FOV of the image. I actually try to zoom in while stepping backwards. Here is the result:

<div style="position: relative; width: 100%; max-width: 800px; margin: 32px auto;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */">
    <iframe 
      src="/images/compsci180/proj_0/dolly_zoom.mp4" 
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</div>
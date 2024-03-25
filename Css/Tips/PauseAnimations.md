We can use the `getAnimations` method on ah HTML element to get an array of all the animations on the element.

From there you can loop through the array and call the pause() method on each animation.

For example:

```js
const circle = document.querySelector('.circle');
const animations = circle.getAnimations();

animations.forEach((animation) => {
  animation.pause();
});
```

Example of what the full solution would look like:

<style>
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: lightblue;
    margin: auto;
    animation: pulse 1s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<div class="circle"></div>
<button class="btn">Pause Animation</button>

<script>
  const btn = document.querySelector(".btn");
  
  btn.addEventListener("click", () => {
    const animations = document.querySelector(".circle")
      .getAnimations();
    
    if (btn.textContent === "Pause Animation") {
      animations.forEach((animation) => {
        animation.pause();
      });
      btn.textContent = "Play Animation";
    } else {
      animations.forEach((animation) => {
        animation.play();
      });
      btn.textContent = "Pause Animation";
    }
  });
</script>

Other useful properties we can access on the animation object:

- currentTime
- playbackRate
- playState

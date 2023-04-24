document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.querySelector('.counter-number');

  if (!counterElement) return;

  const counter = Number(counterElement.textContent);
  const step = Math.ceil(counter / 30);
  const intervalTime = 30;
  let count = 0;
  let isCounterStarted = false;
  let isScrollDebounced = false;

  counterElement.textContent = count;

  const resetCounter = () => {
    count = 0;
    counterElement.textContent = count;
  }

  const startCounter = () => {
    if (!isCounterStarted) {
      isCounterStarted = true;
      const interval = setInterval(() => {
        if (count <= counter && count <= step * 30) {
          counterElement.textContent = count;
          count += step;
        } else {
          clearInterval(interval);
          isCounterStarted = false;
        }
      }, intervalTime);
    }
  }

  // Define a debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleScroll = () => {
    const counterRect = counterElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (counterRect.top <= windowHeight && counterRect.bottom >= 0) {
      startCounter();
    } else {
      resetCounter();
    }
  }

  // Create a debounced version of the handleScroll function
  const handleScrollDebounced = debounce(handleScroll, 100);

  // Update the scroll event listener to use the debounced function
  window.addEventListener("scroll", () => {
    if (!isScrollDebounced) {
      isScrollDebounced = true;
      handleScrollDebounced();
      setTimeout(() => {
        isScrollDebounced = false;
      }, 100); // You can adjust the delay time (in milliseconds) as needed
    }
  });

}, false);

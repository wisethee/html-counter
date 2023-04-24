document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.querySelector('.counter-number');

  if (!counterElement) return;

  const counter = Number(counterElement.innerHTML);
  // Calculate the step value by dividing the counter number by 20
  let step = Math.ceil(counter / 30);
  let count = 0

   const startCounter  = ()=> {
     const interval = setInterval(function() {
       if (count <= counter && count <= step * 20) { // Add condition to stop counting after reaching the desired step
         counterElement.innerHTML = count;
         count += step; // Increment the count by the step value
       } else {
         clearInterval(interval); // Clear the interval after reaching the desired step
       }
     }, 60);
  }

  startCounter();


}, false);

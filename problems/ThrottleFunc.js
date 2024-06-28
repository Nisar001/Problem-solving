function throttle(func, wait){
   let lastCallTime = 0
   let timeOutId = null;
   
   return function(...args){
      const now = Date.now();
      const remainingTime = wait -(now - lastCallTime);
      const later = () => {
         lastCallTime = Date.now();
         timeOutId = null;
         func.apply(this, args);
      }

      if(remainingTime <= 0 || remainingTime > wait){
         if(timeOutId){
            clearInterval(timeOutId);
            timeOutId = null;
         }
         lastCallTime = now;
         func.apply(this, args);
      } else if (!timeOutId){
         timeOutId = setTimeout(later, remainingTime)
      }
      return {
         lastCallTime,
         timeOutId,
         remainingTime,
         now,
         nextCallAllowedIn: remainingTime <= 0 ? 0 : remainingTime
      };
   }
}

export default throttle
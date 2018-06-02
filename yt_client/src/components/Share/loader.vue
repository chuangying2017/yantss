<template>
  <div class="sk-circle">
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
  </div>
</template>

<style>
  .sk-circle {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
  }

  .sk-circle .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-circle .sk-child:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #333;
    border-radius: 100%;
     animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    -moz-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    -ms-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    -o-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  }

  .sk-circle .sk-circle2 {
  	transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .sk-circle .sk-circle3 {
  	transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
  }

  .sk-circle .sk-circle4 {
  	transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .sk-circle .sk-circle5 {
  	 transform: rotate(120deg);
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
   
    -moz-transform: rotate(120deg);
    -o-transform: rotate(120deg);
  }

  .sk-circle .sk-circle6 {
  	 transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
   
    -moz-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .sk-circle .sk-circle7 {
  	 transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
   
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
  }

  .sk-circle .sk-circle8 {
  	transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    
    -moz-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .sk-circle .sk-circle9 {
  	 transform: rotate(240deg);
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
   
    -moz-transform: rotate(240deg);
    -o-transform: rotate(240deg);
  }

  .sk-circle .sk-circle10 {
  	transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
  }

  .sk-circle .sk-circle11 {
  	 transform: rotate(300deg);
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
   
    -moz-transform: rotate(300deg);
    -o-transform: rotate(300deg);
  }

  .sk-circle .sk-circle12 {
  	 transform: rotate(330deg);
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
   
    -moz-transform: rotate(330deg);
    -o-transform: rotate(330deg);
  }

  .sk-circle .sk-circle2:before {
  	animation-delay: -1.1s;  
    -webkit-animation-delay: -1.1s;
    -ms-animation-delay: -1.1s;
	
	-moz-animation-delay: -1.1s;
	-o-animation-delay: -1.1s;
	}

  .sk-circle .sk-circle3:before {
  	 animation-delay: -1s;
    -webkit-animation-delay: -1s;
    -ms-animation-delay: -1s;
   
    -moz-animation-delay: -1s;
    -o-animation-delay: -1s;
  }

  .sk-circle .sk-circle4:before {
  	  animation-delay: -0.9s;
    -webkit-animation-delay: -0.9s;
    -ms-animation-delay: -0.9s;
  
    -moz-animation-delay: -0.9s;
    -o-animation-delay: -0.9s;
  }

  .sk-circle .sk-circle5:before {
  	 animation-delay: -0.8s;
    -webkit-animation-delay: -0.8s;
    -ms-animation-delay: -0.8s;
   
    -moz-animation-delay: -0.8s;
    -o-animation-delay: -0.8s;
  }

  .sk-circle .sk-circle6:before {
  	 animation-delay: -0.7s;
    -webkit-animation-delay: -0.7s;
    -ms-animation-delay: -0.7s;
   
    -moz-animation-delay: -0.7s;
    -o-animation-delay: -0.7s;
  }

  .sk-circle .sk-circle7:before {
  	 animation-delay: -0.6s;
    -webkit-animation-delay: -0.6s;
    -ms-animation-delay: -0.6s;
   
    -moz-animation-delay: -0.6s;
    -o-animation-delay: -0.6s;
  }

  .sk-circle .sk-circle8:before {
  	 animation-delay: -0.5s;
    -webkit-animation-delay: -0.5s;
    -ms-animation-delay: -0.5s;
   
    -moz-animation-delay: -0.5s;
    -o-animation-delay: -0.5s;
  }

  .sk-circle .sk-circle9:before {
  	 animation-delay: -0.4s;
    -webkit-animation-delay: -0.4s;
    -ms-animation-delay: -0.4s;
   
    -moz-animation-delay: -0.4s;
    -o-animation-delay: -0.4s;
  }

  .sk-circle .sk-circle10:before {
  	 animation-delay: -0.3s;
    -webkit-animation-delay: -0.3s;
    -ms-animation-delay: -0.3s;
   
    -moz-animation-delay: -0.3s;
    -o-animation-delay: -0.3s;
  }

  .sk-circle .sk-circle11:before {
  	 animation-delay: -0.2s;
    -webkit-animation-delay: -0.2s;
    -ms-animation-delay: -0.2s;
   
    -moz-animation-delay: -0.2s;
    -o-animation-delay: -0.2s;
  }

  .sk-circle .sk-circle12:before {
  	  animation-delay: -0.1s;
    -webkit-animation-delay: -0.1s;
    -ms-animation-delay: -0.1s;
  
    -moz-animation-delay: -0.1s;
    -o-animation-delay: -0.1s;
  }
	@keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
    	 transform: scale(0);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
    }
    40% {
    	 transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
    }
  }
  @-webkit-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
    	 transform: scale(0);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
    }
    40% {
    	 transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
    }
  }
  @-ms-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
    	 transform: scale(0);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
    }
    40% {
    	 transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
    }
  }
  
  @-moz-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
    	 transform: scale(0);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
    }
    40% {
    	 transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
    }
  }
  @-o-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
    	  transform: scale(0);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
    }
    40% {
    	 transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1); 
      -moz-transform: scale(1);
      -o-transform: scale(1);
    }
  }

  
</style>

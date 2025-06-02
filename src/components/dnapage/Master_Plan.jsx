import React from 'react'

const Master_Plan = () => {

const imgArray = ['car', 'bike', 'cycle', 'cab', 'bus', 'truck'];
let currentIndex = 0;
const imgContainer = document.querySelector('#carousel-img'); // This should be a valid selector

function initCarousel() {
  updateImage();
  
  document.querySelector('#prev-btn').addEventListener('click', prevImg);
  document.querySelector('#next-btn').addEventListener('click', nextImg);
  
  setInterval(nextImg, 5000); 
}

function updateImage() {
  imgContainer.src = imgArray[currentIndex];
}

function prevImg() {
  currentIndex = (currentIndex - 1 + imgArray.length) % imgArray.length;
  updateImage();
}

function nextImg() {
  currentIndex = (currentIndex + 1) % imgArray.length;
  updateImage();
}

document.addEventListener('DOMContentLoaded', initCarousel);
  return (
    <>
    <div className="master-plan">
     <div className="container">
        
     </div>
     </div>
    </>
  )
}

export default Master_Plan
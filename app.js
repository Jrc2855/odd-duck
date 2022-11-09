'use strict';

console.log('Testing 1,2');

//-----------Global Variables-----------//

let voteCount = 25;
let productArray = [];

//-----------DOM-----------//

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');

let resultsButton = document.getElementById('show-results-button');
let resultsContainer = document.getElementById('results-container');

let chartContext = document.getElementById('myChart').getContext('2d');


//-----------Utility Functions-----------//

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
};

function imageRender() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  if (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex) {
    imgOneIndex = randomIndex();
  }
  if (imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndex();
  }
  imgOne.src = productArray[imgOneIndex].imagePath;
  imgTwo.src = productArray[imgTwoIndex].imagePath;
  imgThree.src = productArray[imgThreeIndex].imagePath;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
};


//-----------Event Handlers-----------//

function handleShowResults(event) {
  if (voteCount === 0) {

    //-------------Chart-------------//

    let productNames = [];
    let productViews = [];
    let productClicks = [];

    for (let i = 0; i < productArray.length; i++) {
      productNames.push(productArray[i].name);
      productViews.push(productArray[i].views);
      productClicks.push(productArray[i].clicks);
    }

    let chartConfig = {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: '# of votes',
          data: productViews,
          backgroundColor: 'red',
          color: 'white',
        }, {
          label: '# of Clicks',
          data: productClicks,
          backgroundColor: 'blue',
          color: 'white',
        }
        ]
      },
      options: {},
    };

    let myChart = new Chart(chartContext, chartConfig);
    resultsButton.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick(event) {
  let productClicked = event.target.alt;

  console.log('image clicked >>>', productClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === productClicked) {

      productArray[i].clicks++;
    }
  }
  voteCount--;
  imageRender();
  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);
  }
}


//-----------Constructor-----------//

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.imagePath = `images/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}


//-----------Executable Code-----------//

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petsweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let watercan = new Product('water-can');
let wineglass = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, watercan, wineglass);

imageRender();

imageContainer.addEventListener('click', handleImageClick);
resultsButton.addEventListener('click', handleShowResults);
let display = document.querySelector('.display')

fetchData()

function fetchData(){ 
  let url = "http://localhost:3000/data"
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('promise', data)
    renderRows(data)
  })
}// fetch data from db.json local server 

function renderRows(data){
  console.log(data)
  for (i=0; i<data.length; i++){

    let scoresArray = []
    scoresArray = data[i].submissions.map(sub => sub.score) 

    let tokenArray = []
    tokenArray = data[i].submissions.map(sub => sub.token)

    display.insertAdjacentHTML('beforeend',
      `<tr style="background-color: ${isEven(i) ? "white": "lightgrey" };">
        <th >
          Unit ${i + 1}: ${data[i].name}
        </th>
        
        <th style="color: ${scoreColor(getBestScore(scoresArray))};"> 
          ${getBestScore(scoresArray)} 
        </th>
        
        <th style= "color: ${scoreColor(getAverageScore(scoresArray))};" >
          ${getAverageScore(scoresArray)} 
        </th>
        
        <th> 
          ${getFirstToken(tokenArray) === "N/A" ? "N/A" : displayProjectAttempts(tokenArray)}
        </th>
      </tr >`
    )
  }
} // loop through data fetched from db.json file and display information to DOM 

function getBestScore(scoresArray){
  return scoresArray.length > 0 ? Math.max(...scoresArray) : "N/A" 
} // find the max score in the scoresArray

function getAverageScore(scoresArray){
  let sum = scoresArray.reduce((a,b) => a += b, 0)
  return scoresArray.length > 0 ? sum/(scoresArray.length) : "N/A"
} // calculate average of scoresArray

function getNumberOfAttempts(tokenArray){
  return tokenArray.length
} // length of the tokenArray to determine number of attempts

function getFirstToken(tokenArray){
  return tokenArray.length > 0 ? tokenArray[0] : "N/A"
} // get first token in the tokenArray 

function displayProjectAttempts(data){
  if (getNumberOfAttempts(data) === 1) {
    return `<a href="http://www.vidcode.com/share/${getFirstToken(data)}">1 Attempt</a>`
  } else {
    let num = getNumberOfAttempts(data)
    return `<a href="http://www.vidcode.com/share/${getFirstToken(data)}"> ${num}  Attempts </a>`
  }
} //inserting links into table cells that have attempts 

function scoreColor(scoreValue){
  if (scoreValue >= 90){
    return "lightgreen"
  } else if (scoreValue >= 75 && scoreValue < 90) {
    return "orange"
  } else if (scoreValue < 75) {
    return "lightskyblue"
  } else if (scoreValue === "N/A"){
    return "black"
  }
} // conditionally rendering score colors with inline styling based on scoreValue

function isEven(index){
  if (index%2 === 0) {
    return true
  } else
    return false
} // checking to see if index is even or odd number

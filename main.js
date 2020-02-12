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
    display.insertAdjacentHTML('beforeend',
      `<tr >
        <th >Unit ${i + 1}: ${data[i].name}</th>
        <th > ${getBestScore(data[i])} </th>
        <th > ${getAverageScore(data[i])} </th>
        <th> ${getFirstToken(data[i]) === "N/A" ? "N/A" : displayProjectAttempts(data[i])}</th>
      </tr >`
    )
  }
} // loop through data fetched from db.json file and display information to DOM 

function getBestScore(data){
  let scoresArray = []
  scoresArray = data.submissions.map(sub => sub.score)
  return scoresArray.length > 0 ? Math.max(...scoresArray) : "N/A" 
} //iterate over each unit's submissions scores and find the max score in the array

function getAverageScore(data){
  let scoresArray = []
  scoresArray = data.submissions.map(sub => sub.score)
  let sum = scoresArray.reduce((a,b) => a += b, 0)
  return scoresArray.length > 0 ? sum/(scoresArray.length) : "N/A"
} //iterate over each unit's submissions scores and get the average

function getNumberOfAttempts(data){
  let tokenArray = []
  tokenArray = data.submissions.map(sub => sub.token)
  return tokenArray.length
} // length of the submissions array for each unit to determine number of attempts

function getFirstToken(data){
  let tokenArray = []
  tokenArray = data.submissions.map(sub => sub.token)
  console.log(tokenArray)
  console.log('token', tokenArray[0])
  return tokenArray.length > 0 ? tokenArray[0] : "N/A"
} // getting the first unit out of each 

function displayProjectAttempts(data){
  if (getNumberOfAttempts(data) === 1) {
    return `<a href="http://www.vidcode.com/share/${getFirstToken(data)}">1 Attempt</a>`
  } else {
    let num = getNumberOfAttempts(data)
    return `<a href="http://www.vidcode.com/share/${getFirstToken(data)}"> ${num}  Attempts </a>`
  }
}//


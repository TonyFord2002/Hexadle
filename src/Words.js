import wordBank from "./Word-bank.txt"

export const boardDefault = [
    ["", "", "", "", "",""],
    ["", "", "", "", "",""],
    ["", "", "", "", "",""],
    ["", "", "", "", "",""],
    ["", "", "", "", "",""],
    ["", "", "", "", "",""],
  ]

  export const generateWordSet = async ()=>{
    let wordSet
    let todaysWord

    await fetch(wordBank).then((res)=> res.text())
    .then((result)=>{
      const wordArr = result.split('\n').slice(-2)
      todaysWord = wordArr[Math.floor(Math.random() *  wordArr.length)]
      wordSet = new Set(wordArr)
      console.log(wordSet,todaysWord)
    })
    return {wordSet, todaysWord}
  }
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
      const wordArr = result.split('\n')
      wordSet = new Set(wordArr)
      todaysWord = wordArr[Math.floor(Math.random() *  wordArr.length)]
      console.log(wordSet,todaysWord)
    })
    return {wordSet, todaysWord}
  }
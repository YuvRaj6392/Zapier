export function parse(text:string, values:any , startDelimeter:"{", endDelimeter:"}"){
  //you received {comment.amount} money from {comment.link}
  let startIndex=0;
  let endIndex=1;

  while(endIndex!=text.length){
    if(text[startIndex]===startDelimeter){
      let endPoint=startIndex+2;
      while(text[endPoint] !=endDelimeter){
        endPoint++;
      }
      let stringHoldingValue = text.slice(startIndex+1, endPoint-1);
      const keys= stringHoldingValue.split(".")
      let localValues={
        ...values
      }
      for(let i=0;i<keys.length;i++){
        if(typeof localValues==="string"){
          localValues=JSON.parse(localValues)
        }
        localValues=localValues[keys[i]];
      }
      startIndex=endPoint+1;
      endIndex=endPoint+2;
    } else{
      startIndex++;
      endIndex++;
    }
  }
}
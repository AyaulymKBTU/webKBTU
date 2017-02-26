function duplicateCount(text){
var already="";
  var count=0;
   var text1=text.toLowerCase();
   text=text1;
   var found=false; 
  for(var i=0;i<text.length;i++)
  {
    for(var j=0;j<text.length;j++)
    {
      if(i!=j)
      {
      if(!already.includes(text[i])){
          if(text[i]==text[j])
          {
          already+=text[i];
          //Console.log(text[i]+" "+text[j]);
            count++;
            j=text.length;
            // change i to i+1;
          }
        }
      }
    }
  }
  
  return count;
}
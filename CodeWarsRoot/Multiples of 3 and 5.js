function solution(number){
var res=[];
if(number<=0)
return res.length;
else{ 
  if(number>=5){
  
  for(var i=1;i<number;i++)
  {
    if(i%3==0||i%5==0)
    res.push(i);
  }
  var count=0;
  for(var j=0;j<res.length;j++)
  {count+=res[j];}
  return count;
  }
  else if(number<=3)
  return res.length;
  else  
  return 3;
  }
}

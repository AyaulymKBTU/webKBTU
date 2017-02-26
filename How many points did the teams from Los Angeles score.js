function getLosAngelesPoints(results) { 
function hasNumbers(t)
{
    return /\d/.test(t);
}
var d=0,j=0,count=0,s=0;
  for(var i=0;i<results.length;i++){
    var b=results[i][0];
      if(b.substring(0,11)=="Los Angeles" &&b.substring(12,b.length)!="" && !hasNumbers(b.substring(12,b.length)))
        {
        count++;
          var buf=results[i][1];
          while(buf[j]!=':')
              j++;
            
          s+=Number(buf.substring(0,j));
        }
      }
  return s;
}
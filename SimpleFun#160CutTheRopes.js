function cutTheRopes(a) {
  //coding and coding..
  var n=a.length;
  var min=a[0];
  var b=[];
  b.push(a.length);
  
var m=1;
  a.sort(function(a, b){return a-b});
  for(var i=0;i<a.length-1;i++)
  {
  if(a[i+1]!=a[i]){ 
    n-=m;
    b.push(n);
    m=1;
    }
    else
    {m++;}
    
  }
  
  
  //b.sort(function(a, b){return b-a});
  return b;
}
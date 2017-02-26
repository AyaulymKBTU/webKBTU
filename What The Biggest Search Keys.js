function theBiggestSearchKeys(...arr) {
  //your code here
  if(arr.length==0)
  return "'"+""+"'";
  else{
  var m=[];
  m=arr;
  var i=0;
  var first=m[i];
  var biggest=[];
  for(i=0;i<m.length;i++)
  {
    if(first.length<m[i].length)
    {
     first=m[i];
    }
  }
  for(var z=0;z<m.length;z++)
  {
   if(first.length==m[z].length)
     biggest.push(m[z]);
  }
  if(biggest.length==0)
  biggest.push(first)
  biggest.sort();
  var s="";
  for(var x=0;x<biggest.length-1;x++)
  {s+="'"+biggest[x]+"'\, ";}
  s+="'"+biggest[x]+"'";
  return s;}
}
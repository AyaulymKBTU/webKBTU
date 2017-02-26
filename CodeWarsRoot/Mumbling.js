function accum(s) {
var s1;
var s2;

	for(var i=0;i<s.length;i++)
  {//if(s[i]!=s[i+1])
  s1=s[i].toUpperCase();
  //s2=s1;
  for(var j=0;j<i;j++)
  {s1+=s[i].toLowerCase();}
  s1=s1+'-';
  s2+=s1;
  }
  for(var y=0;y<s2.length;y++)
  {if(s2[y]==s[0].toUpperCase())
  {s2=s2.substring(y,s2.length);
  break;}}
  s2=s2.substring(0,s2.length-1)

  return s2;
}
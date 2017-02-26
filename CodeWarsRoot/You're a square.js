var isSquare = function(n){
if(n<0)
  return false; 
  else  
  {
  var m=this.Math.sqrt(n);
  m=this.Math.round(m);
  if(this.Math.floor(m)==this.Math.round(m)&&(m*m==n))
  return true;
  else
  return false;
  }
}
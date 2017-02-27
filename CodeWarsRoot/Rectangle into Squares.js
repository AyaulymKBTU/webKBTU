function sqInRect(lng, wdth){
var buf;
if(lng==wdth)
return null;
else{
      var squares=[];
      var min,max,bufMax;
      if(lng<wdth)
      {min=lng;max=wdth;}
      else
     { min=wdth;max=lng;}
     // squares.push(min);
        while(min!=0)
      {
        squares.push(min);
        
        buf=max-min;
        max=this.Math.max(buf,min);
        min=this.Math.min(buf,min);
        
        
      }
      return squares;
  }
 
}

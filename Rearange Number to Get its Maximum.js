var maxRedigit = function(num) {
  if((num<100||num>999))
    {return null;}
  else{
  
  var first=this.Math.floor(num/100);
  var second=this.Math.floor(this.Math.floor(num/10)%10);
  var third=num%10;
  var f;
  var t;
  var s;
  var result;
      if(first==second&&second==third)
          {return num;}
      else if(first==second)
          {
            if(second>third)
                return second*110+third;
            else
                return third*100+second*11;
          }
  
      else if(second==third)
         {
         if(first>second)
            return first*100+second*11;
         else
            return second*110+first;
         }
      else if(first==third)
        {
        if(second>third)
            return second*100+11*third;
        else
            return third*110+second;
        }
      else 
        {
          f=this.Math.max(this.Math.max(first,second),third);
          t=this.Math.min(this.Math.min(first,second),third);
            if(first!=f&&first!=t)
                s=first;
            else if(second!=f&&second!=t)
                s=second;
            else if(third!=f&&third!=t)
                s=third;
         result=f*100+s*10+t;
         return result;
         }
    }
}
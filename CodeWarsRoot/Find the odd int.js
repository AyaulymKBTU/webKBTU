function findOdd(A) {
var appearances=[];
  //happy coding!
  var counter=0;
  for(var i=0;i<A.length;i++)
  {
  counter=0;
  for(var j=0;j<A.length;j++)
  {
  if(A[i]==A[j])
 { counter++;
}
  }
  appearances[i]=counter;
  }
  for(var z=0;z<appearances.length;z++)
  {
  if(appearances[z]%2==1)
  {return A[z];
  }
  }
  //return 0;
}
function race(v1, v2, g) {

    // your code
 var  first;
 var second;
 var third;
 var time
 if(v2<=v1){
 return null;
    }
    else{
    time=3600*g/(v2-v1);
    if(time<3600)
    {
    first=0;
    second=this.Math.floor(time/60);
    third=time/60-this.Math.floor(time/60);
    third*=60;
    third=this.Math.floor(third);
    }
    else{
    first=this.Math.floor(time/3600);
    second=time-first*3600;
    second/=60;
    third=second;
    second=this.Math.floor(second);
    third=time-second*60-first*3600;
    //third/=60;
    third=this.Math.floor(third);
    }
    var d=[];
    d.push(first);
    d.push(second);
    d.push(third);
    
    return d;}
}
var users = [{
    "user":"n1"
},
{
    "user":"n2"
},
{
    "user":"n3"
},
{
    "user":"n4"
},
{
    "user":"n5"
},
{
    "user":"n6"
},
{
    "user":"n7"
},
{
    "user":"n8"
}
];

var final = [];

 var value = users.map(element=> element.user);
randonNumber(value,value);

//console.log(value);

function randonNumber(parent,child){
    parentArray = Array.from(parent);
    childArray = Array.from(child);
    //console.log(parent);
    parents = (Math.floor(Math.random()*parentArray.length-1)+1);
    childs = (Math.floor(Math.random()*childArray.length-1)+1);
    if(parentArray[parents]==childArray[childs]){
        randonNumber(parentArray,childArray)
    }
    else{
       var data = {
           parent : parentArray[parents],
           child : childArray[childs]
       }
    //    console.log(data.parent)
    //    console.log(data.child)
    //    console.log(data);
        final.push(data);
    //    console.log(final);
      parentArray.splice(parents,1)
       childArray.splice(childs,1)
       if(parentArray.length != 0){
           randonNumber(parentArray,childArray);
       }
       else{
           console.log(final);
       }
    }
    //console.log(users);
}



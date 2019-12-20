function sendData(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var number = document.getElementById('number').value;

    var registerdata = {name,email,password,number};
    console.log(registerdata);

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST','http://localhost:3000/registerdata');
    xhttp.setRequestHeader('Content-Type','application/json');
    xhttp.send(JSON.stringify(registerdata));
}
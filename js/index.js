
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAuJZVB0gr-k0nTKURn6ZzYz0nzI4Ze2fo",
    authDomain: "tutorial1-83087.firebaseapp.com",
    databaseURL: "https://tutorial1-83087.firebaseio.com",
    projectId: "tutorial1-83087",
    storageBucket: "tutorial1-83087.appspot.com",
    messagingSenderId: "879025785406",
    appId: "1:879025785406:web:dc3fae6b7fcdbada21df6f",
    measurementId: "G-W8X786K8KR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  firebase.auth.Auth.Persistence.LOCAL;


  $("#btn-login").click(function(){
   
      var email = $("#email").val();
      var password = $("#password").val();
      
      if(email!="" && password!=""){
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);

            window.alert("Message : IL "+errorMessage);

        });
      }
      else{
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });


  $("#btn-signup").click(function(){
   
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmPassword").val();
    
    if(email!="" && password!=""  && cpassword!="" ){
        //window.alert("#"+password+"#"+cpassword+"#");
     if(password==cpassword){
        var result = firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);
  
            window.alert("Message : IL "+errorMessage);
  
        });
         
     }
     else{
         window.alert("Password do not match with the Confirm password.");
     }
    
    }
    else{
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});


$("#btn-logout").click(function(){
   firebase.auth().signOut();
    
});

$("#btn-resetPassword").click(function(){
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email !=""){
        auth.sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been send to you. Please check and verify.");
        }).catch(function(error){
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);
  
            window.alert("Message : IL "+errorMessage);

        });
    }else{
        window.alert("Please write your email first");
    }
     
 });

 $("#btn-update").click(function(){
     
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
   
    var firstname = $("#firstName").val();
    var secondname = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();
    
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);
    console.log(country);
    console.log(firstname);
    console.log(secondname);
    console.log(phone);
    console.log(address);
    console.log(bio);

    if(firstname!="" && secondname!="" && phone!="" && address!="" && bio!="" && country!="" && gender!=""){
        var userData = {
            "phone" : phone,
            "address": address,
            "bio": bio,
            "firstName":firstname,
            "secondName":secondname,
            "address":  address,
            "country":country,
            "gender": gender,
        };
        userRef.set(userData, function(error){
            if(error){
                var errcode = error.code;
                var errorMessage = error.message;
                console.log(errcode);
                console.log(errorMessage);
    
                window.alert("Message : IL "+errorMessage);


            }else{
                window.location.href = "MainPage.html";

            }
        });
    }else{
        window.alert("Please fill all fields.");
    }
     
 });


function switchView(view){
    $.get({
        url:view,
        cache:false,
    }).then(function(data){
        $("#container").html(data);
    });
}
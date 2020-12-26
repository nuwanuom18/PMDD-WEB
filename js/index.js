
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


$("#btn-login").click(function () {

    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function (error) {
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);

            window.alert("Message : IL " + errorMessage);

        });
    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});


$("#btn-signup").click(function () {

    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmPassword").val();

    if (email != "" && password != "" && cpassword != "") {
        //window.alert("#"+password+"#"+cpassword+"#");
        if (password == cpassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            result.catch(function (error) {
                var errcode = error.code;
                var errorMessage = error.message;
                console.log(errcode);
                console.log(errorMessage);

                window.alert("Message : IL " + errorMessage);

            });

        }
        else {
            window.alert("Password do not match with the Confirm password.");
        }

    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});



    


$("#btn-resetPassword").click(function () {
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            window.alert("Email has been send to you. Please check and verify.");
        }).catch(function (error) {
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);

            window.alert("Message : IL " + errorMessage);

        });
    } else {
        window.alert("Please write your email first");
    }

});

$("#btn-update").click(function () {

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

    if (firstname != "" && secondname != "" && phone != "" && address != "" && bio != "" && country != "" && gender != "") {
        var userData = {
            "phone": phone,
            "address": address,
            "bio": bio,
            "firstName": firstname,
            "secondName": secondname,
            "address": address,
            "country": country,
            "gender": gender,
        };
        userRef.set(userData, function (error) {
            if (error) {
                var errcode = error.code;
                var errorMessage = error.message;
                console.log(errcode);
                console.log(errorMessage);

                window.alert("Message : IL " + errorMessage);


            } else {
                window.location.href = "test.html";

            }
        });
    } else {
        window.alert("Please fill all fields.");
    }

});


function switchView(view) {


    document.getElementById("container").innerHTML = document.getElementById(view).innerHTML;
    /*
    $.get({
        url:view,
        cache:false,
    }).then(function(data){
        alert(data);
        $("#container").html(data);
    }); */
}

function pin(device, pin) {
    var rootRef = firebase.database().ref().child("users");
    var userRef = rootRef.child(device);

    var userData = {
        "pined": pin
    };
    userRef.update(userData, function (error) {
        if (error) {
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);

            window.alert("Message : IL " + errorMessage);


        }
    });

}

function changeOrderby(order) {


    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    var userData = {
        "orderby": order
    };
    userRef.update(userData, function (error) {
        if (error) {
            var errcode = error.code;
            var errorMessage = error.message;
            console.log(errcode);
            console.log(errorMessage);

            window.alert("Message : IL " + errorMessage);


        }
    });


}

$("#change-view-button").click(function () {
    alert("jslgfl");
    document.getElementById("#homepage1").innerHTML = 5 + 6;
    var mainPage = document.querySelector("#homepage1");
    var subPage = document.querySelector("#homepage2");
    mainPage.style.display = "none";
    if (mainPage.style.display !== "none") {
        mainPage.style.display = "none";
        subPage.style.display = "block";
    }
    else {
        mainPage.style.display = "block";
        subPage.style.display = "none";
    }
});


// Graph section

src = "https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js"
src = "https://cdn.anychart.com/releases/8.7.1/js/anychart-data-adapter.min.js"

function drawGraphs(name) {
    switchView('homepage2');
    console.log(name);

    var dref = firebase.database().ref().child("userdata/" + name);
    dref.on("value", function (device) {
        if (device.exists) {

            // temperature


            anychart.onDocumentReady(function () {
                anychart.data.loadCsvFile("data.csv", function (data) {
                    data = `value number,temperature,size\n`;

                    var i;
                    temp_arr = device.val().temp

                    for (i = 0; i < temp_arr.length; i++) {
                        data += i + `,` + temp_arr[i] + `,` + 5 + `\n`;

                    }

                    console.log(data);


                    // create the chart
                    chart = anychart.scatter();
                    // assign the data to a series
                    var series1 = chart.marker(data);
                    // set title
                    chart.title("Temperature - "+name);
                    // set axes titles 
                    chart.xAxis().title("value numbers");
                    chart.yAxis().title("Temperature");
                    // draw chart
                    chart.container("g1").draw();
                });
            });

            anychart.onDocumentReady(function () {
                anychart.data.loadCsvFile("data.csv", function (data) {
                    data = `value number,heart rate,size\n`;

                    var i;
                    temp_arr = device.val().heartrate

                    for (i = 0; i < temp_arr.length; i++) {
                        data += i + `,` + temp_arr[i] + `,` + 5 + `\n`;

                    }

                    console.log(data);


                    // create the chart
                    chart = anychart.scatter();
                    // assign the data to a series
                    var series1 = chart.marker(data);
                    // set title
                    chart.title("Heart rate - "+name);
                    // set axes titles 
                    chart.xAxis().title("value numbers");
                    chart.yAxis().title("Heart rate");
                    // draw chart
                    chart.container("g2").draw();
                });
            });

            anychart.onDocumentReady(function () {
                anychart.data.loadCsvFile("data.csv", function (data) {
                    data = `value number,SpO2 value,size\n`;

                    var i;
                    temp_arr = device.val().humidity

                    for (i = 0; i < temp_arr.length; i++) {
                        data += i + `,` + temp_arr[i] + `,` + 5 + `\n`;

                    }

                    console.log(data);


                    // create the chart
                    chart = anychart.scatter();
                    // assign the data to a series
                    var series1 = chart.marker(data);
                    // set title
                    
                    chart.title("SpO2 value - "+name);
                    // set axes titles 
                    chart.xAxis().title("value numbers");
                    chart.yAxis().title("SpO2 Value");
                    // draw chart
                    chart.container("g3").draw();
                });
            });



        }
    });

}

function goHome(){
    window.location.href = "test.html";
}

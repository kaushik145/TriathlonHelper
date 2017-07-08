 
 var config = {
    apiKey: "AIzaSyDn8pqJb2kq-3nDcBV13bSs8UZzssCKCcc",
    authDomain: "projectone-3d09c.firebaseapp.com",
    databaseURL: "https://projectone-3d09c.firebaseio.com",
    projectId: "projectone-3d09c",
    storageBucket: "projectone-3d09c.appspot.com",
    messagingSenderId: "227541584174"
  };
  firebase.initializeApp(config);

  var Database = firebase.database();
  const uemail=$('#textEmail');
  const upassword=$('#txtPasword');
  const btnlogin=$('#btnlogin');
  const btnSignup=$('#btnSignup');
  const btnLogout=$('#btnLogout');
   btnLogout.hide();

  var googleAccount=$('#googleSignin');

  console.log(uemail)
  console.log(upassword)


//login
  btnlogin.click( function(e){
  	e.preventDefault()
  	var email=uemail.val();
  	var pass=upassword.val()
    

  	if(!email||!pass){
  		return alert('email and password required')
  	}
   console.log(email)

  	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/invalid-email'|| errorCode == "auth/user-not-found" ) {
    alert(errorMessage);
  } else if( errorCode =="auth/wrong-password") {
    alert(errorMessage);

     } 
  // ...
});
  	 // $('#userZipcode').show();
  	 // btnLogout.show();
  	 // uemail.hide();
  	 // upassword.hide();
  	 // btnlogin.hide();
    //  btnSignup.hide();
  	 
  });
//  //sighn up
btnSignup.click(function(e){
	e.preventDefault()

    const email=uemail.val();
  	const pass=upassword.val()


  		if(!email||!pass){
  		return alert('email and password required')
  	}
   console.log(email);

  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
       // $('#userZipcode').show();
       //   btnLogout.show();
       //    uemail.hide()
  	    //   upassword.hide();
       //   btnlogin.hide();
       //   btnSignup.hide();
})


// //signeout
btnLogout.click(function(e){
         
    	 firebase.auth().signOut();
 window.location.reload(true)
  	    
 
  });

firebase.auth().onAuthStateChanged(function (firebaseUser) {
 if (firebaseUser) {
 console.log(firebaseUser);
          $("#messageOne").hide();
         $('#userZipcode').show();
          $("#messageTwo").show();
         btnLogout.show();
          uemail.hide()
          upassword.hide();
         btnlogin.hide();
         btnSignup.hide();;
 } else {
 console.log('not logged in');
    $('#userZipcode').hide();
            btnLogout.hide();
     $("#messageTwo").hide();
 } // end else statement
 }); // end function

$(document).ready(
	function () {
		$("#userZipcode").hide();
    $("#messageTwo").hide();
	}
 
);
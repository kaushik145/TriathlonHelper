 

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
  // ...
});
  	 $('#userZipcode').show();
  	 btnLogout.show();
  	 uemail.hide();
  	 upassword.hide();
  	 btnlogin.hide();
     btnSignup.hide();
  	 
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
       $('#userZipcode').show();
         btnLogout.show();
          uemail.hide()
  	      upassword.hide();
         btnlogin.hide();
         btnSignup.hide();
})

googleAccount.click(function(e){
	var provider = new firebase.auth.GoogleAuthProvider();

	      provider.addScope('https://www.googleapis.com/auth/plus.login');
		  provider.addScope('email');
		  provider.addScope('profile');

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});

    btnLogout.show();
          uemail.val('');
  	      upassword.val('');
});
// //signeout
btnLogout.click(function(e){
         
    	 uemail.val('');
  	     upassword.val('');
  	      uemail.show()
  	      upassword.show();
         btnlogin.show();
         btnSignup.show();
         btnLogout.hide();
  	 		
  	    
 
  });

$(document).ready(
	function () {
		$("#userZipcode").hide();
	}
 
);
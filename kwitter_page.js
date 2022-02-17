//YOUR FIREBASE LINKS

const firebaseConfig = {
	apiKey: "AIzaSyC1UIrfZhU6Iv7WIuCVI_SY1SeDfFEMX1A",
	authDomain: "kwitter-49872.firebaseapp.com",
	databaseURL: "https://kwitter-49872-default-rtdb.firebaseio.com",
	projectId: "kwitter-49872",
	storageBucket: "kwitter-49872.appspot.com",
	messagingSenderId: "414547250798",
	appId: "1:414547250798:web:56d951366545c3e181a07f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
	firebase.database().ref("/" + room_name).on('value', function (snapshot) {
		document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
			childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
				firebase_message_id = childKey;
				message_data = childData;
				//Start code

				console.log(firebase_message_id);
				console.log(message_data);
				name = message_data['name'];
				message = message_data['message'];
				like = message_data['like'];

				name_with_tag = "<h4>"+ name +" <img src = 'tick.png' class = 'user_tick'></h4>";
				message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>";
				like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" onclick = 'update_like(this.id)'>";
				span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>&nbsp;Like : "+like+"</span></button>"
				row = name_with_tag + message_with_tag + like_button + span_with_tag;
				document.getElementById("output").innerHTML += row;

				//End code
			}
		});
	});
}
getData();

function send() {

	msg = document.getElementById("msg").value;

	firebase.database().ref(room_name).push({

		name:user_name,
		message:msg,
		like:0

	});

	document.getElementById("msg").value = "";

}

function update_like(message_id) {

 console.log(`Clicked on like button ${message_id}`);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	update_likes = Number(likes) + 1;

	firebase.database().ref(room_name).child(message_id).update ({

		like:update_likes

	});

}
//ADD YOUR FIREBASE LINKS HERE

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

function getData() {
	firebase.database().ref("/").on('value', function (snapshot) {
		document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
			childKey = childSnapshot.key;
			Room_names = childKey;
			//Start code
			console.log("Room Name = " + room_name);
			row = "<div class ='room_name' id =" + Room_names + " onclick='redirect(this.id)'># " + Room_names + "</div><hr>"

			document.getElementById("output").innerHTML += row;
			//End code
		});
	});
}
getData();

function addRoom() {

	room_name = document.getElementById("room_name").value;
	firebase.database().ref("/").child(room_name).update({
		purpose: "add room name"
	});

	localStorage.setItem("room_name", room_name);
	window.location = "kwitter_room_page.html";
}

function redirect(name) {

	localStorage.setItem("room_name", name);
	console.log(name);
	window.location = "kwitter_page.html";

}

function logout() {

	localStorage.removeItem("user_name");
	localStorage.removeItem("room_name");
	window.location = "index.html";

}

user_name = localStorage.getItem("user_name", user_name);

document.getElementById("name").innerHTML = "Welcome " + user_name + "!";

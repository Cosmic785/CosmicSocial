let profileImage = "";
let username = localStorage.getItem("username") || "User";

document.getElementById("username").value = username;

let savedAvatar = localStorage.getItem("avatar");

if (savedAvatar) {
    document.getElementById("avatar").src = savedAvatar;
}

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function saveProfile() {

    username = document.getElementById("username").value;

    localStorage.setItem("username", username);

    let file = document.getElementById("profilePic").files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function(e) {

            profileImage = e.target.result;

            document.getElementById("avatar").src = profileImage;

            localStorage.setItem("avatar", profileImage);
        };

        reader.readAsDataURL(file);
    }
}

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost() {

    let text = document.getElementById("postBox").value;
    let imageFile = document.getElementById("imageInput").files[0];

    if (text.trim() === "" && !imageFile) {
        return;
    }

    if (imageFile) {

        let reader = new FileReader();

        reader.onload = function(e) {

            posts.unshift({
                username: username,
                text: text,
                image: e.target.result,
                likes: 0,
                liked: false
            });

            savePosts();
            renderPosts();
        };

        reader.readAsDataURL(imageFile);

    } else {

        posts.unshift({
            username: username,
            text: text,
            image: "",
            likes: 0,
            liked: false
        });

        savePosts();
        renderPosts();
    }

    document.getElementById("postBox").value = "";
    document.getElementById("imageInput").value = "";
}

function toggleLike(index) {

    if (posts[index].liked) {
        posts[index].liked = false;
        posts[index].likes--;
    } else {
        posts[index].liked = true;
        posts[index].likes++;
    }

    savePosts();
    renderPosts();
}

function renderPosts() {

    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    posts.forEach((post, index) => {

        let imageHTML = "";

        if (post.image) {
            imageHTML =
                '<img src="' +
                post.image +
                '" style="max-width:100%;border-radius:10px;">';
        }

        let heart = post.liked ? "❤️" : "🤍";

        feed.innerHTML +=
            '<div class="post">' +
            '<h3>' + post.username + '</h3>' +
            imageHTML +
            '<p>' + post.text + '</p>' +
            '<button class="heartBtn" onclick="toggleLike(' + index + ')">' +
            heart +
            '</button> ' +
            '<span>' + post.likes + '</span> likes' +
            '</div>';
    });
}

renderPosts();
let form = document.querySelector('.find-comment');
let input = form.elements['find-id'];
let postWrapper = document.querySelector('.post-wrapper');
let commentWrapper = document.querySelector('.comment-wrapper');
let preloader = document.getElementById("preloader");

form.addEventListener('submit', function(e) {
  e.preventDefault();
  postWrapper.innerHTML = '';
  commentWrapper.innerHTML = '';
  fetchJsonPlaceholder(parseInt(input.value));
});

async function fetchJsonPlaceholder(id) {
  try {
    preloader.style.display = "inline-block"
    let responsePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (responsePost.status >= 400 && responsePost.status < 600) {
      throw new Error("Bad response from server");
    } else {
      let posts = await responsePost.json(); 
      getPrintUserPost(posts.body);
    }
        
    let responseComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    if(responseComments.ok) {
      preloader.style.display = "none";
      let comments = await responseComments.json();
      comments.forEach((item) => {
        getPrintUsersComments(item.email, item.body);
      });
    }
    if (responseComments.status >= 400 && responseComments.status < 600) {
      throw new Error("Bad response from server");
    } 
  } catch(err) {
    alert(err)
    preloader.style.display = "inline-block"
    postWrapper.innerHTML = '';
    commentWrapper.innerHTML = '';
  }
}

function getPrintUserPost(body) {
  postWrapper.insertAdjacentHTML(
    'beforeend',
      `<div class='user__card-body'>
        <h4 class='user__card-title'>${body}</h4>
      </div>`
  );
}

function getPrintUsersComments(email, comment) {
  commentWrapper.insertAdjacentHTML(
    'beforeend',
      `<div class='user__post-body'>
        <div class='user__post-div'>
          <i class="material-icons">account_box</i>
          <h4 class='user__post-email'>${email}</h4>
        </div>
        <p class='user__post-comment'>${comment}</p>
      </div>`
  );
}
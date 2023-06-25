const posts = [];

const TITTLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;


const postTitleInputNode = document.getElementById('js-post-title-input');
const postTextInputNode = document.getElementById('js-post-text-input');
const postsNode = document.getElementById('js-posts');
const postBtn = document.getElementById('btn-post');
const validationMessage = document.getElementById("validationeMessage")
const validationMessageText = document.getElementById("validationeMessageText")

postBtn.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();

    postTitleInputNode.value = "";
    postTextInputNode.value = "";
});

postTitleInputNode.addEventListener("input", validation);
postTextInputNode.addEventListener("input", validation);

function validation  () {
    const titlelen = postTitleInputNode.value.length;
    const textlen = postTextInputNode.value.length;

    if (titlelen <= TITTLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Осталось ${TITTLE_VALIDATION_LIMIT-titlelen} символов`;
        validationMessage.classList.remove("validationMessage_hidden");
        validationMessageText.classList.add("validationMessageText_hidden");
        postBtn.disabled = false;
        
        
    } else {
        validationMessage.innerText = `Длинна заголовка не должна превышать ${TITTLE_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove("validationMessage_hidden");
        postBtn.disabled = true;
        
    };

     if (textlen<=TEXT_VALIDATION_LIMIT) {
        validationMessageText.innerText = `Осталось ${TEXT_VALIDATION_LIMIT-textlen} символов`;
        validationMessageText.classList.remove("validationMessageText_hidden");
        postBtn.disabled = false
        
        
    } else {
        validationMessageText.innerText = `Длинна текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationMessageText.classList.remove("validationMessageText_hidden");
        postBtn.disabled = true;
    };

    if (textlen === 0 || titlelen === 0 || textlen > TEXT_VALIDATION_LIMIT || titlelen > TITTLE_VALIDATION_LIMIT){
        postBtn.disabled = true
    }
};

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title: title,
        text: text
    };
}

function addPost({title, text}) {
    const currntDate = new Date();
    const date = `${currntDate.toLocaleDateString()} ${currntDate.toLocaleTimeString()}`;

    posts.push({
        date,
        title,
        text
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts ();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <p class='post__date'>${post.date}<p/>
                <p class='post__title'>${post.title}<p/>
                <p class='post__text'>${post.text}</p>
            </div>
        `
    });
        
    postsNode.innerHTML = postsHTML;
}
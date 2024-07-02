document.addEventListener('DOMContentLoaded', () => {
    const formPage = document.getElementById('formPage');
    const postsPage = document.getElementById('postsPage');
    const blogForm = document.getElementById('blogForm');
    const themeToggle = document.getElementById('themeToggle');
    const backButton = document.getElementById('backButton');
    const errorMessage = document.getElementById('error-message');
    const postsContainer = document.getElementById('postsContainer');

    // Toggle Theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Back Button
    backButton.addEventListener('click', () => {
        formPage.style.display = 'flex';
        postsPage.style.display = 'none';
    });

    // Form Submit
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (!username || !title || !content) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        const post = {
            username,
            title,
            content
        };

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        blogForm.reset();

        // Redirect to posts page
        loadPosts();
        formPage.style.display = 'none';
        postsPage.style.display = 'flex';
    });

    // Load Posts
    function loadPosts() {
        postsContainer.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><strong>Posted by: ${post.username}</strong></p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Initialize
    loadPosts();
});

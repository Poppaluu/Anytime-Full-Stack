
// Sample posts data
let posts = [
    { id: 1, title: 'Post 1', content: 'Content 1' },
    { id: 2, title: 'Post 2', content: 'Content 2' },
    { id: 3, title: 'Post 3', content: 'Content 3' },
    { id: 4, title: 'Post 4', content: 'Content 4' },
    { id: 5, title: 'Post 5', content: 'Content 5' }
];

//@desc     Get all posts
//@route    GET /api/posts
const getPosts =  (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : posts.length;
        const sort = req.query.sort;

        let sortedPosts = posts;

        if (sort) {
            sortedPosts = posts.slice().sort((a, b) => {
                if (sort === 'asc') {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
        }

        res.status(200).json(sortedPosts.slice(0, limit));
    } catch (error) {
        next(error);
    }
}

//@desc     Get post by ID
//@route    GET /api/posts/:id
const getPostById =  (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
}

//@desc     Create new post
//@route    POST /api/posts
const createPost = (req, res, next) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };

    if (!title || !content) {
        const error = new Error('Please include title and content');
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);

    res.status(201).json(newPost);
}

//@desc     Update post
//@route    PUT /api/posts/:id
const updatePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        return next(error);
    }

    const { title, content } = req.body;
    if (!title && !content) {
        const error = new Error('Please include title or content');
        error.status = 400;
        return next(error);
    }

    if (title) {
        post.title = title;
    }

    if (content) {
        post.content = content;
    }

    res.status(200).json(post);
}

//@desc     Delete post
//@route    DELETE /api/posts/:id
const deletePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        return next(error);
    }

    posts = posts.filter(p => p.id !== postId);
    res.status(200).json({ message: 'Post deleted' });
}


export { getPosts, getPostById, createPost, updatePost, deletePost };
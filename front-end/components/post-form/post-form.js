import { useState, useEffect } from 'react';

import classes from './post-form.module.css';

import handler from '../../pages/api/post';

async function createPost(postDetails) {
    const response = await handler(postDetails);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
}

function PostForm() {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredContent, setEnteredContent] = useState('');
    const [enteredExcerpt, setEnteredExcerpt] = useState('');
    const [enteredAuthorId, setEnteredAuthorId] = useState('');
    const [enteredPublished, setEnteredPublished] = useState('true');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();


    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
          const timer = setTimeout(() => {
            setRequestStatus(null);
            setRequestError(null);
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, [requestStatus]);

      async function sendMessageHandler(event) {
        event.preventDefault();

        // optional: add client-side validation

        setRequestStatus('pending');

        try {
          setEnteredExcerpt(enteredContent.substring(0,99));

          await createPost({
            title: enteredTitle,
            content: enteredContent,
            excerpt: enteredExcerpt,
            authorId: enteredAuthorId,
            published: enteredPublished,
          });
          setRequestStatus('success');
          setEnteredTitle('');
          setEnteredContent('');
          setEnteredAuthorId('');
        } catch (error) {
          setRequestError(error.message);
          setRequestStatus('error');
        }
      }

      return (
        <section className={classes.contact}>
          <h1>Create a New Post</h1>
          <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label htmlFor='title'>Post Title</label>
                <input
                  type='title'
                  id='title'
                  required
                  value={enteredTitle}
                  onChange={(event) => setEnteredTitle(event.target.value)}
                />
              </div>
                <div className={classes.control}>
                <label htmlFor='authorId'>Author ID</label>
                <input
                    type='authorId'
                    id='authorId'
                    required
                    value={enteredAuthorId}
                    onChange={(event) => setEnteredAuthorId(event.target.value)}
                ></input>
              </div>
              <div className={classes.control}>
                <label htmlFor='content'>Content</label>
                <textarea
                  type='content'
                  id='content'
                  rows='10'
                  required
                  value={enteredContent}
                  onChange={(event) => setEnteredContent(event.target.value)}
                ></textarea>
              </div>
            </div>

            <div className={classes.actions}>
              <button>Publish Post</button>
            </div>
          </form>
        </section>
      );
}

export default PostForm;
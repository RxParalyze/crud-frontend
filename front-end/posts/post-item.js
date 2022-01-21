import Link from 'next/link';

import classes from './all-posts.module.css';
import Date from '../components/date';

function PostItem(props) {
    const { title, excerpt, date, id } = props.post;

    const linkPath = `/posts/${id}`;

    const formattedDate = Date(date);

    return (
        <li className={classes.post}>
          <Link href={linkPath}>
            <a>
              <div className={classes.content}>
                <h3>{title}</h3>
                <time>{formattedDate}</time>
                <p>{excerpt}</p>
              </div>
            </a>
          </Link>
        </li>
      );
}

export default PostItem;
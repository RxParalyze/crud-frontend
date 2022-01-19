import Link from 'next/link';

import classes from './main-navigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/api/post'>Create a Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

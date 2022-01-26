import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import { Link } from '../components';
import { userService } from '../services';


const name = 'Space Force Blog';

export const siteTitle = 'Space Force Blog';

export default Home;


function Home({ home }) {

    const data = userService.userValue;
    //console.log(dataJson);
    const firstName = data.firstName;

    return (
        <div className="p-4">
             <Head>
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                <>
                    <Image
                    priority
                    src="/images/space_force.jpg"
                    className={utilStyles.borderCircle}
                    height={250}
                    width={250}
                    alt={name}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
                ) : (
                <>
                    <Link href="/">
                    <a>
                        <Image
                        priority
                        src="/images/space_force.jpg"
                        className={utilStyles.borderCircle}
                        height={250}
                        width={250}
                        alt={name}
                        />
                    </a>
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                    <Link href="/">
                        <a className={utilStyles.colorInherit}>{name}</a>
                    </Link>
                    </h2>
                </>
                )}
            </header>
            <div className="container">
                <h1>Hi {firstName}!</h1>
                <p>You&apos;re logged into the Space Force Blog</p>
                <p><Link href="/users">Manage Users</Link></p>
                <p><Link href="/posts">See Posts</Link></p>
            </div>
        </div>
    );
}

import { userService } from '../services';
import { Link } from '../components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>You&apos;re logged into the Space Force Blog</p>
                <p><Link href="/users">Manage Users</Link></p>
                <p><Link href="/posts">See Posts</Link></p>
            </div>
        </div>
    );
}

import { useUser } from '../../lib/posts'

// page component

function Page () {
    return <div>
      <Content />
    </div>
}

// child components


function Content () {
    const { user, isLoading } = useUser()
    if (isLoading) return <Spinner />
    return <h1>Welcome back, {user.name}</h1>
}
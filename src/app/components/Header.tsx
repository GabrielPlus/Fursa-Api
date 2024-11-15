import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
  let user = null;
  let signInUrl = "#";
  try {
    user = await getUser();
    signInUrl = await getSignInUrl();
  } catch (error) {
    console.error("Error fetching authentication data:", error);
  }

  if (!signInUrl) {
    return <p>Loading...</p>;
  }

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={'/'} className="flex items-center gap-2 font-bold text-xl">
          <span
            className="material-symbols-outlined text-blue-600"
            style={{ fontSize: '28px' }}
          >
            Fursa Jobs Hub
          </span>
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link
              className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
              href={signInUrl}
              aria-label="Login"
            >
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button
                type="submit"
                className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
                aria-label="Logout"
              >
                Logout
              </button>
            </form>
          )}
          <Link
            className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
            href={'/new-listing'}
            aria-label="Post a job"
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}

// components/Navbar.js
import Link from 'next/link';

export default function Navbar () {
  return (
    <div className='flex flex-row text-color-400'>
    <nav className=''>
      <ul>
        <li>
          <Link legacyBehavior href="/" >
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/reminder">
            <a>Reminder</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/upload">
            <a>Upload</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/predict">
            <a>Predict</a>
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};


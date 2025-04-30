// app/(do not follow layout)/not-found.js

import Link from 'next/link';
import "./globals.css";

export default function NotFound() {
    return (

        <section className="not-found">
            <Link href="/" passHref>
                Back to Homepage
            </Link>
            <div className="not-found-content text-center">
                <h3>Oops!</h3>
                <img src="/images/404.png" alt="404" className="img-fluid" />
                <h3 className="mb-0">Page Not Found!</h3>
            </div>
        </section>

    );
}


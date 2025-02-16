import Head from 'next/head';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            <div className="min-h-screen bg-yellow-50">
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    )
}
import '../styles/globals.css'
import {AppProps} from 'next/app'
import Head from "next/head";
import React from "react";
import '../styles/mainPage.css';
// @ts-ignore
export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Тестовое задание</title>
                <meta name="description" content="Тестовое задание"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                <Component {...pageProps} />
            </main>

        </>
    )
}

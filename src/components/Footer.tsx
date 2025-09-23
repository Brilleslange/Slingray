import Envelope from '../assets/envelope.svg?react';
import GitHub from '../assets/github-mark.svg?react';
import KoFi from '../assets/ko-fi.png';

export default function Footer() {
    return (
        <footer className={"footer footer-horizontal p-4 justify-end align-center"}>
            <a href={"mailto:slingray@brilleslange.net"}><Envelope className={"size-6"} /></a>
            <a href={"https://github.com/brilleslange/slingray"} ><GitHub className={"size-6"} /></a>
            <a href={"https://ko-fi.com/brilleslange"}><img src={KoFi} alt={"Ko-Fi"} className={"h-6"}/></a>
        </footer>
    )
}
import SlingrayLogo from '../assets/slingray.svg?react';

export default function Header() {
    return (
        <header className={"flex items-center gap-4 p-4"}>
            <SlingrayLogo className="size-28" />
            <h1 className={"text-6xl grow"}>Slingray</h1>
            <h2 className={"text-2xl hidden md:inline"}>Twilight Imperium 4th Edition Color Assigner</h2>
        </header>
    )
}
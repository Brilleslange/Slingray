import SlingrayLogo from '../assets/slingray.svg?react';

export default function Header() {
    return (
        <header>
            <div className="navbar">
                <div>
                    <SlingrayLogo className="size-32" />
                </div>
                <div>
                    <h1>Slingray</h1>
                </div>
                <div>
                    <h2>Twilight Imperium 4th Edition Color Assigner</h2>
                </div>
            </div>
        </header>
    )
}
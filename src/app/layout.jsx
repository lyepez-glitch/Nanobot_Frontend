import '../../globals.css';

export default function RootLayout({ children, title = 'Nanobot Simulation Dashboard' }) {
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
            </head>
            <body>
                <div className="min-h-screen flex flex-col items-center bg-gray-50">
                    <header className="text-center w-full bg-blue-600 text-white py-4 shadow-md">
                        <div className="max-w-screen-lg mx-auto text-center">
                            <h1 className="dashboardHeader text-3xl font-semibold">{title}</h1>
                        </div>
                    </header>
                    <main id="main" className="main flex-1 w-full max-w-screen-lg px-4 py-6">{children}</main>
                    <footer className="footer w-full bg-gray-800 text-gray-300 py-4 text-center text-sm">
                        &copy; 2024 Nanobot Simulation. All rights reserved.
                    </footer>
                </div>
            </body>
        </html>
    );
}

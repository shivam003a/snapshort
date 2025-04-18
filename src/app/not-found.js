function notFound(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
            <a 
                href="/" 
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
                Go back to Home
            </a>
        </div>
    )
}

export default notFound
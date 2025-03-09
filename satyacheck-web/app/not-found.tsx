export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white p-4">
      <div className="bg-red-600 p-8 rounded-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition duration-300 inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

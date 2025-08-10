import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-center text-black px-4">
      {/* Small Video Above 404 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-[500px] h-[500px] mb-6"
      >
        <source src="/404Error.mp4" type="video/webm" />
      </video>

        <div>
            <h1 className="text-6xl font-bold text-white-500">Page Not Found</h1>

            <Link
                to="/"
                className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
            >
                Go Back Home
            </Link>
        </div>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed bottom-0 right-4 h-auto w-[300px] mix-blend-multiply pointer-events-none"
        >
            <source src="/cat.mp4" type="video/webm" />
        </video>
    </div>
  );
};

export default NotFoundPage;

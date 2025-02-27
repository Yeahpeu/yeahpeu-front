export default function MyLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-8 border-red-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-red-300 text-lg font-semibold animate-bounce">
          Loading...
        </p>
      </div>
    </div>
  );
}

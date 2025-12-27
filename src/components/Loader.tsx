export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Loading FairTravel…
      </p>
    </div>
  );
}

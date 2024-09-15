'use client'

export function LoadingSpinner({
  size = "default"
} = {}) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    default: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4"
  }

  return (
    (<div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-t-primary border-r-primary border-b-primary border-l-primary/30 rounded-full animate-spin`}
        role="status"
        aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>)
  );
}
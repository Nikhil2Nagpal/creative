/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',    // Indigo
        secondary: '#8B5CF6',  // Violet
        success: '#10B981',    // Emerald
        warning: '#F59E0B',    // Amber
        danger: '#EF4444',     // Red
      }
    },
  },
  plugins: [],
  // Force include common classes used in the project
  safelist: [
    'p-6', 'text-3xl', 'font-bold', 'text-gray-800', 'mb-6',
    'flex', 'gap-4', 'bg-white', 'p-4', 'rounded-lg', 'shadow-sm',
    'px-3', 'py-2', 'border', 'rounded',
    'overflow-x-auto', 'pb-4',
    'bg-purple-500', 'bg-orange-500', 'bg-green-500',
    'text-white', 'rounded-t-lg',
    'w-full', 'py-2', 'border-2', 'border-dashed', 'border-gray-300', 
    'text-gray-500', 'hover:border-gray-400', 'hover:text-gray-700', 'transition', 'mb-4',
    'bg-white', 'border-2', 'border-dashed', 'rounded-lg', 'p-4', 'shadow-lg', 'w-80',
    'font-medium',
    // Add more as needed
  ]
}
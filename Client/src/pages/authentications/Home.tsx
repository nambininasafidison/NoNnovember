import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre site</h1>
      <p className="mb-6 text-gray-700">
        Connectez-vous ou inscrivez-vous pour continuer.
      </p>

      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Inscription
        </Link>
      </div>
    </div>
  );
}

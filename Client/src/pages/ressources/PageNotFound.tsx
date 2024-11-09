import { FrownIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FrownIcon className="mx-auto h-12 w-12 text-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oups, page introuvable !
        </h1>
        <p className="mt-4 text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Aller à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

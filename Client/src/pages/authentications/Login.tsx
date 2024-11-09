import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import JustAlert from "@/components/JustAlert";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthProvider";
import { API } from "@/utils/serverConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rocket } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, {
    message: "Mot de passe requis et doit être au moins 8 caractères",
  }),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const { setTokens } = useAuth();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormData) => {
    setServerResponse(null);
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const url = `${API}/${import.meta.env.VITE_SIGNIN_API}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'authentification");
      }
      const responseData = await response.json();
      setTokens(responseData);
      reset();
      setServerResponse(responseData.message || "Authentification réussie");
      setIsServerOpen(true);
      if (!responseData.message && !isServerOpen) {
        window.location.href = "/";
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur inconnue est survenue"
      );
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 flex items-center justify-center w-screen min-h-screen bg-background">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-200">
            <Rocket className="w-6 h-6 inline-block mr-2" />
            Connexion à Votre Voyage Spatial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormProvider {...methods}>
            <form
              action=""
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full space-y-6 mt-16"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Adresse e-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="astronaute@espace.com"
                  {...register("email")}
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <AlertDialogDemo
                label="Connexion"
                title="Etes vous sur de se connecter ?"
                className="text-md p-6 gap-4 mt-32 w-full"
                alertStatus={async () => {
                  handleSubmit(onSubmit)();
                }}
              />
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              S&apos;inscrire
            </Link>
          </p>
          <Link to="/" className="text-secondary">
            Accueil
          </Link>
        </CardFooter>
      </Card>
      {serverResponse && (
        <JustAlert
          title={serverResponse}
          isOpen={isServerOpen}
          variant="default"
          onClose={() => setIsServerOpen(false)}
        />
      )}
      {errorMessage && (
        <JustAlert
          title={errorMessage}
          isOpen={isErrorOpen}
          variant="destructive"
          onClose={() => setIsErrorOpen(false)}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
}

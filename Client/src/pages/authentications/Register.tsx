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
import { API } from "@/utils/serverConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rocket } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, {
    message: "Mot de passe requis et doit être au moins 8 caractères",
  }),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const [newPassword, setNewPassword] = useState("");
  const [isMatch, setIsMacth] = useState(false);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
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
      const url = `${API}/${import.meta.env.VITE_SIGNUP_API}`;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (newPassword === methods.getValues("password")) setIsMacth(true);
  };

  return (
    <div className="container px-4 py-8 flex items-center justify-center w-screen min-h-screen bg-background">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-200">
            <Rocket className="w-6 h-6 inline-block mr-2" />
            Inscription
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
                  Votre nom
                </Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Astronaute Bill"
                  {...register("name")}
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-slate-200">
                  Retaper le mot de passe
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => handleChange(e)}
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  required
                />
              </div>
              {!isMatch && newPassword.length >= 8 && (
                <p className="text-red-500">
                  Les mots de passe ne sont pas égale
                </p>
              )}
              <AlertDialogDemo
                label="S'inscrire"
                title="Etes vous sur de s'inscrire ?"
                className="text-md p-6 gap-4 mt-32 w-full"
                alertStatus={async () => {
                  handleSubmit(onSubmit)();
                }}
              />
            </form>
          </FormProvider>
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
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-400">
            Deja a une compte ?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

import loginPic from "@/assets/16218.jpg";
import astro from "@/assets/Astro_gen.svg";
import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import JustAlert from "@/components/JustAlert";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthProvider";
import { API } from "@/utils/serverConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Rocket } from "lucide-react";
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
      const url = `${API}/auth/login`;
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
    <div className="w-screen min-h-screen bg-primary flex lg:flex-row flex-col">
      <div className="lg:w-7/12 w-full h-screen flex flex-col items-center justify-start">
        <div className="container lg:p-36 lg:py-28 p-10 relative">
          <div className="flex items-center justify-start gap-5 w-full lg:mb-24 mb-10">
            <div className="aspect-video h-14 w-14">
              <img src={astro} alt="astrogen" className="object-cover" />
            </div>
            <h1 className="lg:text-5xl text-3xl">Astrogen</h1>
          </div>
          <h1 className="lg:text-6xl text-4xl">Se connecter</h1>
          <p className="lg:text-xl text-md text-slate-400 mb-16">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              S&apos;inscrire
            </Link>
            <Rocket className="w-6 h-6 inline-block ml-2" />
          </p>
          <div className="lg:flex hidden gap-8 text-nowrap items-center w-full mb-24">
            <hr className="border-2 border-foreground w-full" />
            <p className="text-lg uppercase">Se connecter par mail</p>
            <hr className="border-2 bg-foreground w-full" />
          </div>
          <FormProvider {...methods}>
            <form
              action=""
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full space-y-10 mt-16"
            >
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Adresse e-mail"
                  {...register("email")}
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground lg:text-xl text-md outline-none py-7"
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200"></Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  {...register("password")}
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground lg:text-xl text-md outline-none py-7"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="w-full flex mt-32 gap-4 items-center">
                <AlertDialogDemo
                  label="Connexion"
                  title="Etes vous sur de se connecter ?"
                  className="text-lg p-6 gap-4  w-full bg-secondary text-background hover:bg-popover"
                  alertStatus={async () => {
                    handleSubmit(onSubmit)();
                  }}
                />
                <Link to="/" className="text-secondary w-fit">
                  <Home className="h-9 w-9" />
                </Link>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="lg:w-5/12 w-full lg:h-screen lg:block hidden p-5 lg:order-last order-first">
        <div className="aspect-video h-full w-full rounded-xl overflow-hidden">
          <img src={loginPic} alt="astrogen" className="object-cover h-full" />
        </div>
      </div>

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

import loginPic from "@/assets/16218.jpg";
import astro from "@/assets/Astro_gen.svg";
import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import JustAlert from "@/components/JustAlert";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/utils/serverConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Rocket } from "lucide-react";
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
      const url = `${API}/auth/signup`;
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
    <div className="w-screen min-h-screen bg-primary flex">
      <div className="w-7/12 h-screen flex flex-col items-center justify-start">
        <div className="container p-36 py-20 relative">
          <div className="flex items-center justify-start gap-5 w-full mb-16">
            <div className="aspect-video h-14 w-14">
              <img src={astro} alt="astrogen" className="object-cover" />
            </div>
            <h1 className="text-5xl">Astrogen</h1>
          </div>
          <h1 className="text-6xl">S'incrire</h1>
          <p className="text-xl text-slate-400 mb-16">
            Avoir une compte ?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Se connecter
            </Link>
            <Rocket className="w-6 h-6 inline-block ml-2" />
          </p>
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
                  id="name"
                  type="name"
                  placeholder="Votre nom"
                  {...register("name")}
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground text-xl outline-none py-7"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Adresse e-mail"
                  {...register("email")}
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground text-xl outline-none py-7"
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
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground text-xl outline-none py-7"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  placeholder="Retaper le mot de passe"
                  onChange={(e) => handleChange(e)}
                  className="bg-none border-0 border-b-4 border-foreground rounded-none text-foreground placeholder:text-foreground text-xl outline-none py-7"
                  required
                />
                {!isMatch && newPassword.length >= 8 && (
                  <p className="text-red-500">
                    Les mots de passe ne sont pas égale
                  </p>
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

      <div className="w-5/12 h-screen p-5 lg:order-last order-first">
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

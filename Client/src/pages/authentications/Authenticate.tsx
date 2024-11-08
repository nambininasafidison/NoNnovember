import photo from "@/assets/Auth-pic.png";
import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import JustAlert from "@/components/JustAlert";
import Loader from "@/components/Loader";
import OtpConfirm from "@/components/OtpConfirm";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthProvider";
import { compareValue, getValue, setValue } from "@/utils/crypt";
import { OtpRef } from "@/utils/Type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Adresse email requis invalid"),
  password: z.string().min(8, {
    message: "Mot de passe requis et doit être au moins 8 caractères",
  }),
});
type FormData = z.infer<typeof schema>;

export default function Authenticate() {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [sendOtpStatus, setSendOtpStatus] = useState<boolean>(false);
  const { setTokens } = useAuth();
  const otpRef = useRef<OtpRef>(null);

  const sendOtp = () => {
    if (otpRef.current) {
      otpRef.current.sendOtpConfirm();
    }
  };

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
      const url = `${import.meta.env.VITE_SERVER_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/${import.meta.env.VITE_SIGNIN_API}`;
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
        setSendOtpStatus(false);
        window.location.href = "/";
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Une erreur inconnue est survenue");
      }
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const nothing = async () => {
      const localMail = await getValue(import.meta.env.VITE_AUTHENTICATION_KEY);
      const unknownLocal = await getValue(
        import.meta.env.VITE_UNKNOWN_PUBLIC_KEY
      );
      methods.setValue("email", localMail || "");
      methods.setValue("password", unknownLocal || "");
    };
    const checkOtpStatus = async () => {
      const compareStatus = await compareValue(
        import.meta.env.VITE_OTP_STATUS_KEY,
        import.meta.env.VITE_OTP_VALUE_KEY
      );
      const notCompareStatus = await compareValue(
        import.meta.env.VITE_OTP_STATUS_KEY,
        import.meta.env.VITE_OTP_NOT_VALUE_KEY
      );
      if (compareStatus) nothing();
      setSendOtpStatus(compareStatus ? true : notCompareStatus ? false : false);
    };
    checkOtpStatus();
  }, [methods, sendOtpStatus]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container grid lg:grid-cols-2 grid-cols-1 bg-muted rounded-xl">
        <div className="lg:px-16 flex flex-col lg:py-40 py-5">
          <h1 className="lg:text-3xl text-xl">Authentification</h1>
          <p className="text-muted-foreground lg:text-lg text-xs">
            Seul les administrateurs de MADA.H ont besoin de visiter ce site,
            c'est pas la peine d'authentifier si vous n'etes pas l'une des
            administrateurs de MADA.H.
          </p>
          <FormProvider {...methods}>
            <form
              action=""
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full space-y-6 mt-16"
            >
              <FormField
                name="email"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">Adresse email</FormLabel>
                    <FormControl className="h-14 text-md">
                      <Input placeholder="admin" {...register("email")} />
                    </FormControl>
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    <FormDescription>
                      L'adresse email que vous avez generé a l'inscription.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-md">Mot de passe</FormLabel>
                    <FormControl className="h-14 text-md border-2 border-border">
                      <Input
                        type="password"
                        placeholder="Votre mot de passe"
                        {...register("password")}
                      />
                    </FormControl>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <FormDescription>
                      Le mot de passe que vous avez generé à l'inscription.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <AlertDialogDemo
                label="Connexion"
                title="Etes vous sur de se connecter ?"
                className="text-md p-6 gap-4 mt-32 w-full"
                alertStatus={async () => {
                  await setValue(
                    import.meta.env.VITE_AUTHENTICATION_KEY,
                    methods.getValues("email")
                  );
                  await setValue(
                    import.meta.env.VITE_UNKNOWN_PUBLIC_KEY,
                    methods.getValues("password")
                  );
                  await sendOtp();
                }}
              />
            </form>
          </FormProvider>
          {serverResponse && (
            <JustAlert
              title={serverResponse}
              isOpen={isServerOpen}
              variant="default"
              onClose={() => {
                setIsServerOpen(false);
              }}
            />
          )}
          {errorMessage && (
            <JustAlert
              title={errorMessage}
              isOpen={isErrorOpen}
              variant="destructive"
              onClose={() => {
                setIsErrorOpen(false);
              }}
            />
          )}
          {isLoading && <Loader />}
        </div>
        <div className="h-full py-5 lg:order-last order-first">
          <div className="mx-auto aspect-video rounded-xl object-center sm:w-full border-2 h-full overflow-hidden flex items-end">
            <img src={photo} alt="Logo" className="object-cover" />
          </div>
        </div>
      </div>
      <OtpConfirm
        ref={otpRef}
        isOpen={sendOtpStatus}
        description="Entrez le code OTP envoyé à votre adresse email."
        email={methods.getValues("email")}
        onOtpValidated={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </div>
  );
}

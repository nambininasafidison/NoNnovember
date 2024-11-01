import { setValue } from "@/utils/crypt";
import { OptPropsType, OtpRef } from "@/utils/Type";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";
import JustAlert from "./JustAlert";
import Loader from "./Loader";

function OtpConfirm(props: OptPropsType, ref: Ref<OtpRef>) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const { email, onOtpValidated, isOpen } = props;

  const handleResponse = (message: string, isError: boolean) => {
    if (isError) {
      setErrorMessage(message);
      setIsErrorOpen(true);
    } else {
      setServerResponse(message);
      setIsServerOpen(true);
    }
  };

  const sendOtp = async (email: string) => {
    if (!email) {
      handleResponse("L'adresse email est requise pour envoyer l'OTP.", true);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/${import.meta.env.VITE_SEND_OTP_API}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (
          errorResponse.message ===
          "Un OTP validé a déjà été envoyé à cet email."
        ) {
          await setValue(
            import.meta.env.VITE_OTP_STATUS_KEY,
            import.meta.env.VITE_OTP_VALUE_KEY
          );
        }
        const errorMessage =
          errorResponse.message || "Échec de l'envoi de l'OTP.";
        handleResponse(errorMessage, true);
        return;
      }
      await setValue(
        import.meta.env.VITE_OTP_STATUS_KEY,
        import.meta.env.VITE_OTP_VALUE_KEY
      );
      handleResponse("OTP envoyé !", false);
      window.location.reload();
    } catch (err) {
      handleResponse("Une erreur inconnue est survenue", true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    sendOtpConfirm: async () => await sendOtp(email),
  }));

  const resendOtp = async () => {
    if (!email) {
      handleResponse("L'adresse email est requise pour renvoyer l'OTP.", true);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/${import.meta.env.VITE_RESEND_OTP_API}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();

        const errorMessage =
          errorResponse.message || "Échec du renvoi de l'OTP.";
        handleResponse(errorMessage, true);
        return;
      }
      handleResponse("OTP renvoyé !", false);
    } catch (err) {
      handleResponse("Une erreur inconnue est survenue", true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onValidateOtp = async () => {
    if (!email) {
      handleResponse(
        "L'adresse email est requise pour la validation de l'OTP.",
        true
      );
      return;
    }
    const otpString = otp.join("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/${import.meta.env.VITE_VALIDATE_OTP_API}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: otpString }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || "Échec de la validation de l'OTP.";
        handleResponse(errorMessage, true);
        return;
      }

      handleResponse("OTP validé !", false);
      if (onOtpValidated) {
        await setValue(
          import.meta.env.VITE_OTP_STATUS_KEY,
          import.meta.env.VITE_OTP_NOT_VALUE_KEY
        );
        onOtpValidated();
      }
    } catch (err) {
      handleResponse("Une erreur inconnue est survenue", true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    if (document.activeElement !== inputRefs.current[index]) {
      inputRefs.current[index]?.blur();
    }
  };

  const handleBlur = (index: number) => {
    if (index === otp.length - 1 && otp[index] === "") {
      inputRefs.current[index]?.focus();
    }
  };

  const handleInput = (
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.textContent || "";

    const isPreviousFieldsFilled = otp
      .slice(0, index)
      .every((digit) => digit !== "");

    if (isPreviousFieldsFilled && value.length <= 1 && /^[0-9]*$/.test(value)) {
      handleChange(index, {
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="absolute h-screen w-screen flex flex-col items-center justify-center bg-transparent backdrop-blur-sm backdrop-brightness-75">
          <div className="flex flex-col items-center justify-center gap-8 bg-background p-20 py-16 rounded-xl shadow-lg">
            <div className="flex flex-col items-start mb-8">
              <p className="text-2xl font-bold">Confirmation avec OTP</p>
              <p className="text-start">{props.description}</p>
            </div>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  onInput={(event) => handleInput(index, event)}
                  aria-label={`Digit ${index + 1}`}
                  className="w-12 h-12 text-center text-xl border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus={index === 0 && otp[0] === ""}
                />
              ))}
            </div>
            <AlertDialogDemo
              label="Confirmer"
              title="Etes vous sur de vouloir confirmer l'OTP"
              alertStatus={onValidateOtp}
            />{" "}
            <div className="flex items-center gap-2">
              <p
                className="text-muted-foreground cursor-pointer"
                onClick={async () => {
                  await setValue(
                    import.meta.env.VITE_OTP_STATUS_KEY,
                    import.meta.env.VITE_OTP_NOT_VALUE_KEY
                  );
                  window.location.reload();
                }}
              >
                Changer l'adresse mail?
              </p>
              <p
                onClick={resendOtp}
                className="cursor-pointer text-primary font-bold"
              >
                Renvoi de l'OTP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
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
    </>
  );
}

export default forwardRef<OtpRef, OptPropsType>(OtpConfirm);

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { ImageUp, Rocket } from "lucide-react";
import { useState } from "react";

import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import JustAlert from "@/components/JustAlert";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  category: z.string().nonempty({ message: "Category requis" }),
  content: z.string().nonempty({ message: "Contenu requise" }),
  images: z.array(z.instanceof(File)).optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreatePost() {
  const [images, setImages] = useState<File[]>([]);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      content: "",
      images: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageFiles = Array.from(e.target.files);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImageFiles];
        setValue("images", updatedImages);
        return updatedImages;
      });
    }
  };

  const handleDeleteImage = (image: File) => () => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((i) => i !== image);
      setValue("images", updatedImages);
      return updatedImages;
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("content", data.content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/${import.meta.env.VITE_NEW_EVENT_API}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      reset();
      setImages([]);
      setServerResponse(responseData.message || "Publié");
      setIsServerOpen(true);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl flex items-center min-h-[80vh] justify-center">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-200">
              <Rocket className="w-6 h-6 inline-block mr-2" />
              Partagez Votre Expérience Spatiale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content" className="text-slate-200">
                    Votre message
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Partagez vos pensées, expériences ou demandez du soutien..."
                    {...register("content")}
                    className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
                    rows={5}
                    required
                  />
                  {errors.content && (
                    <p className="text-red-500">{errors.content.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category" className="text-slate-200">
                    Catégorie
                  </Label>
                  <Select required>
                    <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue placeholder="Choisissez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motivation">Motivation</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="victoire">Victoire</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
                <div className="grid w-full mb-5 items-center gap-1.5">
                  <label
                    htmlFor="picture"
                    className="cursor-pointer flex items-center w-fit"
                  >
                    <ImageUp size={38} className="mr-2" />
                    <span className="lg:text-lg">Photos</span>
                  </label>
                  <Input
                    id="picture"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className="image-preview-container grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-y-5">
                    {images.map((image: File, index: number) => (
                      <div
                        key={index}
                        className="w-32 h-24 overflow-hidden relative"
                      >
                        <div
                          onClick={handleDeleteImage(image)}
                          className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <span className="text-white text-sm font-bold">
                            X
                          </span>
                        </div>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Prévisualisation ${index}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <AlertDialogDemo
                label="Publier"
                title="Avez vous fini de modifer ?"
                description="Des que vous publiez vos amis trouvent tout de suite votre publication."
                className="w-full"
                alertStatus={() => {
                  handleSubmit(onSubmit)();
                }}
              />
            </form>
          </CardContent>
        </Card>
      </div>
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
    </Layout>
  );
}

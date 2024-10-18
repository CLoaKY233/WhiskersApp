import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Wand2, Moon, Sun, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { invoke } from "@tauri-apps/api/core";

const Whiskers: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDiscard = () => {
    setImage(null);
    setPrediction(null);
  };

  const handlePredict = async () => {
    if (!image) return;

    setIsLoading(true);
    setPrediction(null);

    try {
      // Extract the base64 part of the image string
      const base64Image = image.split(",")[1];
      // Send the base64 image to the backend
      const result = await invoke<string>("predict_image", {
        image: base64Image,
      });
      setPrediction(result);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("An error occurred during prediction." + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-4 transition-colors duration-200 ease-in-out dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 transition-colors duration-200 ease-in-out">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Whiskers
              </h1>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Moon className="h-4 w-4 text-blue-500" />
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="mb-4">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Whiskers is an AI-powered app that predicts whether an
                    uploaded image is a cat or a dog. It's a binary classifier
                    trained to differentiate between feline and canine friends!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="space-y-4">
              {!image && (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
              )}

              {image && (
                <div className="relative">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleDiscard}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {image && (
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handlePredict}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Predicting...
                    </div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" /> Predict
                    </>
                  )}
                </Button>
              )}

              {prediction && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200 ease-in-out">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Prediction Result:
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {prediction}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Whiskers;

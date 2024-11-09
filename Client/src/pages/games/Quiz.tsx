"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/layouts/Layout";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";

interface QuizQuestion {
  type: "radio" | "checkbox" | "input" | "match";
  question: string;
  options?: string[] | { [key: string]: string };
  correctAnswer?: number | string;
  correctAnswers?: number[] | { [key: string]: string };
}

const quizData: QuizQuestion[] = [
  {
    type: "radio",
    question: "Quelle est une bonne façon de gérer le stress ?",
    options: [
      "L'ignorer et espérer qu'il disparaisse",
      "Pratiquer des exercices de respiration profonde",
      "Passer plus de temps sur les réseaux sociaux",
      "Rester éveillé tard pour finir toutes ses tâches",
    ],
    correctAnswer: 1,
  },
  {
    type: "checkbox",
    question: "Quels sont des signes de bonne santé mentale ?",
    options: [
      "Se sentir heureux tout le temps",
      "Ne jamais ressentir d'émotions négatives",
      "Être capable de faire face aux défis de la vie",
      "Éviter toutes les situations stressantes",
      "Maintenir de bonnes relations interpersonnelles",
    ],
    correctAnswers: [2, 4],
  },
  {
    type: "input",
    question:
      "Complétez cette phrase : La méditation peut aider à réduire ____.",
    correctAnswer: "le stress",
  },
  {
    type: "match",
    question: "Associez les émotions aux couleurs :",
    options: {
      Rouge: "Colère",
      Bleu: "Tristesse",
      Jaune: "Joie",
      Vert: "Sérénité",
    },
    correctAnswers: {
      Rouge: "Colère",
      Bleu: "Tristesse",
      Jaune: "Joie",
      Vert: "Sérénité",
    },
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | string | { [key: string]: string } | null
  >(null);
  const [selectedCheckboxAnswers, setSelectedCheckboxAnswers] = useState<
    number[]
  >([]);
  const [inputAnswer, setInputAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuizData] = useState(() => shuffleArray(quizData));

  const handleAnswer = useCallback(
    (answer: number | string | { [key: string]: string }) => {
      setSelectedAnswer(answer);
    },
    []
  );

  const handleCheckboxAnswer = useCallback((answerIndex: number) => {
    setSelectedCheckboxAnswers((prev) =>
      prev.includes(answerIndex)
        ? prev.filter((index) => index !== answerIndex)
        : [...prev, answerIndex]
    );
  }, []);

  const handleNextQuestion = useCallback(() => {
    const currentQuiz = shuffledQuizData[currentQuestion];

    if (
      currentQuiz.type === "radio" &&
      selectedAnswer === currentQuiz.correctAnswer
    ) {
      setScore((prev) => prev + 1);
    } else if (
      currentQuiz.type === "checkbox" &&
      JSON.stringify(selectedCheckboxAnswers.sort()) ===
        JSON.stringify((currentQuiz.correctAnswers as number[]).sort())
    ) {
      setScore((prev) => prev + 1);
    } else if (
      currentQuiz.type === "input" &&
      inputAnswer.trim().toLowerCase() ===
        (currentQuiz.correctAnswer as string).toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    } else if (
      currentQuiz.type === "match" &&
      JSON.stringify(selectedAnswer) ===
        JSON.stringify(currentQuiz.correctAnswers)
    ) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < shuffledQuizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setSelectedCheckboxAnswers([]);
      setInputAnswer("");
    } else {
      setQuizCompleted(true);
    }
  }, [
    currentQuestion,
    shuffledQuizData,
    selectedAnswer,
    selectedCheckboxAnswers,
    inputAnswer,
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl flex items-center min-h-[80vh] justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Quiz Santé Mentale
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <>
                <Progress
                  value={
                    ((currentQuestion + 1) / shuffledQuizData.length) * 100
                  }
                  className="mb-4"
                />
                <h2 className="text-xl font-semibold mb-4">
                  Question {currentQuestion + 1}
                </h2>
                <p className="mb-4">
                  {shuffledQuizData[currentQuestion].question}
                </p>
                {shuffledQuizData[currentQuestion].type === "radio" && (
                  <RadioGroup
                    value={selectedAnswer?.toString()}
                    onValueChange={(value) => handleAnswer(parseInt(value))}
                  >
                    {(
                      shuffledQuizData[currentQuestion].options as string[]
                    ).map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {shuffledQuizData[currentQuestion].type === "checkbox" && (
                  <div>
                    {(
                      shuffledQuizData[currentQuestion].options as string[]
                    ).map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={selectedCheckboxAnswers.includes(index)}
                          onCheckedChange={() => handleCheckboxAnswer(index)}
                        />
                        <Label htmlFor={`checkbox-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                )}
                {shuffledQuizData[currentQuestion].type === "input" && (
                  <div className="mb-4">
                    <Input
                      type="text"
                      value={inputAnswer}
                      onChange={(e) => setInputAnswer(e.target.value)}
                      placeholder="Votre réponse"
                    />
                  </div>
                )}
                {shuffledQuizData[currentQuestion].type === "match" && (
                  <div>
                    {Object.keys(
                      shuffledQuizData[currentQuestion].options as {
                        [key: string]: string;
                      }
                    ).map((key, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Label htmlFor={`match-${index}`}>{key}</Label>
                        <Select
                          value={
                            (selectedAnswer as { [key: string]: string })?.[
                              key
                            ] || ""
                          }
                          onValueChange={(value) =>
                            setSelectedAnswer({
                              ...(selectedAnswer as { [key: string]: string }),
                              [key]: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(
                              shuffledQuizData[currentQuestion].options as {
                                [key: string]: string;
                              }
                            ).map((value, i) => (
                              <SelectItem key={i} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Terminé !</h2>
                <p className="text-xl mb-4">
                  Votre score : {score} sur {shuffledQuizData.length}
                </p>
                <p>
                  Excellent travail ! Vous avez gagné 50 XP pour avoir terminé
                  ce quiz.
                </p>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-lg p-2">
                    <Star className="w-5 h-5 mr-2 inline" />
                    Badge Débloqué : Maître du Quiz
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!quizCompleted ? (
              <Button
                onClick={handleNextQuestion}
                disabled={
                  selectedAnswer === null &&
                  selectedCheckboxAnswers.length === 0 &&
                  inputAnswer === ""
                }
              >
                {currentQuestion < shuffledQuizData.length - 1
                  ? "Question Suivante"
                  : "Terminer le Quiz"}
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()}>
                Faire un Autre Quiz
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

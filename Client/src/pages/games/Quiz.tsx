import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import { useState } from "react";
import Layout from "../../layouts/Layout";

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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Quiz() {
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

  const shuffledQuizData = shuffleArray(quizData);

  const handleAnswer = (
    answer: number | string | { [key: string]: string }
  ) => {
    setSelectedAnswer(answer);
  };

  const handleCheckboxAnswer = (answerIndex: number) => {
    setSelectedCheckboxAnswers((prev: number[]) =>
      prev.includes(answerIndex)
        ? prev.filter((index) => index !== answerIndex)
        : [...prev, answerIndex]
    );
  };

  const handleNextQuestion = () => {
    const currentQuiz = shuffledQuizData[currentQuestion];

    if (
      currentQuiz.type === "radio" &&
      selectedAnswer === currentQuiz.correctAnswer
    ) {
      setScore(score + 1);
    } else if (
      currentQuiz.type === "checkbox" &&
      JSON.stringify(selectedCheckboxAnswers.sort()) ===
        JSON.stringify((currentQuiz.correctAnswers as number[]).sort())
    ) {
      setScore(score + 1);
    } else if (
      currentQuiz.type === "input" &&
      inputAnswer.trim().toLowerCase() ===
        (currentQuiz.correctAnswer as string).toLowerCase()
    ) {
      setScore(score + 1);
    } else if (
      currentQuiz.type === "match" &&
      JSON.stringify(selectedAnswer) ===
        JSON.stringify(currentQuiz.correctAnswers)
    ) {
      setScore(score + 1);
    }

    if (currentQuestion < shuffledQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setSelectedCheckboxAnswers([]);
      setInputAnswer("");
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl flex items-center min-h-[80vh] justify-center">
        <Card className="w-full bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-slate-200">
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
                <h2 className="text-xl font-semibold mb-4 text-slate-200">
                  Question {currentQuestion + 1}
                </h2>
                <p className="mb-4 text-slate-300">
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
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-slate-300"
                        >
                          {option}
                        </Label>
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
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          checked={selectedCheckboxAnswers.includes(index)}
                          onChange={() => handleCheckboxAnswer(index)}
                          className="form-checkbox"
                        />
                        <Label
                          htmlFor={`checkbox-${index}`}
                          className="text-slate-300"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {shuffledQuizData[currentQuestion].type === "input" && (
                  <div className="mb-4">
                    <input
                      type="text"
                      value={inputAnswer}
                      onChange={(e) => setInputAnswer(e.target.value)}
                      className="form-input w-full"
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
                        <Label
                          htmlFor={`match-${index}`}
                          className="text-slate-300"
                        >
                          {key}
                        </Label>
                        <select
                          id={`match-${index}`}
                          value={
                            (selectedAnswer as { [key: string]: string })?.[
                              key
                            ] || ""
                          }
                          onChange={(e) =>
                            setSelectedAnswer({
                              ...(selectedAnswer as { [key: string]: string }),
                              [key]: e.target.value,
                            })
                          }
                          className="form-select"
                        >
                          <option value="">Select</option>
                          {Object.values(
                            shuffledQuizData[currentQuestion].options as {
                              [key: string]: string;
                            }
                          ).map((value, i) => (
                            <option key={i} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-200">
                  Quiz Terminé !
                </h2>
                <p className="text-xl mb-4 text-slate-300">
                  Votre score : {score} sur {shuffledQuizData.length}
                </p>
                <p className="text-slate-300">
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

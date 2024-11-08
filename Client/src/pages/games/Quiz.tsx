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

const quizData = [
  {
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
    question: "Quel est un signe de bonne santé mentale ?",
    options: [
      "Se sentir heureux tout le temps",
      "Ne jamais ressentir d'émotions négatives",
      "Être capable de faire face aux défis de la vie",
      "Éviter toutes les situations stressantes",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Laquelle de ces options n'est PAS un mécanisme d'adaptation sain ?",
    options: [
      "Parler à un ami",
      "Faire de l'exercice régulièrement",
      "S'isoler des autres",
      "Pratiquer la pleine conscience",
    ],
    correctAnswer: 2,
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-slate-200">
              Quiz Santé Mentale
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <>
                <Progress
                  value={((currentQuestion + 1) / quizData.length) * 100}
                  className="mb-4"
                />
                <h2 className="text-xl font-semibold mb-4 text-slate-200">
                  Question {currentQuestion + 1}
                </h2>
                <p className="mb-4 text-slate-300">
                  {quizData[currentQuestion].question}
                </p>
                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={(value) => handleAnswer(parseInt(value))}
                >
                  {quizData[currentQuestion].options.map((option, index) => (
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
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-200">
                  Quiz Terminé !
                </h2>
                <p className="text-xl mb-4 text-slate-300">
                  Votre score : {score} sur {quizData.length}
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
                disabled={selectedAnswer === null}
              >
                {currentQuestion < quizData.length - 1
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

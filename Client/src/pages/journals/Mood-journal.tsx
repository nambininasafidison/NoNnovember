import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { Calendar as CalendarIcon, Frown, Meh, Smile } from "lucide-react";
import { useState } from "react";

const moodOptions = [
  { value: "happy", label: "Heureux", icon: Smile },
  { value: "neutral", label: "Neutre", icon: Meh },
  { value: "sad", label: "Triste", icon: Frown },
];

const moodEntries = [
  {
    date: "2024-11-08",
    mood: "happy",
    note: "J'ai réussi mon examen de pilotage spatial !",
  },
  {
    date: "2024-11-07",
    mood: "neutral",
    note: "Journée d'entraînement habituelle.",
  },
  {
    date: "2024-11-06",
    mood: "sad",
    note: "Le lancement de la mission a été reporté.",
  },
];

export default function MoodJournal() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvelle entrée :", {
      date: selectedDate,
      mood: selectedMood,
      note,
    });
    // Ici, vous ajouteriez la logique pour sauvegarder l'entrée
  };

  const MoodIcon = ({ mood }: { mood: string }) => {
    const option = moodOptions.find((o) => o.value === mood);
    return option ? <option.icon className="w-6 h-6" /> : null;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-200">
          Journal d&apos;Humeur
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Ajouter une Entrée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-slate-200">
                      Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-slate-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mood" className="text-slate-200">
                      Humeur
                    </Label>
                    <Select onValueChange={setSelectedMood}>
                      <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200">
                        <SelectValue placeholder="Choisissez votre humeur" />
                      </SelectTrigger>
                      <SelectContent>
                        {moodOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <option.icon className="w-4 h-4 mr-2" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="note" className="text-slate-200">
                      Note
                    </Label>
                    <Textarea
                      id="note"
                      placeholder="Comment s'est passée votre journée ?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-200"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Enregistrer l&apos;Entrée
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Historique des Humeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {moodEntries.map((entry, index) => (
                  <div key={index} className="mb-4 p-4 bg-slate-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="text-slate-200">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {entry.date}
                      </Badge>
                      <MoodIcon mood={entry.mood} />
                    </div>
                    <p className="text-slate-300">{entry.note}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

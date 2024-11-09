import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Layout from "@/layouts/Layout";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";

// Exemple d'événements
const events = [
  {
    id: 1,
    title: "Atelier de Méditation",
    date: new Date(2024, 10, 15),
    time: "18:00",
    location: "Salle Galaxie",
    type: "Bien-être",
  },
  {
    id: 2,
    title: "Groupe de Soutien: Anxiété",
    date: new Date(2024, 10, 17),
    time: "19:30",
    location: "Salle Comète",
    type: "Support",
  },
  {
    id: 3,
    title: "Webinaire: Gestion du Stress",
    date: new Date(2024, 10, 20),
    time: "20:00",
    location: "En ligne",
    type: "Éducation",
  },
];

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const eventsForSelectedDate = events.filter(
    (event) => event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Calendrier des Événements
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-slate-700"
              />
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Événements du {selectedDate?.toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map((event) => (
                    <Dialog key={event.id}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start mb-2 text-left"
                        >
                          <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-slate-400">
                              {event.time}
                            </p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 text-slate-200">
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p>
                            <Clock className="inline mr-2" />
                            {event.time}
                          </p>
                          <p>
                            <MapPin className="inline mr-2" />
                            {event.location}
                          </p>
                          <Badge>{event.type}</Badge>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <p className="text-slate-400">
                    Aucun événement prévu pour cette date.
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

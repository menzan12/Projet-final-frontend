import { useState } from "react";
import { toast } from "react-toastify";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  Loader2,
  Clock,
} from "lucide-react";

interface Slot {
  time: string;
  isBooked: boolean;
}

interface DayAvailability {
  day: string;
  date: string;
  slots: Slot[];
}

interface ServiceSchedulerProps {
  service: any;
  onBooking: (data: { day: string; date: string; time: string }) => void;
}

export default function ServiceScheduler({
  service,
  onBooking,
}: ServiceSchedulerProps) {
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    date: string;
    time: string;
  } | null>(null);

  const [isConfirming, setIsConfirming] = useState(false);

  // Mapping dynamique des jours et créneaux depuis les données du service
  const days: DayAvailability[] =
    service?.availability?.map((item: any) => ({
      day: item.day,
      date: item.date || "18", // Utilise la date fournie par l'API
      slots: item.slots.map((s: any) => ({
        time: typeof s === "object" ? s.start : s,
        // Un créneau est indisponible s'il est marqué isBooked ou déjà pris
        isBooked: s.isBooked === true,
      })),
    })) || [];

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      toast.info("Veuillez sélectionner une heure pour continuer");
      return;
    }

    setIsConfirming(true);

    // Toast de chargement (React Toastify)
    const toastId = toast.loading("Vérification des disponibilités...", {
      position: "top-right",
      theme: "colored",
    });

    // Simulation d'un délai réseau pour l'expérience utilisateur
    setTimeout(() => {
      toast.update(toastId, {
        render: "Créneau réservé ! Redirection...",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Appel de la fonction de redirection du parent
      onBooking(selectedSlot);
      setIsConfirming(false);
    }, 1200);
  };

  return (
    <section className="lg:w-2/3 space-y-6">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        {/* En-tête du calendrier */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Disponibilités
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Choisissez l'heure qui vous convient pour votre session.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-sm font-bold text-slate-600">
            <MapPin size={16} className="text-blue-600" />
            {service?.city || "Localisation"} (GMT)
          </div>
        </header>

        {/* Navigation et Date */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <button className="btn btn-circle btn-sm bg-white border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button className="btn btn-circle btn-sm bg-white border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar size={20} className="text-blue-600" />
            {days.length > 0
              ? `Semaine du ${days[0].date} au ${days[days.length - 1].date}`
              : "Calendrier"}
          </h3>
          <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline transition-all">
            Aujourd'hui
          </button>
        </div>

        {/* Grille des créneaux */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {days.map((day) => (
            <div key={day.day} className="text-center group">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-blue-600 transition-colors">
                {day.day.substring(0, 3)}
              </p>
              <p className="text-xl font-black text-slate-900 mb-6">
                {day.date}
              </p>

              <div className="space-y-3">
                {day.slots.map((slot, idx) => {
                  const isSelected =
                    selectedSlot?.date === day.date &&
                    selectedSlot?.time === slot.time;

                  return (
                    <button
                      key={idx}
                      disabled={slot.isBooked}
                      onClick={() =>
                        setSelectedSlot({
                          day: day.day,
                          date: day.date,
                          time: slot.time,
                        })
                      }
                      className={`
                        w-full py-3 rounded-xl font-bold text-sm transition-all border-2
                        ${
                          slot.isBooked
                            ? "bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                            : "bg-white border-slate-100 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Légende interactive */}
        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
            <div className="w-3 h-3 bg-white border-2 border-slate-200 rounded-sm"></div>{" "}
            Disponible
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
            <div className="w-3 h-3 bg-blue-600 rounded-sm shadow-sm shadow-blue-200"></div>{" "}
            Sélectionné
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
            <div className="w-3 h-3 bg-slate-100 border-slate-100 rounded-sm"></div>{" "}
            Occupé
          </div>
        </div>
      </div>

      {/* --- BARRE DE CONFIRMATION BASSE --- */}
      <div
        className={`
        rounded-[2.5rem] p-6 border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-6
        ${
          selectedSlot
            ? "bg-blue-600 border-blue-500 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.3)]"
            : "bg-slate-100 border-slate-200 opacity-60"
        }
      `}
      >
        <div className="flex items-center gap-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 ${
              selectedSlot
                ? "bg-white text-blue-600 rotate-12 scale-110"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            <Clock size={28} />
          </div>
          <div>
            <p
              className={`text-sm font-bold italic ${
                selectedSlot ? "text-blue-100" : "text-slate-400"
              }`}
            >
              {selectedSlot ? "Créneau choisi" : "Sélection requise"}
            </p>
            <p
              className={`text-xl font-black ${
                selectedSlot ? "text-white" : "text-slate-500"
              }`}
            >
              {selectedSlot
                ? `${selectedSlot.day} ${selectedSlot.date} à ${selectedSlot.time}`
                : "Sélectionnez un horaire"}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={handleConfirmBooking}
            disabled={!selectedSlot || isConfirming}
            className={`w-full md:w-64 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
              isConfirming
                ? "bg-green-500 text-white cursor-wait"
                : selectedSlot
                ? "bg-white text-blue-600 hover:bg-slate-50 active:scale-95 shadow-xl shadow-blue-900/10"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isConfirming ? (
              <>
                Validation... <Loader2 size={22} className="animate-spin" />
              </>
            ) : (
              <>
                Réserver ce créneau{" "}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

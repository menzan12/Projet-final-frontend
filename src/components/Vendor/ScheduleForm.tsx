import React from "react";
import { Clock, Plus, Trash2, Info, AlertCircle } from "lucide-react";

// Types pour la cohérence des données
interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  day: string;
  active: boolean;
  slots: TimeSlot[];
}

interface ServiceScheduleFormProps {
  schedule: DaySchedule[];
  setSchedule: React.Dispatch<React.SetStateAction<DaySchedule[]>>;
}

const ScheduleForm: React.FC<ServiceScheduleFormProps> = ({
  schedule,
  setSchedule,
}) => {
  // Activer/Désactiver un jour
  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].active = !newSchedule[index].active;

    // Si on active un jour vide, on ajoute un créneau par défaut
    if (newSchedule[index].active && newSchedule[index].slots.length === 0) {
      newSchedule[index].slots = [{ start: "09:00", end: "17:00" }];
    }
    setSchedule(newSchedule);
  };

  // AJOUT/MODIFICATION UNIQUE de updateTime (Fusionnée et corrigée)
  const updateTime = (
    dayIndex: number,
    slotIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][field] = value;
    setSchedule(newSchedule);
  };

  // Ajouter un créneau horaire (Split)
  const addSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push({ start: "09:00", end: "17:00" });
    setSchedule(newSchedule);
  };

  // Supprimer un créneau
  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);

    // Si plus de créneaux, on désactive automatiquement le jour
    if (newSchedule[dayIndex].slots.length === 0) {
      newSchedule[dayIndex].active = false;
    }
    setSchedule(newSchedule);
  };

  return (
    <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50 overflow-hidden">
      {/* Header Planning */}
      <div className="p-10 bg-slate-900 text-white flex justify-between items-end">
        <div>
          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
            Disponibilités
          </span>
          <h3 className="text-2xl font-[1000] uppercase tracking-tighter italic">
            Weekly <span className="text-blue-400">Schedule</span>
          </h3>
        </div>
      </div>

      {/* Liste des jours */}
      <div className="p-8 space-y-3">
        {schedule.map((day, idx) => (
          <div
            key={day.day}
            className={`group flex flex-col md:flex-row md:items-center p-6 rounded-[2.2rem] border-2 transition-all duration-300 ${
              day.active
                ? "border-blue-50 bg-blue-50/20"
                : "border-transparent bg-slate-50/50 opacity-40"
            }`}
          >
            {/* Switch Toggle & Nom du jour */}
            <div className="flex items-center gap-6 w-44 mb-4 md:mb-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={day.active}
                  onChange={() => toggleDay(idx)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
              <span
                className={`font-black uppercase text-xs tracking-tight ${
                  day.active ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {day.day}
              </span>
            </div>

            {/* Zone des créneaux */}
            <div className="flex-1 flex flex-wrap gap-4">
              {day.active ? (
                day.slots.map((slot, sIdx) => {
                  const isInvalid =
                    slot.start && slot.end && slot.start >= slot.end;

                  return (
                    <div
                      key={`${day.day}-${sIdx}`}
                      className="flex flex-col gap-2 animate-in zoom-in-95 duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center bg-white border ${
                            isInvalid
                              ? "border-red-300 ring-1 ring-red-100"
                              : "border-slate-100"
                          } rounded-2xl px-5 py-3 gap-4 shadow-sm group-hover:shadow-md transition-all`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock
                              size={12}
                              className={
                                isInvalid ? "text-red-500" : "text-blue-500"
                              }
                            />
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) =>
                                updateTime(idx, sIdx, "start", e.target.value)
                              }
                              className="bg-transparent border-none text-[12px] font-black p-0 w-14 outline-none text-slate-700"
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-300 uppercase italic">
                            to
                          </span>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) =>
                                updateTime(idx, sIdx, "end", e.target.value)
                              }
                              className="bg-transparent border-none text-[12px] font-black p-0 w-14 outline-none text-slate-700"
                            />
                          </div>
                        </div>

                        {/* Boutons Actions */}
                        {sIdx === 0 ? (
                          <button
                            type="button"
                            onClick={() => addSlot(idx)}
                            className="w-10 h-10 flex items-center justify-center text-blue-500 bg-blue-50 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                          >
                            <Plus size={18} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeSlot(idx, sIdx)}
                            className="w-10 h-10 flex items-center justify-center text-red-400 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      {/* Message d'erreur visuel */}
                      {isInvalid && (
                        <div className="flex items-center gap-1 px-2 text-[9px] font-black text-red-500 uppercase italic animate-pulse">
                          <AlertCircle size={10} /> Heure incohérente
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic ml-4">
                  Fermé
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-8 bg-slate-50 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
          <Info size={18} />
        </div>
        <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
          <span className="text-slate-900 font-black">Note :</span> Vos clients
          ne pourront réserver que durant ces tranches horaires.
        </p>
      </div>
    </div>
  );
};

export default ScheduleForm;

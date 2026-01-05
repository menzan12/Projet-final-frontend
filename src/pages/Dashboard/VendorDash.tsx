import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

import VendorSide from "../../components/Sidebar/VendorSide";
import VendorHeader from "../../components/Vendor/VendorHeader";
import type { Booking, Service } from "../../types";
import TableRow from "../../components/Vendor/TableRow";

const VendorDash = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // ---------- FETCH BOOKINGS ----------
  useEffect(() => {
    const fetchVendorBookings = async () => {
      try {
        const res = await api.get<Booking[]>("/bookings/vendor", {
          withCredentials: true, // HttpOnly cookie
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Erreur chargement réservations vendor", error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchVendorBookings();
  }, []);

  // ---------- FETCH SERVICES ----------
  useEffect(() => {
    const fetchVendorServices = async () => {
      try {
        const res = await api.get<Service[]>("/services/vendor", {
          withCredentials: true, // HttpOnly cookie
        });

        // ✅ garder uniquement les services approuvés
        const approvedServices = res.data.filter(
          (service) => service.status === "approved"
        );

        setServices(approvedServices);
      } catch (error) {
        console.error("Erreur chargement services", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchVendorServices();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* SIDEBAR */}
      <VendorSide />

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <VendorHeader />
        </header>

        {/* RESERVATIONS */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Prochaines Réservations</h2>

          {loadingBookings ? (
            <p className="text-sm text-slate-400">Chargement...</p>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[11px] uppercase tracking-wider border-b">
                    <th className="pb-3 font-bold">Client</th>
                    <th className="pb-3 font-bold">Service</th>
                    <th className="pb-3 font-bold">Date</th>
                    <th className="pb-3 font-bold">Statut</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {bookings.map((booking) => (
                    <TableRow key={booking._id} booking={booking} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Aucune réservation à venir</p>
          )}
        </section>

        {/* SERVICES DYNAMIQUES */}
        <section>
          <h2 className="text-xl font-bold mb-6">Mes Services Actifs</h2>

          {loadingServices ? (
            <p className="text-sm text-slate-400">Chargement des services...</p>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  price={`${service.price} €`}
                  rating={service.rating ?? 0}
                  image={
                    service.images?.[0] ??
                    "https://placehold.co/600x400?text=Service"
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              Aucun service approuvé pour le moment
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

/* ---------- SERVICE CARD ---------- */
const ServiceCard = ({
  title,
  price,
  rating,
  image,
}: {
  title: string;
  price: string;
  rating: number;
  image: string;
}) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
    <div className="relative h-40 overflow-hidden">
      <img
        src={image}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        alt={title}
      />
      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
        <Star size={10} className="fill-yellow-400 text-yellow-400" />
        {rating}
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-sm mb-3 h-10 line-clamp-2">{title}</h4>
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          À partir de
        </span>
        <span className="text-md font-black">{price}</span>
      </div>
    </div>
  </div>
);

export default VendorDash;

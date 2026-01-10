import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbsProps } from "../../types";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ service }) => {
  const location = useLocation();
  const params = useParams<{ id: string }>(); // récupère l'ID du service depuis l'URL
  const path = location.pathname;

  const steps: { label: string; to: string }[] = [
    { label: "Accueil", to: "/" },
  ];

  // Ajouter "Services"
  if (path.startsWith("/services")) {
    steps.push({
      label: "Services",
      to: "/services",
    });
  }

  // Ajouter service spécifique si on est sur /services/:id ou /services/:id/book
  if (params.id) {
    steps.push({
      label: service?.category ? `Services de ${service.category}` : "Service",
      to: `/services/${params.id}`,
    });

    // Ajouter "Réserver" si on est sur /book
    if (path.endsWith("/book")) {
      steps.push({
        label: "Réserver",
        to: `/services/${params.id}/book`,
      });
    }
  }

  return (
    <nav
      className="text-sm flex items-center gap-2 text-gray-400 mb-6"
      aria-label="Fil d’Ariane"
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Link
            to={step.to}
            className="hover:text-orange-400 text-blue-500 font-bold transition-colors"
          >
            {step.label}
          </Link>
          {index < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

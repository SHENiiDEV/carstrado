import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      catalog: 'Vehicles',
      about: 'About Us',
      myDeals: 'My Deals & Orders',
      dealerPortal: 'Dealer Portal',
      adminDesk: 'Admin Desk',
      login: 'Sign In',
      register: 'Register',
    },
    hero: {
      title: 'Premium EU Automotive Sourcing & Escrow',
      subtitle: 'Verified pre-owned vehicles sourced directly from European boutique dealerships. Swiss VQF compliance & transparent pricing.',
      searchBtn: 'Search Catalog',
    },
    catalog: {
      title: 'European Sourced Vehicles Catalog',
      searchPlaceholder: 'Search make, model, trim, or VIN...',
      make: 'Automotive Brand',
      model: 'Specific Model',
      bodyStyle: 'Body Style',
      country: 'Country Location',
      priceBudget: 'Max Budget Price',
      engine: 'Engine / Drivetrain',
      sort: 'Sort Order',
      reset: 'Reset Filters',
      compare: 'Compare Vehicles',
      addToCompare: '+ Compare',
      inCompare: 'In Compare',
      noCars: 'No vehicles match your search criteria.',
    },
    compareModal: {
      title: 'Side-by-Side Vehicle Comparison',
      subtitle: 'Compare specifications, pricing breakdown, and warranty coverage across up to 3 selected vehicles.',
      clearAll: 'Clear All',
      sourcingEstimate: 'Estimated Sourcing Cost',
      monthlyLease: 'Monthly Lease Est.',
    },
    footer: {
      rights: 'All rights reserved. Swiss VQF Regulated Brokerage.',
    },
  },
  de: {
    nav: {
      catalog: 'Fahrzeuge',
      about: 'Über Uns',
      myDeals: 'Meine Käufe & Aufträge',
      dealerPortal: 'Händler-Portal',
      adminDesk: 'Admin-Desk',
      login: 'Anmelden',
      register: 'Registrieren',
    },
    hero: {
      title: 'Premium EU Fahrzeugbeschaffung & Treuhand',
      subtitle: 'Geprüfte Gebrauchtwagen direkt von europäischen Vertragshändlern. Schweizer VQF-Compliance & transparente Preise.',
      searchBtn: 'Katalog durchsuchen',
    },
    catalog: {
      title: 'Katalog Europäischer Importfahrzeuge',
      searchPlaceholder: 'Marke, Modell, Ausstattung oder Fahrgestellnummer suchen...',
      make: 'Automarke',
      model: 'Spezifisches Modell',
      bodyStyle: 'Karosserieform',
      country: 'Standortland',
      priceBudget: 'Maximales Budget',
      engine: 'Antriebsart',
      sort: 'Sortierung',
      reset: 'Filter zurücksetzen',
      compare: 'Fahrzeuge vergleichen',
      addToCompare: '+ Vergleichen',
      inCompare: 'Im Vergleich',
      noCars: 'Keine Fahrzeuge entsprechen Ihren Suchkriterien.',
    },
    compareModal: {
      title: 'Direkter Fahrzeugvergleich',
      subtitle: 'Vergleichen Sie Spezifikationen, Preisaufschlüsselung und Garantieoptionen von bis zu 3 ausgewählten Fahrzeugen.',
      clearAll: 'Alle löschen',
      sourcingEstimate: 'Geschätzte Gesamtkosten',
      monthlyLease: 'Monatliche Leasingrate',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten. Schweizerisch VQF-regulierter Vermittler.',
    },
  },
  fr: {
    nav: {
      catalog: 'Véhicules',
      about: 'À Propos',
      myDeals: 'Mes Commandes',
      dealerPortal: 'Espace Concessionnaire',
      adminDesk: 'Administration',
      login: 'Connexion',
      register: 'S’inscrire',
    },
    hero: {
      title: 'Sourcing Automobile EU & Compte Sequestre',
      subtitle: 'Véhicules d’occasion certifiés en direct des concessionnaires européens. Conformité VQF suisse et prix transparents.',
      searchBtn: 'Rechercher au catalogue',
    },
    catalog: {
      title: 'Catalogue de Véhicules Importés d’Europe',
      searchPlaceholder: 'Rechercher marque, modèle, finitions ou VIN...',
      make: 'Marque Automobile',
      model: 'Modèle Spécifique',
      bodyStyle: 'Type de Carrosserie',
      country: 'Pays de Provenance',
      priceBudget: 'Budget Maximum',
      engine: 'Motorisation',
      sort: 'Trier Par',
      reset: 'Réinitialiser les filtres',
      compare: 'Comparer les Véhicules',
      addToCompare: '+ Comparer',
      inCompare: 'En Comparaison',
      noCars: 'Aucun véhicule ne correspond à vos critères.',
    },
    compareModal: {
      title: 'Comparatif Véhicules Côte à Côte',
      subtitle: 'Comparez les caractéristiques, la décomposition des coûts et la garantie sur jusqu’à 3 véhicules sélectionnés.',
      clearAll: 'Tout effacer',
      sourcingEstimate: 'Coût Estimé de Sourcing',
      monthlyLease: 'Loyer Mensuel Estimé',
    },
    footer: {
      rights: 'Tous droits réservés. Courtage régulé par la VQF Suisse.',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('carstrado_lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('carstrado_lang', newLang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[lang] || translations.en;
    for (const key of keys) {
      if (!current[key]) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      lang: 'en',
      changeLanguage: () => {},
      t: (path) => path,
    };
  }
  return context;
}

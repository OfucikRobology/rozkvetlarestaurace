import type { CelebrationPackage } from "@/types";

export const celebrationTypes = [
  {
    id: "wedding",
    icon: "💒",
    titleKey: "celebrations.types.wedding",
    descriptionKey: "celebrations.typesDesc.wedding",
  },
  {
    id: "birthday",
    icon: "🎂",
    titleKey: "celebrations.types.birthday",
    descriptionKey: "celebrations.typesDesc.birthday",
  },
  {
    id: "corporate",
    icon: "🏢",
    titleKey: "celebrations.types.corporate",
    descriptionKey: "celebrations.typesDesc.corporate",
  },
  {
    id: "christening",
    icon: "👶",
    titleKey: "celebrations.types.christening",
    descriptionKey: "celebrations.typesDesc.christening",
  },
] as const;

export const celebrationThemes = [
  {
    id: "fairytale",
    titleKey: "celebrations.themes.fairytale",
    descKey: "celebrations.themesDesc.fairytale",
    color: "bg-pink-100",
  },
  {
    id: "nature",
    titleKey: "celebrations.themes.nature",
    descKey: "celebrations.themesDesc.nature",
    color: "bg-green-100",
  },
  {
    id: "vintage",
    titleKey: "celebrations.themes.vintage",
    descKey: "celebrations.themesDesc.vintage",
    color: "bg-amber-100",
  },
  {
    id: "ukrainian",
    titleKey: "celebrations.themes.ukrainian",
    descKey: "celebrations.themesDesc.ukrainian",
    color: "bg-blue-100",
  },
] as const;

export const celebrationPackages: CelebrationPackage[] = [
  {
    id: "basic",
    title: {
      cs: "Základní balíček",
      uk: "Базовий пакет",
    },
    description: {
      cs: "Pronájem prostoru, základní výzdoba, menu dle výběru",
      uk: "Оренда приміщення, базове оздоблення, меню на вибір",
    },
    features: {
      cs: [
        "Pronájem sálu až pro 80 osob",
        "Základní květinová výzdoba",
        "Menu dle výběru (3 chody)",
        "Nápojový balíček",
      ],
      uk: [
        "Оренда залу до 80 осіб",
        "Базове квіткове оздоблення",
        "Меню на вибір (3 страви)",
        "Пакет напоїв",
      ],
    },
  },
  {
    id: "premium",
    title: {
      cs: "Premium balíček",
      uk: "Преміум пакет",
    },
    description: {
      cs: "Vše z Základního + tematická výzdoba, hlídání dětí, dort",
      uk: "Все з Базового + тематичне оздоблення, нагляд за дітьми, торт",
    },
    features: {
      cs: [
        "Vše ze Základního balíčku",
        "Tematická výzdoba dle přání",
        "Hlídání dětí s animačním programem",
        "Dort na zakázku od naší cukrářky",
        "Fotobudka",
        "Kytice z květinového obchodu vedle restaurace",
      ],
      uk: [
        "Все з Базового пакету",
        "Тематичне оздоблення за бажанням",
        "Нагляд за дітьми з анімаційною програмою",
        "Торт на замовлення від нашої кондитерки",
        "Фотобудка",
        "Букет з квіткового магазину поруч",
      ],
    },
  },
  {
    id: "turnkey",
    title: {
      cs: "Na klíč",
      uk: "Під ключ",
    },
    description: {
      cs: "Kompletní organizace vaší akce od A do Z",
      uk: "Повна організація вашого заходу від А до Я",
    },
    features: {
      cs: [
        "Vše z Premium balíčku",
        "Osobní koordinátor akce",
        "Profesionální fotograf",
        "Živá hudba nebo DJ",
        "Doprava hostů",
        "Individuální catering na míru",
        "Celý prostor restaurace jen pro vás",
      ],
      uk: [
        "Все з Преміум пакету",
        "Особистий координатор заходу",
        "Професійний фотограф",
        "Жива музика або DJ",
        "Трансфер гостей",
        "Індивідуальний кейтеринг",
        "Весь простір ресторану лише для вас",
      ],
    },
  },
];

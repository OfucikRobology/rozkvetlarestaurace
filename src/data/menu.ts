import type { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  // === PREDKRMY ===
  {
    id: "a1",
    name: { cs: "Domácí tatarský biftek", uk: "Домашній тартар з яловичини" },
    description: {
      cs: "200g hovězího masa, topinky, česnek",
      uk: "200г яловичини, тости, часник",
    },
    price: 245,
    category: "appetizers",
    allergens: [1, 3, 10],
  },
  {
    id: "a2",
    name: { cs: "Varenyky s brynzou", uk: "Вареники з бринзою" },
    description: {
      cs: "Tradiční ukrajinské plněné taštičky s brynzou a smetanou",
      uk: "Традиційні вареники з бринзою та сметаною",
    },
    price: 165,
    category: "appetizers",
    allergens: [1, 3, 7],
  },
  {
    id: "a3",
    name: { cs: "Nakládaný hermelín", uk: "Маринований гермелін" },
    description: {
      cs: "S cibulí, feferonkou a pečivem",
      uk: "З цибулею, перцем та хлібом",
    },
    price: 135,
    category: "appetizers",
    allergens: [1, 7],
  },

  // === POLEVKY ===
  {
    id: "s1",
    name: { cs: "Boršč", uk: "Борщ" },
    description: {
      cs: "Tradiční ukrajinský boršč s hovězím masem a zakysanou smetanou",
      uk: "Традиційний український борщ з яловичиною та сметаною",
    },
    price: 95,
    category: "soups",
    allergens: [1, 7, 9],
  },
  {
    id: "s2",
    name: { cs: "Česnečka", uk: "Часникова юшка" },
    description: {
      cs: "Česká česnečka se sýrem a opečeným chlebem",
      uk: "Чеська часникова юшка з сиром та хлібом",
    },
    price: 85,
    category: "soups",
    allergens: [1, 3, 7],
  },
  {
    id: "s3",
    name: { cs: "Kulajda", uk: "Кулайда" },
    description: {
      cs: "Houbová polévka s koprem, bramborem a zastřeným vejcem",
      uk: "Грибна юшка з кропом, картоплею та яйцем пашот",
    },
    price: 89,
    category: "soups",
    allergens: [1, 3, 7, 9],
  },

  // === HLAVNI JIDLA ===
  {
    id: "m1",
    name: { cs: "Svíčková na smetaně", uk: "Свічкова на сметані" },
    description: {
      cs: "Hovězí svíčková s houskovou knedlíkem a brusinkami",
      uk: "Яловичина у вершковому соусі з кнедликами та журавлиною",
    },
    price: 235,
    category: "mainCourses",
    allergens: [1, 3, 7, 9],
  },
  {
    id: "m2",
    name: { cs: "Kyjevský kotlet", uk: "Котлета по-київськи" },
    description: {
      cs: "Klasický kuřecí kotlet plněný bylinkovým máslem, s bramborovou kaší",
      uk: "Класична куряча котлета з вершковим маслом та картопляним пюре",
    },
    price: 225,
    category: "mainCourses",
    allergens: [1, 3, 7],
  },
  {
    id: "m3",
    name: { cs: "Vepřové koleno", uk: "Свиняче коліно" },
    description: {
      cs: "Pečené vepřové koleno s hořčicí, křenem a chlebem",
      uk: "Запечене свиняче коліно з гірчицею, хріном та хлібом",
    },
    price: 285,
    category: "mainCourses",
    allergens: [1, 10],
  },
  {
    id: "m4",
    name: { cs: "Holoubce (holubtsi)", uk: "Голубці" },
    description: {
      cs: "Plněné zelné závitky s mletým masem a rajčatovou omáčkou",
      uk: "Голубці з м'ясним фаршем та томатним соусом",
    },
    price: 195,
    category: "mainCourses",
    allergens: [1, 3],
  },
  {
    id: "m5",
    name: { cs: "Smažený sýr s hranolkami", uk: "Смажений сир з картоплею фрі" },
    description: {
      cs: "Klasický český smažený eidam s tatarskou omáčkou",
      uk: "Класичний чеський смажений сир з соусом тартар",
    },
    price: 175,
    category: "mainCourses",
    allergens: [1, 3, 7],
  },
  {
    id: "m6",
    name: {
      cs: "Deruny (bramboráky)",
      uk: "Деруни",
    },
    description: {
      cs: "Ukrajinské bramborové placky se zakysanou smetanou",
      uk: "Картопляні деруни зі сметаною",
    },
    price: 155,
    category: "mainCourses",
    allergens: [1, 3, 7],
  },

  // === DEZERTY ===
  {
    id: "d1",
    name: { cs: "Medovnik", uk: "Медівник" },
    description: {
      cs: "Tradiční ukrajinský medový dort",
      uk: "Традиційний український медовий торт",
    },
    price: 115,
    category: "desserts",
    allergens: [1, 3, 7],
  },
  {
    id: "d2",
    name: { cs: "Palačinky s tvarohem", uk: "Млинці з сиром" },
    description: {
      cs: "Domácí palačinky plněné tvarohem s jahodovou omáčkou",
      uk: "Домашні млинці з сиром та полуничним соусом",
    },
    price: 125,
    category: "desserts",
    allergens: [1, 3, 7],
  },
  {
    id: "d3",
    name: { cs: "Trdelník", uk: "Трдельник" },
    description: {
      cs: "Čerstvě pečený trdelník se skořicí a cukrem",
      uk: "Свіжоспечений трдельник з корицею та цукром",
    },
    price: 95,
    category: "desserts",
    allergens: [1, 3, 7],
  },

  // === NAPOJE ===
  {
    id: "n1",
    name: { cs: "Domácí limonáda", uk: "Домашній лимонад" },
    description: {
      cs: "Levandulová / Bezová / Citronová (0,5l)",
      uk: "Лавандовий / Бузиновий / Лимонний (0,5л)",
    },
    price: 75,
    category: "drinks",
  },
  {
    id: "n2",
    name: { cs: "Uzvar", uk: "Узвар" },
    description: {
      cs: "Tradiční ukrajinský kompot ze sušeného ovoce",
      uk: "Традиційний український узвар із сухофруктів",
    },
    price: 65,
    category: "drinks",
  },
  {
    id: "n3",
    name: { cs: "Plzeňský Prazdroj 12°", uk: "Plzeňský Prazdroj 12°" },
    description: {
      cs: "Čepované (0,5l)",
      uk: "Розливне (0,5л)",
    },
    price: 59,
    category: "drinks",
  },
  {
    id: "n4",
    name: { cs: "Moravské víno", uk: "Моравське вино" },
    description: {
      cs: "Bílé / Červené (0,2l) — dle aktuální nabídky",
      uk: "Біле / Червоне (0,2л) — за поточною пропозицією",
    },
    price: 85,
    category: "drinks",
  },
];

// Vyber pokrmu pro homepage (4 hlavni jidla)
export const featuredItems = menuItems.filter((item) =>
  ["m1", "m2", "m4", "d1"].includes(item.id)
);

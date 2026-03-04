"use client";

import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  const { locale } = useLocale();

  return (
    <main className="min-h-screen bg-white">
      <AnimatedSection>
        <section className="container mx-auto px-4 py-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {locale === "cs"
                ? "Ochrana osobních údajů"
                : "Захист персональних даних"}
            </h1>
          </div>

          <div className="prose prose-green max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
            {locale === "cs" ? (
              <>
                <p>
                  <strong>Správce osobních údajů:</strong> Rozkvetlá restaurace,
                  Topolová 2916/14, Praha 10 – Záběhlice, 106 00
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  1. Jaké údaje zpracováváme
                </h2>
                <p>
                  Při využití našich služeb (rezervace, objednávky s sebou,
                  poptávky oslav, kontaktní formulář) zpracováváme: jméno,
                  e-mail, telefonní číslo a obsah vaší zprávy.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  2. Účel zpracování
                </h2>
                <p>
                  Vaše údaje zpracováváme za účelem vyřízení vaší rezervace,
                  objednávky, poptávky nebo dotazu. Údaje nepoužíváme k
                  marketingovým účelům bez vašeho souhlasu.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  3. Doba uchování
                </h2>
                <p>
                  Osobní údaje uchováváme po dobu nezbytnou k vyřízení vašeho
                  požadavku, maximálně 12 měsíců od posledního kontaktu.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  4. Vaše práva
                </h2>
                <p>
                  Máte právo na přístup ke svým údajům, jejich opravu, výmaz,
                  omezení zpracování a přenositelnost. Pro uplatnění těchto práv
                  nás kontaktujte na e-mailu verunkatarhaj@seznam.cz.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  5. Cookies
                </h2>
                <p>
                  Tyto webové stránky používají pouze technicky nezbytné cookies
                  pro správné fungování webu a uchování vašich preferencí
                  (jazyk). Nepoužíváme analytické ani reklamní cookies.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  6. Kontakt
                </h2>
                <p>
                  V případě dotazů ohledně zpracování osobních údajů nás
                  kontaktujte na: verunkatarhaj@seznam.cz nebo telefonicky
                  731 163 777.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Контролер персональних даних:</strong> Rozkvetlá
                  restaurace, Topolová 2916/14, Praha 10 – Záběhlice, 106 00
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  1. Які дані ми обробляємо
                </h2>
                <p>
                  При використанні наших послуг (бронювання, замовлення на
                  винос, запити на свята, контактна форма) ми обробляємо: ім&apos;я,
                  електронну пошту, номер телефону та зміст вашого повідомлення.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  2. Мета обробки
                </h2>
                <p>
                  Ваші дані обробляються для обробки вашого бронювання,
                  замовлення, запиту або питання. Ми не використовуємо дані для
                  маркетингових цілей без вашої згоди.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  3. Термін зберігання
                </h2>
                <p>
                  Персональні дані зберігаються протягом часу, необхідного для
                  обробки вашого запиту, максимум 12 місяців з моменту
                  останнього контакту.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  4. Ваші права
                </h2>
                <p>
                  Ви маєте право на доступ до своїх даних, їх виправлення,
                  видалення, обмеження обробки та переносимість. Для реалізації
                  цих прав зв&apos;яжіться з нами за електронною поштою
                  verunkatarhaj@seznam.cz.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  5. Cookies
                </h2>
                <p>
                  Цей веб-сайт використовує лише технічно необхідні файли cookie
                  для правильного функціонування сайту та збереження ваших
                  налаштувань (мова). Ми не використовуємо аналітичні чи рекламні
                  файли cookie.
                </p>

                <h2 className="text-lg font-semibold text-foreground mt-8">
                  6. Контакт
                </h2>
                <p>
                  У разі запитань щодо обробки персональних даних зв&apos;яжіться з
                  нами: verunkatarhaj@seznam.cz або за телефоном 731 163 777.
                </p>
              </>
            )}
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}


import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { About } from './components/About.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Pricing } from './components/Pricing.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { Cursor } from './components/Cursor.tsx';
import { Process } from './components/Process.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Language } from './types.ts';

function App() {
  const [lang, setLang] = useState<Language>('es');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 overflow-x-hidden selection:bg-bronze-500 selection:text-white">
      <Cursor />
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Portfolio lang={lang} />
        <Services lang={lang} />
        <Process lang={lang} />
        <About lang={lang} />
        <Pricing lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default App;

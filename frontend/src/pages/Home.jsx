import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <div className="rounded border border-stone-800 bg-stone-950/80 p-8 shadow-pixel">
        <p className="text-xs text-moss-500">CraftForge AI</p>
        <h1 className="mt-4 text-2xl leading-relaxed">
          Генеруйте Minecraft Forge 1.20.1 моди з одного промпту.
        </h1>
        <p className="mt-6 text-xs text-stone-300 leading-relaxed">
          Сервіс автоматично створює Java код, збирає структуру Forge моду, генерує
          текстури 16x16 та компілює готовий .jar файл для завантаження.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/generator"
            className="rounded bg-moss-500 px-6 py-3 text-xs uppercase tracking-widest text-black shadow-pixel"
          >
            Generate Mod
          </Link>
          <Link
            to="/docs"
            className="rounded border border-stone-600 px-6 py-3 text-xs uppercase tracking-widest text-stone-200"
          >
            Docs
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'AI генерація',
            description: 'Перетворює промпт у JSON опис моду та Java реалізацію.',
          },
          {
            title: 'Forge проект',
            description: 'Автоматично збирає структуру Forge 1.20.1 та викликає Gradle build.',
          },
          {
            title: 'Готовий .jar',
            description: 'Ви отримуєте лише готовий mod.jar без вихідних файлів.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs shadow-pixel"
          >
            <h3 className="text-moss-500">{card.title}</h3>
            <p className="mt-4 text-stone-300 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;

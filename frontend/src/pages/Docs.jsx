const Docs = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <div className="rounded border border-stone-800 bg-stone-950/80 p-8 shadow-pixel">
        <h2 className="text-xl text-moss-500">Docs</h2>
        <p className="mt-4 text-xs text-stone-300 leading-relaxed">
          CraftForge AI підтримує генерацію предметів, мечів, інструментів, броні, блоків,
          їжі, ефектів та базових сутностей. Використовуйте описові промпти для кращих
          результатів.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs shadow-pixel">
          <h3 className="text-moss-500">Forge 1.20.1</h3>
          <p className="mt-3 text-stone-300 leading-relaxed">
            Підтримується Forge 1.20.1 (forge-1.20.1-47.2.0). Збірка виконується через Gradle
            build з мінімальним шаблоном Forge MDK.
          </p>
        </div>
        <div className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs shadow-pixel">
          <h3 className="text-moss-500">Texture Pipeline</h3>
          <p className="mt-3 text-stone-300 leading-relaxed">
            Текстури створюються 16x16 PNG у піксельному стилі Minecraft. Розмір та формат
            стабільні для імпорту у ресурс-паки.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Docs;

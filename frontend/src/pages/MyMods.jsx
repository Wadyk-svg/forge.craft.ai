const MyMods = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <div className="rounded border border-stone-800 bg-stone-950/80 p-8 shadow-pixel">
        <h2 className="text-xl text-moss-500">My Mods</h2>
        <p className="mt-4 text-xs text-stone-300 leading-relaxed">
          Тут буде список ваших останніх генерацій. Зараз CraftForge AI показує результати
          одразу після створення у Generator.
        </p>
      </div>
      <div className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs text-stone-400 shadow-pixel">
        Збереження історії буде додано найближчим часом.
      </div>
    </section>
  );
};

export default MyMods;

import { useState } from 'react';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Generator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Generation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="rounded border border-stone-800 bg-stone-950/80 p-8 shadow-pixel">
        <h2 className="text-xl text-moss-500">Generator</h2>
        <p className="mt-4 text-xs text-stone-300 leading-relaxed">
          Введіть промпт українською або англійською — CraftForge AI згенерує текстури,
          структуру Forge проекту та збере готовий .jar.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="w-full rounded border border-stone-700 bg-black/40 p-4 text-xs leading-relaxed text-stone-200"
            rows={5}
            placeholder="створи електричний меч який б'є блискавкою і має синю текстуру"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="rounded bg-moss-500 px-6 py-3 text-xs uppercase tracking-widest text-black shadow-pixel disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Mod'}
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs shadow-pixel">
          <h3 className="text-moss-500">Preview</h3>
          {error && <p className="mt-4 text-red-400">{error}</p>}
          {!error && !result && (
            <p className="mt-4 text-stone-400">
              Після генерації тут з'явиться текстура, назва предмету та кнопка завантаження.
            </p>
          )}
          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded border border-stone-700 bg-black/40 p-2">
                  <img
                    src={`${apiBase}${result.textureUrl}`}
                    alt="Generated texture"
                    className="h-full w-full object-contain image-rendering-pixelated"
                  />
                </div>
                <div>
                  <p className="text-stone-300">Item name</p>
                  <p className="text-moss-500">{result.displayName}</p>
                  <p className="text-stone-500">modId: {result.modId}</p>
                </div>
              </div>
              <a
                href={`${apiBase}${result.downloadUrl}`}
                className="inline-flex rounded bg-moss-500 px-6 py-3 text-xs uppercase tracking-widest text-black shadow-pixel"
              >
                Download Mod
              </a>
            </div>
          )}
        </div>

        <div className="rounded border border-stone-800 bg-stone-950/70 p-6 text-xs shadow-pixel space-y-4">
          <h3 className="text-moss-500">Pipeline</h3>
          <ul className="space-y-3 text-stone-300">
            <li>1. AI формує JSON визначення предмету.</li>
            <li>2. Генерується Java код Forge моду 1.20.1.</li>
            <li>3. Створюється 16x16 текстура в стилі Minecraft.</li>
            <li>4. Проект збирається Gradle build.</li>
            <li>5. Готовий mod.jar доступний для завантаження.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Generator;

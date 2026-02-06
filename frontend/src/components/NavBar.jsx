import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/generator', label: 'Generator' },
  { to: '/mods', label: 'My Mods' },
  { to: '/docs', label: 'Docs' },
];

const NavBar = () => {
  return (
    <header className="bg-stone-950/90 backdrop-blur border-b border-stone-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-lg text-moss-500">CraftForge AI</p>
          <p className="text-xs text-stone-400">Minecraft Forge 1.20.1 Mod Generator</p>
        </div>
        <nav className="flex gap-4 text-xs">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded px-3 py-2 uppercase tracking-widest transition ${
                  isActive ? 'bg-moss-500 text-black' : 'text-stone-300 hover:text-moss-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;

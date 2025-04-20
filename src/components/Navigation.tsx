import { Palette, Store, Hammer, GraduationCap, MessagesSquare, BookOpen, UserCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Palette, label: t('nav.home') },
    { path: '/marketplace', icon: Store, label: t('nav.marketplace') },
    { path: '/artisans', icon: Hammer, label: t('nav.artisans') },
    { path: '/workshops', icon: GraduationCap, label: t('nav.workshops') },
    { path: '/forum', icon: MessagesSquare, label: t('nav.forum') },
    { path: '/resources', icon: BookOpen, label: t('nav.resources') }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-2xl font-serif font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              CraftSense
            </Link>
            <div className="flex items-center">
              <div className="flex space-x-2 mr-6">
                {navItems.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`nav-link ${
                      isActive(path)
                        ? 'nav-link-active'
                        : 'nav-link-inactive'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <a
                  href="https://sparkly-cajeta-ee879f.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow"
                >
                  <UserCircle2 size={20} />
                  <span className="font-medium">{t('nav.admin')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 z-50">
        <div className="grid grid-cols-6 gap-1 px-2 py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${
                isActive(path)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          ))}
        </div>
        <div className="fixed right-4 bottom-24 flex items-center space-x-2">
          <LanguageSelector />
          <a
            href="https://sparkly-cajeta-ee879f.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            <UserCircle2 size={20} />
            <span className="font-medium">{t('nav.admin')}</span>
          </a>
        </div>
      </nav>
    </>
  );
}
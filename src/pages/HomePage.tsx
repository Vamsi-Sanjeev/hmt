import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 py-8">
      <section className="text-center pattern-bg py-16 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
          {t('home.subtitle')}
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="artisan-card animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b"
            alt={t('home.meetArtisans')}
            className="artisan-card-image"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{t('home.meetArtisans')}</h3>
            <p className="text-gray-600 mb-4">
              {t('home.subtitle')}
            </p>
            <Link
              to="/artisans"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {t('home.exploreArtisans')} <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>

        <div className="artisan-card animate-fade-in [animation-delay:200ms]">
          <img
            src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad"
            alt={t('home.shopMarketplace')}
            className="artisan-card-image"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{t('home.shopMarketplace')}</h3>
            <p className="text-gray-600 mb-4">
              {t('home.subtitle')}
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {t('home.viewProducts')} <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>

        <div className="artisan-card animate-fade-in [animation-delay:400ms]">
          <img
            src="https://images.unsplash.com/photo-1516727003284-a96541e51e9c"
            alt={t('home.joinWorkshops')}
            className="artisan-card-image"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{t('home.joinWorkshops')}</h3>
            <p className="text-gray-600 mb-4">
              {t('home.subtitle')}
            </p>
            <Link
              to="/workshops"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {t('home.browseWorkshops')} <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-clay-50 to-turmeric-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.whyChoose')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold mb-2">{t('home.directImpact')}</h3>
              <p className="text-gray-600">{t('home.directImpactDesc')}</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold mb-2">{t('home.authenticCrafts')}</h3>
              <p className="text-gray-600">{t('home.authenticCraftsDesc')}</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold mb-2">{t('home.communitySupport')}</h3>
              <p className="text-gray-600">{t('home.communitySupportDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
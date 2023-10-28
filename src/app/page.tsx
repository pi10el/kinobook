import { Suspense } from 'react';

// api
import { mainServices } from '@/shared/services/main';

// components
import { GenreTypeSlider } from '@/widgets/GenreTypeSlider';
import { MovieSlider } from '@/widgets/MovieSlider';
import { Container } from '@/shared/components/Container';
import { NoveltyCarusel } from '@/widgets/NoveltyCarusel';

const Home = async () => {
  const premieres = await mainServices.getPremieres();

  const NewMovies = mainServices.getMovies('movie', ['!Россия'], 2000, 'new');
  const topYear = mainServices.getTopYear();
  const NewSeries = mainServices.getMovies(
    'tv-series',
    ['!Россия', '!Турция', '!Корея Южная'],
    5000,
    'new',
  );
  const USASeries = mainServices.getMovies('tv-series', ['США'], 100000);
  const GermanySeries = mainServices.getMovies('tv-series', ['Германия'], 500);
  const KoreaSeries = mainServices.getMovies(
    'tv-series',
    ['Корея Южная'],
    10000,
  );
  const TurkeySeries = mainServices.getMovies('tv-series', ['Турция'], 10000);
  const cartoon = mainServices.getCartoonSlider();
  const СartoonSeries = mainServices.getMovies('animated-series', 'all', 5000);
  const anime = mainServices.getMovies('anime', 'all', 10000);

  return (
    <Container tag="div" variant="container-column">
      <NoveltyCarusel movies={premieres} />

      <GenreTypeSlider />

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Новинки фильмов" promise={NewMovies} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Топ 20 фильмов 2022" promise={topYear} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Новинки сериалов" promise={NewSeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Лучшие сериалы США" promise={USASeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Лучшие сериалы Германия" promise={GermanySeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Лучшие сериалы Корея" promise={KoreaSeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Лучшие сериалы Турция" promise={TurkeySeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Мультфильмы" promise={cartoon} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Мультсериалы" promise={СartoonSeries} />
      </Suspense>

      <Suspense fallback={<section className="loader main_slider" />}>
        {/* @ts-expect-error Server Component */}
        <MovieSlider title="Аниме" promise={anime} />
      </Suspense>
    </Container>
  );
};

export default Home;

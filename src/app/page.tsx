import * as cheerio from 'cheerio';
import { Card } from '@/shared/ui/Card/Card';
import styles from './page.module.css';

interface MovieData {
  id: string;
  title: string;
  posterUrl: string;
  link: string;
}

async function getKinobaseMovies(): Promise<MovieData[]> {
  try {
    const response = await fetch('https://kinobase.org/', { next: { revalidate: 3600 } }); // Revalidate every hour
    const html = await response.text();
    const $ = cheerio.load(html);

    const movies: MovieData[] = [];
    $('.main-page-list .item').each((i, element) => {
      const title = $(element).find('.name a').text().trim();
      const posterUrl = $(element).find('.image-wrapper img').attr('src') || '';
      const link = $(element).find('.name a').attr('href') || '#';
      const id = link.split('/').pop()?.split('-')[0] || `movie-${i}`; // Extract ID from link

      if (title && posterUrl && link) {
        movies.push({ id, title, posterUrl, link: `https://kinobase.org${link}` });
      }
    });

    return movies;
  } catch (error) {
    console.error('Error fetching or parsing Kinobase:', error);
    return [];
  }
}

export default async function HomePage() {
  const movies = await getKinobaseMovies();

  return (
    <section className={styles.homePage}>
      <h1 className={styles.pageTitle}>Популярные фильмы на Kinobase.org</h1>
      {movies.length > 0 ? (
        <div className={styles.movieGrid}>
          {movies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              imageUrl={movie.posterUrl}
              link={movie.link}
              description="Нажмите, чтобы узнать больше"
            />
          ))}
        </div>
      ) : (
        <p className={styles.noData}>Не удалось загрузить данные о фильмах.</p>
      )}
    </section>
  );
}
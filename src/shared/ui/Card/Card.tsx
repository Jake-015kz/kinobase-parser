import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  link: string;
}

export const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <Link href={link} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
      <article className={styles.card}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </article>
    </Link>
  );
};
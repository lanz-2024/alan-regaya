import type { CSSProperties } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: CSSProperties;
};

const FILL_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

export function PictureImage({
  src,
  alt,
  className,
  sizes,
  fill = false,
  width,
  height,
  priority = false,
  style,
}: Props) {
  const avifSrc = src.replace(/\.webp$/i, '.avif');
  const hasAvif = avifSrc !== src;

  const imgStyle: CSSProperties | undefined = fill
    ? { ...FILL_STYLE, ...style }
    : style;

  return (
    <picture>
      {hasAvif && <source srcSet={avifSrc} type="image/avif" sizes={sizes} />}
      <source srcSet={src} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={className}
        style={imgStyle}
      />
    </picture>
  );
}

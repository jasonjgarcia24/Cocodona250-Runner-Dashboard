import { T } from '../tokens';

export const Card = ({ children, style = {} }) => (
  <div
    style={{
      borderRadius: 12,
      background: T.cardBg,
      border: `1px solid ${T.cardBorder}`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SectionLabel = ({ children }) => (
  <div
    style={{
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 12,
      fontFamily: "'Inter', sans-serif",
      color: T.accentLight,
    }}
  >
    {children}
  </div>
);

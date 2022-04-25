import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PROD = process.env.NEXT_PUBLIC_APP_ENV === 'production'
const IS_LOCAL = process.env.NEXT_PUBLIC_APP_ENV === 'local'

!IS_LOCAL && Sentry.init({
  dsn: SENTRY_DSN || 'https://d1b0c12fb5524fa583d24ce3daf935c6@o1219582.ingest.sentry.io/6362025',
  tracesSampleRate: IS_PROD ? 0.25 : 1.0,
  debug: !IS_PROD,
  environment: process.env.NEXT_PUBLIC_APP_ENV
});

#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_ENV:?DEPLOY_ENV is required}"
: "${VERCEL_TOKEN:?VERCEL_TOKEN is required}"

if [[ "$DEPLOY_ENV" == "production" ]]; then
  deploy_environment="production"
  prod_flag="--prod"
else
  deploy_environment="preview"
  prod_flag=""
fi

vercel_cmd=(npx --yes vercel@latest)

"${vercel_cmd[@]}" pull --yes --environment="$deploy_environment" --token="$VERCEL_TOKEN"

if [[ -n "$prod_flag" ]]; then
  "${vercel_cmd[@]}" build --prod --token="$VERCEL_TOKEN"
  "${vercel_cmd[@]}" deploy --prebuilt --prod --token="$VERCEL_TOKEN"
else
  "${vercel_cmd[@]}" build --token="$VERCEL_TOKEN"
  "${vercel_cmd[@]}" deploy --prebuilt --token="$VERCEL_TOKEN"
fi

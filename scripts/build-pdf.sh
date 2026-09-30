#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCALE="${1:-zh-Hans}"
OUTPUT_DIR="${2:-${ROOT_DIR}/pdf/dist}"
PORT="${PDF_PORT:-4173}"

case "${LOCALE}" in
  zh-Hans)
    BUILD_DIR="${ROOT_DIR}/build"
    CSS_FILE="${ROOT_DIR}/src/css/pdf-zh.css"
    COVER_FILE="${ROOT_DIR}/pdf/cover-zh.pdf"
    BODY_FILE="${OUTPUT_DIR}/TDengine-IDMP-Enterprise-User-Manual-zh-Hans-body.pdf"
    FINAL_FILE="${OUTPUT_DIR}/TDengine-IDMP-Enterprise-User-Manual-zh-Hans.pdf"
    BUILD_COMMAND=(pnpm run build-zh)
    BASE_URL="http://127.0.0.1:${PORT}"
    ;;
  en)
    BUILD_DIR="${ROOT_DIR}/build-en"
    CSS_FILE="${ROOT_DIR}/src/css/pdf-en.css"
    COVER_FILE="${ROOT_DIR}/pdf/cover-en.pdf"
    BACK_COVER_FILE="${ROOT_DIR}/pdf/back-cover-en.pdf"
    BODY_FILE="${OUTPUT_DIR}/TDengine-IDMP-Enterprise-User-Manual-en-body.pdf"
    FINAL_FILE="${OUTPUT_DIR}/TDengine-IDMP-Enterprise-User-Manual-en.pdf"
    BUILD_COMMAND=(pnpm run build-en)
    BASE_URL="http://127.0.0.1:${PORT}"
    ;;
  *)
    echo "Unsupported locale: ${LOCALE}. Use zh-Hans or en." >&2
    exit 2
    ;;
esac

command -v prince >/dev/null || { echo "Prince is required on PATH." >&2; exit 1; }
command -v pdftk >/dev/null || { echo "pdftk is required on PATH." >&2; exit 1; }
command -v bun >/dev/null || { echo "Bun is required on PATH." >&2; exit 1; }
[[ -f "${COVER_FILE}" ]] || { echo "Missing cover: ${COVER_FILE}" >&2; exit 1; }
[[ "${LOCALE}" != en || -f "${BACK_COVER_FILE}" ]] || {
  echo "Missing back cover: ${BACK_COVER_FILE}" >&2
  exit 1
}

mkdir -p "${OUTPUT_DIR}"
rm -f "${BODY_FILE}" "${FINAL_FILE}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "${SERVER_PID}" 2>/dev/null || true
    wait "${SERVER_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

cd "${ROOT_DIR}"
PDF_BUILD=true DOCS_ONLY_CURRENT=true "${BUILD_COMMAND[@]}"

pnpm exec docusaurus serve --dir "${BUILD_DIR}" --host 127.0.0.1 --port "${PORT}" \
  >"${OUTPUT_DIR}/serve.log" 2>&1 &
SERVER_PID=$!

for _ in {1..60}; do
  if curl --fail --silent "${BASE_URL}" >/dev/null; then
    break
  fi
  sleep 1
done
curl --fail --silent "${BASE_URL}" >/dev/null

bun node_modules/docusaurus-prince-pdf/index.js \
  --url "${BASE_URL}" \
  --output "${BODY_FILE}" \
  --prince-args="-s ${CSS_FILE}" \
  --dest "${OUTPUT_DIR}"

if [[ "${LOCALE}" == en ]]; then
  pdftk "${COVER_FILE}" "${BODY_FILE}" "${BACK_COVER_FILE}" cat output "${FINAL_FILE}"
else
  pdftk "${COVER_FILE}" "${BODY_FILE}" cat output "${FINAL_FILE}"
fi

rm -f "${BODY_FILE}"
echo "Created ${FINAL_FILE}"

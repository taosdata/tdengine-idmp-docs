# TDengine IDMP Documentation
shell := "powershell"
# default recipe: list all available recipes
default:
    @just --list

# install project dependencies
install:
    pnpm install

# start Chinese preview (default)
start:
    pnpm start --host 0.0.0.0

# start English preview
start-en:
    pnpm start --host 0.0.0.0 --locale en

# build static files for production
build:
    pnpm build

# preview the production build locally
serve:
    pnpm serve

# clear generated assets, caches, and build artifacts
clear:
    pnpm run clear

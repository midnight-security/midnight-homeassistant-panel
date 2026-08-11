# Contributing

Thank you for helping improve the Midnight 911 Frontend Plugin. Contributions are welcome, but for anything beyond a small fix, please open an issue first to discuss your plans.

This plugin has no alarm engine of its own — it's a companion panel for [`midnight_alerts`](https://github.com/midnight-security/midnight-homeassistant-911). Testing and running it locally requires a checkout of that repo alongside this one (see below).

## Development setup

We use [`uv`](https://github.com/astral-sh/uv) to manage the Python environment.

1. Install `uv` by following the [official installation guide](https://docs.astral.sh/uv/getting-started/installation/).
2. Fork this repository (not upstream Alarmo) and clone your fork:
   ```bash
   git clone https://github.com/[your-username]/alarmo.git
   cd alarmo
   ```
3. Install dependencies and pre-commit hooks:
   ```bash
   uv sync
   uv run pre-commit install
   ```
4. Point VSCode at the project's interpreter: open the Command Palette → `Python: Select Interpreter` → choose `./.venv/bin/python`.

### Linking `midnight_alerts` for local testing

This plugin's tests exercise the real `midnight_alerts` config flows rather than a hand-maintained double, so you need a copy of it under `custom_components/`:

```bash
git clone https://github.com/midnight-security/midnight-homeassistant-911.git ../midnight-homeassistant-911
ln -s "$(pwd)/../midnight-homeassistant-911/custom_components/midnight_alerts" custom_components/midnight_alerts
```

`custom_components/midnight_alerts` is gitignored, so the symlink is safe to leave in place between runs.

## Running tests

```bash
uv run pytest tests
```

Pre-commit also runs the test suite, ruff, and bandit on every commit — see `.pre-commit-config.yaml`.

## Branch workflow

Work happens on feature branches off `main`. Open PRs against `main`; CI (hassfest, HACS validation, ruff, pytest, and — for frontend changes — the frontend build check) must pass before merging.

Releases are cut manually via GitHub Releases: publishing a release triggers the [`build`](.github/workflows/build.yaml) workflow, which stamps the version into `manifest.json` and attaches the zipped integration for HACS.

## Commit messages

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/) (`fix:`, `feat:`, etc.) for readable history, even though releases here are cut manually rather than automated from commit messages.

## Managing Python versions

`pyproject.toml` defines the compatible Python versions for the project. When updating, bump it there and test thoroughly with the new version.

## FAQ

### Bypassing pre-commit hooks

While we recommend fixing issues identified by pre-commit, there may be situations where you need to bypass the hooks temporarily (emergency hotfixes, work-in-progress commits, documentation-only changes).

You can bypass pre-commit hooks for a single commit using either:
```bash
# Long form
git commit -m "your message" --no-verify

# Short form
git commit -m "your message" -n
```

**Important:** After bypassing hooks:
1. This should be used sparingly.
2. Run checks manually before pushing:
   ```bash
   uv run pre-commit run --all-files
   ```
3. Document the reason for bypassing in your commit message.

## Security

Do not open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md).

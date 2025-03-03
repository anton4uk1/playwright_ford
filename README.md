# Playwright Test Automation Framework - Ford

Test automation framework built with Playwright

## Installation

1️⃣ Install Node.js via [Homebrew](https://brew.sh/) if you don’t already have it:

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, use it to install Node.js:
```bash
# Install Node
brew install node
```

Verify the installation:
```bash
node -v  # Check Node.js version
npm -v   # Check npm version
```

2️⃣ Once **Node.js** and **npm** are installed, use **npm** to install Playwright:

```bash
# Initialize Playwright in your project
npm init playwright@latest

# Install dependencies (node_modules)
npm install
```

## Usage

```python
# Runs all tests in parallel
npx playwright test --headed

# Runs all tests serially
npx playwright test --workers 1 --headed

# Runs a specific test
npx playwright test <relative path> --headed

# Runs a specific test in a debug mode to view line-by-line code execution
npx playwright test <relative path> --headed --debug

# View results of a test run
npx playwright show-report
```

## Architecture

**Top Level** – Test Files (Assertions & UI/API Tests)
* Folder: tests/
* Purpose: Contains Playwright test specifications for different areas of the application

**Middle Level** – Selectors (Locators for UI Elements)
* Folder: selectors/
* Purpose: Houses selectors for different pages and UI components

**Middle Level** – Helpers (Reusable Logic for UI/API Interactions)
* Folder: helpers/
* Purpose: Contains utility functions and abstractions to simplify UI/API interactions

**Configuration & Test Data**
* Folder: config/ & fixtures/const/
* Purpose: Stores configurations and test data to make tests dynamic

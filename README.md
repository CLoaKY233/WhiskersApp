
# Whiskers

Whiskers is an AI-powered application that predicts whether an uploaded image is a cat or a dog. It's a binary classifier trained to differentiate between feline and canine friends! This project leverages modern web technologies and machine learning to provide accurate predictions in a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building the Project](#building-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Image Upload**: Upload an image to get a prediction.
- **Dark Mode**: Toggle between light and dark themes.
- **AI Prediction**: Uses a backend API to predict whether the uploaded image is a cat or a dog.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Tauri (Rust)
- **Styling**: Tailwind CSS, Shadcn UI components
- **Machine Learning**: Pre-trained model for image classification

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Rust and Cargo](https://www.rust-lang.org/tools/install) (for Tauri backend)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Clone the Repository

```bash
git clone https://github.com/CLoaKY233/WhiskersApp.git
cd WhiskersApp
```

### Install Dependencies

```bash
npm install
```

### Setup Tauri

Ensure you have Rust and Cargo installed. You can install Rust using [rustup](https://rustup.rs/).

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install Tauri CLI:

```bash
cargo install tauri-cli
```

## Running the Project

To run the project locally, use:

```bash
npm run tauri dev
```

## Building the Project

To build the project and create an installer, run:

```bash
npm run tauri build
```

## Project Structure

```
WhiskersApp/
├── src/
│   ├── components/
│   │   ├── Whiskers.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── switch.tsx
│   │       └── tooltip.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── input.css
├── src-tauri/
│   ├── src/
│   │   ├── lib.rs
│   │   └── main.rs
│   └── tauri.conf.json
├── public
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .gitignore
```

- **src/components**: Contains the React components.
- **src-tauri**: Contains the Tauri backend code.
- **public**: Contains static assets.
- **src**: Contains the main React application code.

## Detailed Information

### Tauri

[Tauri](https://v2.tauri.app/start/) is a framework for building tiny, fast binaries for all major desktop platforms. It uses Rust for the backend and any frontend framework for the UI. Tauri applications are secure, performant, and can be built with a small footprint.

### Shadcn UI Components

[Shadcn](https://ui.shadcn.com/docs) is a collection of reusable UI components built with Tailwind CSS. It provides a set of customizable and accessible components that can be easily integrated into any project.

### Vite

[Vite](https://vite.dev/) is a next-generation frontend tooling that provides a fast and optimized development experience. It leverages native ES modules and provides a highly efficient build process.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [laysheth1@gmail.com](mailto:laysheth1@gmail.com).

---

Thank you for using Whiskers! We hope you find it useful and fun. Happy predicting!

# Estok (Back-end)

**Tagline**: Product control system on shelves using RFID technology.

## Description

Estok is a system that manages products on shelves using RFID tags. When a product is removed from the shelf, the RFID reader connected to an ESP32 alerts the dashboard in near real-time.

## Project Status

In development.

## Technologies Used

- **Back-end**: Node.js, Express
- **Database**: MySQL (via mysql2)
- **Authentication**: JWT & bcrypt
- **Real-time communication**: WebSocket
- **Email service**: nodemailer
- **Testing**: Jest, Supertest
- **Environment configuration**: dotenv
- **CORS management**: cors


## Installation

To set up the project, clone the repository:

**Example:**

```bash
https://github.com/gustavorods/2025_estok_backend.git
```

## Usage

### 1 - Install dependencies
After cloning the project, navigate into the project folder and run:

```bash
npm install
```

### 2 configure - .env
After downloading the dependencies, configure the `.env` file using `.env.example` as a template.

### 3 - Run project
After configuring, run:

```bash
npm start
```

The server will be available on the port that was configured in the `.env` file under (`PORT`).

## Contributing
To contribute to the project:
1. Fork the repository
2. Create a branch
3. Make your changes
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Useful Links
[Estok Front-end](https://github.com/ErickFLM/2025_Estok_Frontend.git)


# TakeMeHome

A full-stack web application for managing home maintenance, inventory, and upkeep tasks. Built with ASP.NET Core backend and React frontend.

## Features

- **Areas Management**: Organize your home into different areas (kitchen, living room, etc.)
- **Inventory Tracking**: Keep track of household items and their locations
- **Upkeep Scheduling**: Schedule and track maintenance tasks by month
- **User Authentication**: Secure login and user management

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 22.22.1 or higher) - [Download here](https://nodejs.org/)
- **.NET 6.0 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/6.0)
- **SQL Server** (Express or Developer edition) - [Download here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- **SQL Server Management Studio (SSMS)** (optional, for database management) - [Download here](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

## Database Setup

1. **Install SQL Server**: Follow the installation guide for your platform.

2. **Create the Database**:
   - Open SQL Server Management Studio (SSMS)
   - Connect to your SQL Server instance
   - Open and execute the SQL scripts in the `SQL/` directory in order:
     - `01_Db_Create.sql` - Creates the database and tables
     - `02_Seed_Data.sql` - Populates the database with initial data

3. **Verify Connection**:
   - The application uses the connection string in `TakeMeHome/appsettings.json`
   - Default: `server=localhost\SQLExpress;database=TakeMeHome;Trusted_Connection=True;TrustServerCertificate=True;`
   - Update this if your SQL Server configuration differs

## Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd TakeMeHome
   ```

2. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

3. **Run the backend**:
   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:5001`

## Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd TakeMeHome/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The React app will be available at `http://localhost:5173`

## Running the Full Application

To run both frontend and backend simultaneously:

1. **Start the backend** (in one terminal):
   ```bash
   cd TakeMeHome
   dotnet run
   ```

2. **Start the frontend** (in another terminal):
   ```bash
   cd TakeMeHome/client
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: https://localhost:5001

The frontend is configured to proxy API requests to the backend.

## Project Structure

```
TakeMeHome/
├── SQL/                    # Database scripts
├── TakeMeHome/            # ASP.NET Core backend
│   ├── Controllers/       # API controllers
│   ├── Models/           # Data models
│   ├── Repositories/     # Data access layer
│   └── client/           # React frontend
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── providers/   # Context providers
│       │   └── ...
│       └── ...
└── README.md
```

## Technologies Used

- **Backend**: ASP.NET Core 6.0, C#, SQL Server
- **Frontend**: React 18, React Router, Bootstrap
- **Build Tools**: Vite, npm
- **Development**: Visual Studio Code, WSL (for Windows users)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

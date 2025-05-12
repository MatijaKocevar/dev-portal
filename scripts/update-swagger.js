const fs = require("fs");
const path = require("path");

const swaggerPath = path.join(process.cwd(), "public", "swagger.json");
const swagger = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

// In production, keep only the production server
// In development, keep only the local server
if (process.env.NODE_ENV === "production") {
    swagger.servers = swagger.servers.filter(
        (server) => server.url === "https://dev-portal-management.vercel.app/api"
    );
} else {
    swagger.servers = swagger.servers.filter(
        (server) => server.url === "http://localhost:3000/api"
    );
}

fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));

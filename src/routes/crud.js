const fastify = require("fastify")();
import { pool } from "./../config";

// Create a new organization
fastify.post("/organizations", async (request, reply) => {
  try {
    // Get the request body, which should contain the new organization data
    const { name, address, phone } = request.body;

    // Execute the SQL query to insert the new organization record
    const {
      rows: [newOrganization],
    } = await pool.query(
      `
        INSERT INTO organization (name, address, phone)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [name, address, phone]
    );

    // Return the new organization record as JSON
    reply.type("application/json").send(newOrganization);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

// Retrieve an organization by ID
fastify.get("/organizations/:id", async (request, reply) => {
  try {
    // Get the organization ID from the URL parameters
    const { id } = request.params;

    // Execute the SQL query to retrieve the organization record
    const {
      rows: [organization],
    } = await pool.query(
      `
        SELECT * FROM organization WHERE id = $1;
      `,
      [id]
    );

    // If the organization record is not found, return a 404 Not Found
    if (!organization) {
      reply.status(404).send("Organization Not Found");
    } else {
      // Otherwise, return the organization record as JSON
      reply.type("application/json").send(organization);
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

// Update an organization by ID
fastify.put("/organizations/:id", async (request, reply) => {
  try {
    // Get the organization ID from the URL parameters and the new organization data from the request body
    const { id } = request.params;
    const { name, address, phone } = request.body;

    // Execute the SQL query to update the organization record
    const { rowCount } = await pool.query(
      `
        UPDATE organization SET name = $1, address = $2, phone = $3
        WHERE id = $4;
      `,
      [name, address, phone, id]
    );

    // If the organization record is not found, return a 404 Not Found
    if (rowCount === 0) {
      reply.status(404).send("Organization Not Found");
    } else {
      // Otherwise, return a success message as JSON
      reply.type("application/json").send({ message: "Organization Updated" });
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

// Delete an organization by ID
fastify.delete("/organizations/:id", async (request, reply) => {
  try {
    // Get the organization ID from the URL parameters
    const { id } = request.params;

    // Execute the SQL query to delete the organization record
    const { rowCount } = await pool.query(
      `
        DELETE FROM organization WHERE id = $1;
      `,
      [id]
    );

    // If the organization record is not found, return a 404 Not Found
    if (rowCount === 0) {
      reply.status(404).send("Organization Not Found");
    } else {
      // Otherwise, return a success message as JSON
      reply.type("application/json").send({ message: "Organization Deleted" });
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

// Start the server
fastify.listen(3000, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log("Server listening on port 3000");
});

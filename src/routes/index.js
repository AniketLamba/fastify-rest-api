import { FastifyPluginAsync } from "fastify";
import { doctorsByOrganization, insertDoctorIntoOrg } from "./query";
import { pool } from "./../config";

fastify.get("/doctors-by-organization", async (request, reply) => {
  try {
    const orgName = request.query.org_name;
    const [rows] = await pool.query(doctorsByOrganization(orgName));

    // Return the results as JSON
    reply.type("application/json").send(rows);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

fastify.post("/add-doctor-to-organization", async (request, reply) => {
  try {
    const { doctorId, organizationId } = request.body;
    const [rows] = await pool.query(
      insertDoctorIntoOrg(doctorId, organizationId)
    );

    // Return the results as JSON
    reply.type("application/json").send({ id: result.insertId });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error
    console.error(error);
    reply.status(500).send("Internal Server Error");
  }
});

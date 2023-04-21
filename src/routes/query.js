import SQL from "@nearform/sql";

const doctorsByOrganization = (orgName) => {
  return SQL`
  SELECT doctors.first_name, doctors.last_name, organization.name org_name
FROM DoctorsByOrganization
JOIN doctors ON doctors.id = DoctorsByOrganization.Doctor
JOIN organization ON organization.id = DoctorsByOrganization.Organization
where organization.name=${orgName}
ORDER BY organization.name;
  `;
};

const insertDoctorIntoOrg = (doctorId, orgId) => {
  return SQL`
  INSERT INTO DoctorsByOrganization (Doctor, Organization, IsActive)
  VALUES (${doctorId}, ${doctorId}, true);
    RETURNING *
  `;
};

export { doctorsByOrganization, insertDoctorIntoOrg };

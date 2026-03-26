
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Web Advanced API",
      version: "1.0.0",
      description: "API documentation generated with JSDoc + swagger-jsdoc",
      //where I got some hints from to add this for Authorize button in Swagger
      //https://swagger.io/docs/specification/v3_0/authentication/
      //https://swagger.io/docs/specification/v3_0/components/
      //https://www.youtube.com/watch?v=wTO38S5O9Uo
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat:"JWT",
          description: "Enter your bearer token",
        },
      },
    },
  },
  // Point to folder where Swagger should look for the routes
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

//I only add the security :{bearerAuth:[]} in YAML so that public endpoints like get remain accesible without jwt
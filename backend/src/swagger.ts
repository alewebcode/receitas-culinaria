import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API de receitas culinárias",
    },
    tags: [
      { name: "Usuários", description: "Usuários" },
      { name: "Autenticação", description: "Login e autenticação" },
      { name: "Receitas", description: "Receitas" },
      { name: "Categorias", description: "Categorias" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

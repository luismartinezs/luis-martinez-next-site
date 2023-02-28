export default function plopGenerator(
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("component", {
    description: "Standalone component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../components/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      }
    ],
  });
  plop.setGenerator("page", {
    description: "Add a new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the page (e.g. my-page, my-folder/my-page, ...)?",
        validate: function (value) {
          if (/^([A-Za-z\-\_\d]+\/)*[A-Za-z\-\_\d]+$/.test(value)) {
            return true;
          }
          return "Invalid page name format. Use only letters, numbers, hyphens, and underscores.";
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "../pages/{{name}}.tsx",
        templateFile: "templates/page.tsx.hbs",
      },
    ],
  });
}

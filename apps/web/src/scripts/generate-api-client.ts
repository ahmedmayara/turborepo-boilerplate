import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const openApiConfig = {
  npmName: "@app/api-client",
  npmVersion: "1.0.0",
  supportsES6: true,
  withSeparateModelsAndApi: true,
  modelPackage: "models",
  apiPackage: "api",
  fileNaming: "kebab-case",
};

const configPath = resolve(__dirname, "./openapi-generator-config.json");
writeFileSync(configPath, JSON.stringify(openApiConfig, null, 2));

const outputDir = resolve(__dirname, "../lib/api/client");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

try {
  console.log("Waiting for API server to be ready...");

  const response = await fetch("http://localhost:4000/doc");

  if (!response.ok) {
    console.error("API server is not running");
    process.exit(1);
  }

  console.log("Generating API client...");
  execSync(
    `pnpm openapi-generator-cli generate \
    -i http://localhost:4000/doc \
    -g typescript-fetch \
    -o ${outputDir} \
    -c ${configPath} \
    --additional-properties=useSingleRequestParameter=true,withSeparateModelsAndApi=true,fileNaming=camelCase,supportsES6=true,apiPackage=api,modelPackage=models`,
    { stdio: "inherit" },
  );

  console.log("API client generated successfully!");
} catch (error) {
  console.error("Error generating API client:", error);
  process.exit(1);
}

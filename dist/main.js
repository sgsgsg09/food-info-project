"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const swaggerEnabled = configService.get('SWAGGER_ENABLED') === 'true';
    if (swaggerEnabled) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Food Info Project API')
            .setDescription('API documentation for the Food Info Project')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    }
    app.setGlobalPrefix('api');
    app.enableCors();
    const PORT = 3000;
    await app.listen(PORT);
    console.log(`Application is running on: http://localhost:${PORT}${swaggerEnabled ? '/api-docs' : ''}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
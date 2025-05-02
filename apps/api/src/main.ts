import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Set up basic middleware
  app.use((req, res, next) => {
    console.log(`Request...`);
    next();
  });

  // Set up basic routes
  app.get('/health', (req, res) => {
    res.send('OK');
  });

  await app.listen(3000);
}
bootstrap();

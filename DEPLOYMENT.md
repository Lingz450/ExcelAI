# Deployment Guide

This guide covers deploying ExcelAI to production.

## Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL (for production)
- S3-compatible storage (AWS S3, Cloudflare R2, etc.)
- OpenAI API key (or alternative AI provider)

## Environment Setup

### Production Environment Variables

Create a `.env.production` file:

```env
# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/excelai

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4

# Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=excelai-uploads
AWS_REGION=us-east-1

# Redis (for job queue)
REDIS_URL=redis://localhost:6379

# App Settings
MAX_FILE_SIZE_MB=100
FILE_RETENTION_HOURS=24
RATE_LIMIT_PER_DAY=3
```

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Python Backend**
   - Deploy Python backend separately (see Option 3)
   - Update API endpoints in Next.js config

### Option 2: Docker (Full Stack)

1. **Create Dockerfile**
   ```dockerfile
   # Frontend
   FROM node:18-alpine AS frontend
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --production
   COPY . .
   RUN npm run build

   # Backend
   FROM python:3.9-slim AS backend
   WORKDIR /app
   COPY backend/requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY backend/ .

   # Final image
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=frontend /app/.next ./.next
   COPY --from=frontend /app/public ./public
   COPY --from=frontend /app/package*.json ./
   RUN npm ci --production

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/excelai
       depends_on:
         - db
         - redis
     
     db:
       image: postgres:15
       environment:
         POSTGRES_DB: excelai
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: password
       volumes:
         - postgres_data:/var/lib/postgresql/data
     
     redis:
       image: redis:7-alpine
       volumes:
         - redis_data:/data
     
     worker:
       build:
         context: .
         dockerfile: Dockerfile.worker
       depends_on:
         - redis
         - db
   
   volumes:
     postgres_data:
     redis_data:
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

### Option 3: AWS (Scalable Production)

#### Frontend (Vercel or AWS Amplify)
```bash
# Using Amplify
amplify init
amplify add hosting
amplify publish
```

#### Backend (AWS Lambda + API Gateway)

1. **Package Python backend**
   ```bash
   cd backend
   pip install -r requirements.txt -t ./package
   cd package
   zip -r ../function.zip .
   cd ..
   zip -g function.zip excel_processor.py
   ```

2. **Create Lambda function**
   ```bash
   aws lambda create-function \
     --function-name excelai-processor \
     --runtime python3.9 \
     --handler excel_processor.lambda_handler \
     --zip-file fileb://function.zip
   ```

3. **Set up API Gateway**
   - Create REST API
   - Add POST /process endpoint
   - Connect to Lambda function

#### Database (RDS PostgreSQL)
```bash
aws rds create-db-instance \
  --db-instance-identifier excelai-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword \
  --allocated-storage 20
```

#### File Storage (S3)
```bash
aws s3 mb s3://excelai-uploads
aws s3api put-bucket-encryption \
  --bucket excelai-uploads \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

## Database Migration

1. **Install Prisma** (or your ORM of choice)
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

3. **Create schema** (prisma/schema.prisma)
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     name      String
     createdAt DateTime @default(now())
     workbooks Workbook[]
     jobs      Job[]
   }

   model Workbook {
     id               String   @id @default(cuid())
     userId           String
     originalFilename String
     storageKey       String
     fileSize         Int
     uploadedAt       DateTime @default(now())
     user             User     @relation(fields: [userId], references: [id])
     jobs             Job[]
   }

   model Job {
     id             String   @id @default(cuid())
     userId         String
     workbookId     String
     requestText    String
     status         String
     plan           Json?
     errorMessage   String?
     startedAt      DateTime @default(now())
     finishedAt     DateTime?
     executionTimeMs Int?
     user           User     @relation(fields: [userId], references: [id])
     workbook       Workbook @relation(fields: [workbookId], references: [id])
     outputs        JobOutput[]
   }

   model JobOutput {
     id              String   @id @default(cuid())
     jobId           String
     outputStorageKey String
     diffSummary     Json
     version         Int
     createdAt       DateTime @default(now())
     job             Job      @relation(fields: [jobId], references: [id])
   }
   ```

4. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

## Monitoring & Logging

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Custom Logging
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', message, meta, timestamp: new Date() }));
  },
  error: (message: string, error?: Error, meta?: any) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error?.stack, 
      meta, 
      timestamp: new Date() 
    }));
  }
};
```

## Performance Optimization

### CDN (Cloudflare)
- Configure DNS
- Enable caching
- Set up page rules

### Image Optimization
```javascript
// next.config.mjs
export default {
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### Redis Caching
```typescript
// lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCached<T>(key: string): Promise<T | null> {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setCache(key: string, value: any, ttl: number = 3600) {
  await redis.setex(key, ttl, JSON.stringify(value));
}
```

## Security Checklist

- [ ] Enable HTTPS only
- [ ] Configure CSP headers
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Validate all user inputs
- [ ] Encrypt sensitive data
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Configure WAF rules
- [ ] Set up DDoS protection

## Backup Strategy

### Database Backups
```bash
# Daily automated backups
0 2 * * * pg_dump $DATABASE_URL > backup-$(date +\%Y\%m\%d).sql
```

### File Storage Backups
```bash
# Replicate S3 bucket
aws s3 sync s3://excelai-uploads s3://excelai-backups
```

## Scaling

### Horizontal Scaling
- Use load balancer (AWS ALB, Nginx)
- Run multiple app instances
- Configure session store (Redis)

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching layers

### Auto-scaling (AWS)
```bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name excelai-asg \
  --min-size 2 \
  --max-size 10 \
  --desired-capacity 2
```

## Post-Deployment

1. **Test all features**
   - Upload files
   - Process jobs
   - Browse formulas
   - Try recipes

2. **Monitor metrics**
   - Response times
   - Error rates
   - Resource usage
   - User activity

3. **Set up alerts**
   - Error thresholds
   - Performance degradation
   - Resource limits

4. **Document runbooks**
   - Deployment process
   - Rollback procedure
   - Common issues

## Support

For deployment issues, contact:
- Email: devops@excelai.com
- Slack: #deployment
- Docs: docs.excelai.com/deployment


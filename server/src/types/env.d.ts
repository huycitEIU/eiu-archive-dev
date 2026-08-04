declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT?: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        STORAGE_BUCKET_NAME: string;
        STORAGE_ACCESS_KEY: string;
        STORAGE_SECRET_KEY: string;
    }
}   
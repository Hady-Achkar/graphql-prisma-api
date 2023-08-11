import { Pool, QueryResult } from "pg";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Use environment variables
      ssl: {
        rejectUnauthorized: false, // For self-signed certificates
      },
    });
  }

  async query(queryText: string, values?: any[]): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryText, values);
      return result;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }
}

export default new Database();

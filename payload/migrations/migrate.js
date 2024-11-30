import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getMigrations } from './getMigrations.js';
import { readMigrationFiles } from './readMigrationFiles.js';
export const migrate = async function migrate(args) {
    const { payload } = this;
    const migrationFiles = args?.migrations || await readMigrationFiles({
        payload
    });
    payload.logger.info({
        msg: `... migrationFiles: ${JSON.stringify(migrationFiles)}`
    });
    const { existingMigrations, latestBatch } = await getMigrations({
        payload
    });
    payload.logger.info({
        msg: `... existingMigrations: ${JSON.stringify(existingMigrations)}`
    });
    payload.logger.info({
        msg: `... latestBatch: ${latestBatch}`
    });
    const newBatch = latestBatch + 1;
    payload.logger.info({
        msg: `... newBatch: ${newBatch}`
    });
    // Execute 'up' function for each migration sequentially
    for (const migration of migrationFiles){
        payload.logger.info({
            msg: `... migration: ${JSON.stringify(migration)}`
        });
        const existingMigration = existingMigrations.find((existing)=>existing.name === migration.name);
        payload.logger.info({
            msg: `... existingMigration: ${existingMigration}`
        });
        // Run migration if not found in database
        if (existingMigration) {
            continue;
        }
        const start = Date.now();
        const req = {
            payload
        };
        payload.logger.info({
            msg: `Migrating: ${migration.name}`
        });
        try {
            await initTransaction(req);
            await migration.up({
                payload,
                req
            });
            payload.logger.info({
                msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)`
            });
            await payload.create({
                collection: 'payload-migrations',
                data: {
                    name: migration.name,
                    batch: newBatch
                },
                req
            });
            await commitTransaction(req);
        } catch (err) {
            await killTransaction(req);
            payload.logger.error({
                err,
                msg: `Error running migration ${migration.name}`
            });
            throw err;
        }
    }
};


//# sourceMappingURL=migrate.js.map
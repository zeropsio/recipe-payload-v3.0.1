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
    console.log('... migrationFiles:', migrationFiles);
    const { existingMigrations, latestBatch } = await getMigrations({
        payload
    });
    console.log('... existingMigrations:', existingMigrations);
    console.log('... latestBatch:', latestBatch);
    const newBatch = latestBatch + 1;
    console.log('... newBatch:', newBatch);
    // Execute 'up' function for each migration sequentially
    for (const migration of migrationFiles){
        console.log('... migration:', migration);
        const existingMigration = existingMigrations.find((existing)=>existing.name === migration.name);
        console.log('... existingMigration:', existingMigration);
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
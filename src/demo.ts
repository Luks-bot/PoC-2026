import { eq } from "drizzle-orm";
import { client, db } from "./db.js";
import { accounts, transfers } from "./schema.js";

async function main(): Promise<void> {
  await db.delete(transfers);
  await db.delete(accounts);

  console.log("1. Insertar usuarios");
  await db.insert(accounts).values([
    { owner: "Ana", balance: 1000 },
    { owner: "Luis", balance: 500 },
  ]);

  const insertedAccounts = await db
    .select({ id: accounts.id, owner: accounts.owner })
    .from(accounts);
console.log(insertedAccounts);
  const ana = insertedAccounts.find((account) => account.owner === "Ana");
  const luis = insertedAccounts.find((account) => account.owner === "Luis");

  if (!ana || !luis) {
    throw new Error("No se pudieron crear las cuentas");
  }

  console.log("2. Consultar usuarios");
  console.log(await db.select().from(accounts));

  console.log("3. Ana transfiere 200 a Luis");
  await db.transaction(async (tx) => {
    await tx
      .update(accounts)
      .set({ balance: 800 })
      .where(eq(accounts.id, ana.id));

    await tx
      .update(accounts)
      .set({ balance: 700 })
      .where(eq(accounts.id, luis.id));

    await tx.insert(transfers).values({
      fromAccountId: ana.id,
      toAccountId: luis.id,
      amount: 200,
    });
  });

  console.log("Saldos después de la transferencia:");
  console.log(await db.select().from(accounts));
}

try {
  await main();
} finally {
  await client.end();
}

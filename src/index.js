const app = require("./app");
const db = require("./config/db");

const start = async () => {
  try {
    await db.authenticate();
    console.log("✔️ DB OK");
    await db.sync();
    console.log("📦 Modelos sincronizados");
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🔊 Servidor en http://localhost:${port}`)
    );
  } catch (err) {
    console.error("❌ Error al iniciar:", err);
    process.exit(1);
  }
};

start();

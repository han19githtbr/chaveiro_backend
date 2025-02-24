import * as functions from "firebase-functions";
import { https, logger } from "firebase-functions/v2";
import { Pool } from 'pg';

// Obtém a string de conexão da configuração do Firebase
const dbUrl = functions.config().db.url;

// Cria um pool de conexões. Isso é importante para o desempenho.
const pool = new Pool({ connectionString: dbUrl });

// Define a sua Cloud Function (exemplo: uma função HTTP)
export const getUsers = https.onRequest(async (req, res) => {
  try {
    // Conecta ao banco de dados a partir do pool
    const client = await pool.connect();

    // Executa uma consulta SQL (exemplo: selecionar todos os usuários)
    const result = await client.query('SELECT * FROM users'); // Substitua pela sua query real

    // Libera o cliente de volta para o pool
    client.release();

    // Envia a resposta com os dados do banco de dados
    res.status(200).send(result.rows);
  } catch (error) {
    // Registra o erro no console e nos logs do Firebase
    logger.error("Erro ao conectar ou executar query no banco de dados:", error);
    res.status(500).send("Erro interno do servidor"); // Retorna um erro 500
  }
});

// Outro exemplo de função (opcional):
export const helloWorld = https.onRequest((req, res) => {
    logger.info("Hello logs!", {structuredData: true});
    res.send("Hello from Firebase!");
});

// Certifique-se de fechar o pool quando sua função não precisar mais dele,
// para evitar vazamentos de conexão (idealmente em um contexto de encerramento
// da aplicação, que não existe diretamente em Cloud Functions, mas é boa prática
// para desenvolvimento local).
// pool.end();

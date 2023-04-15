import koaRouter from 'koa-router';
import os from 'node:os';
import logger4 from "../../loggers/index.js";

const router = new koaRouter();

router.get("/info", (req, res) => {
  try {
    const args = process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno";
    return res.status(200).json(
      {
        args:  args,
        process: process,
        numberOfProcessors: os.cpus().length
      }
    );
  
  } catch (err) {
    logger4.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

export default router;

import koaRouter from 'koa-router';
import { fork } from 'child_process';
import os from 'node:os';
import logger4 from "../../loggers/index.js";

const router = new koaRouter();

router.get("/random", (req, res) => {
  try {

    const cant = req.query.cant || 100;

    const randomNumbersGeneratorFork = fork('./src/utils/random.js');

    randomNumbersGeneratorFork.on('message', (resultado) => {
      res.status(200).json(resultado);
    
    });
    
    randomNumbersGeneratorFork.send(cant);
    logger4.log('Lista generada')


  } catch (err) {
    logger4.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

export default router;

/* eslint-disable @typescript-eslint/no-namespace */
import { Logger } from '@nestjs/common';
import { bgBlue, bold } from 'colorette';

export namespace LogServerStatus {
  type LogSuccessOpts = { isProduction: boolean; port: number; host: string };
  export const logSuccess = ({ isProduction, port, host }: LogSuccessOpts) => {
    const formattedPort = bold(bgBlue(port.toString()));
    const productionMessage = `🚀  Server is listening on port ${formattedPort}`;
    const developmentMessage = `🚀  Server ready at http://${host}:${formattedPort}`;
    const message = isProduction ? productionMessage : developmentMessage;
    Logger.log(message, 'Bootstrap', false);
  };

  export const logError = ({ error }: { error: Error }) => {
    Logger.error(`❌ Error starting server, ${error}`, 'Bootstrap');
    process.exit();
  };

  export const logEnv = ({ currentEnv }: { currentEnv: string }) => {
    const formattedEnv = bold(bgBlue(currentEnv.toUpperCase()));
    Logger.log(`Environment: ${formattedEnv}`, 'Bootstrap');
  };
}

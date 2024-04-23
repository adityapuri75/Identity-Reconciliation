import { App } from '@/app';
import { IdentifyRoute } from '@routes/identify.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new IdentifyRoute()]);

app.listen();

import { Client } from "boardgame.io/react";

import { Rats } from "./Game";

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = Client({ game: Rats });

export default App;

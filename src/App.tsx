import { Client } from "boardgame.io/react";

import { Rats } from "./Game";
import { Board } from "./boards/Board";

const App = Client({ game: Rats, board: Board });

export default App;

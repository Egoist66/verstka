import app from './renderer/render';
import { App as AppComponent } from './components/App';

import './styles/style.css';

app.mount(
  {
    component: AppComponent, 
    target: '#app',
    callback: (node) => {
      console.log(node)
    }
  }
);

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col">
        <DashboardLayout />
      </div>
    </Provider>
  );
}

export default App;
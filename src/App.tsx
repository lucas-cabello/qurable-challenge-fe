import './App.css';
import {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Tabs from './components/Tabs';
import TabContent from './components/TabContent';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
    const [activeTab, setActiveTab] = useState('users'); // Default to "users" tab

    return (
        <QueryClientProvider client={queryClient}>
            <div className="max-w-7xl mx-auto p-6">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabContent activeTab={activeTab}/>
            </div>
            <ToastContainer position="top-center"/>
        </QueryClientProvider>
    );
}

export default App;

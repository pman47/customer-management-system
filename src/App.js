import CustomersList from "./Pages/CustomersList";

function App() {
  return (
    <div className="App container mx-auto px-4">
      <h1 className="text-2xl lg:text-3xl font-bold my-4 mb-6">
        Customer Management System
      </h1>
      <CustomersList />
    </div>
  );
}

export default App;

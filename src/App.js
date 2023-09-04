import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import SearchItem from "./SearchItem";
import Footer from "./Footer";
import { useState,useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem,setNewItem] = useState("")
  const [search,setSearch] = useState("")
  const [fetchError,setFetchError] = useState(null)
  const API_URL = "http://localhost:8000/items"

  // Watches changes in items
  useEffect(()=>{
    
    const fetchTodoList = async ()=>{
        try{
          const data = await fetch(API_URL);
          if(!data.ok) throw Error('Did not receive data');
          const todoList = await data.json();
          setItems(todoList);
          setFetchError(null);
        }catch(err){
          setFetchError(err.message)
        }
    }

    fetchTodoList();
  },[]);


  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const currentNewItem = {id,checked:false,item}
    const listItems = [...items,currentNewItem];
    setItems(listItems)
  }


  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems)

  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <div className="App">
      <Header title="Todo List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
       <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {fetchError && <p style={{color:"red"}}>{`Error: ${fetchError}`}</p>}
         {!fetchError && <Content items={items.filter(item => ((item.item).toLowerCase())
          .includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete} />}
      </main>
      
      <Footer length={items.length}/>
    </div>
  );
}

export default App;

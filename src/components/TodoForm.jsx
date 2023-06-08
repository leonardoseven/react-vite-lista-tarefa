import React, { useSyncExternalStore } from "react";
import { useState } from "react";

const TodoForm = ({save}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title || !category) return
        console.log(title, category)
        console.log("Enviou!!!")
        save(title, category)    
        clearUseState();
    }

    const clearUseState = () =>{
        setTitle("");
        setCategory("");
    }

    return (
        <div className="todo-form">
            <h2>Criar tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Digite o título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>    
                        <option value="">Selecione uma categoria</option>
                        <option value="Estudos">Estudos</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Culinária">Culinária</option>
                </select>
                <button type="submit">Criar tarefa</button>
            </form>
        </div>
    )


}

export default TodoForm;
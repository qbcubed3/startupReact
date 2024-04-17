import React, {useState, useEffect} from 'react'
export function Survey(){
    const[items, setItems] = useState([]);
    const[newItem, setNew] = useState('');
    const[deleteThing, setDelete] = useState('');
    
    useEffect(() => {getItems();}, []);
    
    async function getItems(){
        const body2 = {
            authToken: localStorage.getItem("auth")
        }
        try{
            response = await fetch('/api/survey/get', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(body2)
            });
        }
        catch (error){
            console.log(error.message);
        }
        const data = await response.json();
        setItems(data.items);
    }

    async function addItem(){
        const auth = localStorage.getItem("auth");
        const body = {
            authToken: auth,
            item: newItem
        }
        try{
            const response = await fetch('/api/survey/add', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(body)
            });
        }
        catch{
            return;
        }
        setNew('');
    }

    async function deleteItem(){
        const body = {
            authToken: localStorage.getItem("auth"),
            item: deleteThing
        }
        try{
            const response = await fetch('api/survey/delete', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(body),
            });
        }
        catch{
            return;
        }
        setDelete('');

    }

    return(
        <div class="survey">
            <h2>Survey</h2>
            <h4>What did you do today?</h4>
            <div id="checkboxes">
            </div>
            <div>
                <input type="text" id="newItem" placeholder="Add a New Activity" onChange={(e) => setNew(e.target.value)}></input>
                <button class="my-button" id="addNew">Add</button>
            </div>
            <div>
                <input type="text" id="deleteItem" onChange={(e) => setDelete(e.target.value)} placeholder="Delete Activity"></input>
                <button class="my-button" id="remove">Delete</button>
            </div>
            <div class="ranges">
                <h4>On a Scale of 1-10, How Happy were you Today?</h4>
                <input type="range" id = "happinessRange" name="happiness" min="1" max="10" step="1" value="5"></input>
          <output id="selectedHappiness">5</output>
          <br></br><br></br>
          <button class="my-button" id="submit">Submit Survey</button>
        </div>
      </div>
    )
}

export default Survey;
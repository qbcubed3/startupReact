import React, {useState, useEffect} from 'react'
export function Survey(){
    const[items, setItems] = useState([]);
    const[newItem, setNew] = useState('');
    const[deleteThing, setDelete] = useState('');
    const[happy, setHappy] = useState(5);
    const[submitted, setSubmitted] = useState('');

    const allFalse = Object.fromEntries(items.map(item => [item, false]))

    const[checkboxVals, setCheckboxes] = useState(allFalse);
    
    useEffect(() => {
        getItems();
      }, []);

    async function getItems(){
        const body2 = {
            authToken: localStorage.getItem("auth")
        }
        try{
            const response = await fetch('/api/survey/get', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(body2)
            });
            const data = await response.json();
            if (data === null){
                setItems([
                "Morning meditation",
                "Worked out",
                "Ate Breakfast",
                "Talked to a Friend",
                "Learned something new",
                "Took a walk",
                "Listened to music",
                "Did a Hobby",
                "Read a book",
                "Wrote in a journal",
                "Ate lunch",
                "Took Breaks from Work",
                "Disconnect from technology for a bit",
                "Had coffee/tea",
                "Did something creative",
                "Help someone in need",
                "Planned for future goals",
                "Laughed or watched something funny",
                "Attend a social event",
                "Ate Dinner",
                "Had restful sleep",
                "Unplugged before bedtime"
              ]);
            }
            else{
                setItems(data.items);
            }
        }
        catch (error){
            console.log(error.message);
        }
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
    }

    async function handleAdd(){
        await addItem();
        await getItems();
        setNew('');
    }

    async function handleDelete(){
        await deleteItem();
        await getItems();
        setDelete('');
    }

    async function submit(){
        const date = new Date();
        var newDay = {}
        var key = "";
        var checks = document.getElementById("checkboxes").getElementsByTagName('input');
        for(var i = 0; i < checks.length; i++){
            key = checks[i].id;
            newDay[key] = checks[i].checked;
        }
        newDay['happiness'] = happy;
        const data = {
            auth: localStorage.getItem("auth"),
            scores: newDay
        }
        try{
            var response = await fetch('/api/survey/answers', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(data)
            });
        }
        catch{
            console.log("ERROR")
            return;
        }
        await getItems();
        setSubmitted("Survey Submitted");
    }

    async function doHappy(){

    }

    return(
        <div class="survey">
            <h2>Survey</h2>
            <h4>What did you do today?</h4>
            <div id="checkboxes">
                {items.map((item) => (<div><input type="checkbox" id={item} onChange={(e) => setCheckboxes({...checkboxVals, [item]: e.target.checked})}/>
                <label>{item}</label></div>))}
            </div>
            <div>
                <input type="text" id="newItem" placeholder="Add a New Activity" value={newItem} onChange={(e) => setNew(e.target.value)}></input>
                <button class="my-button" id="addNew" onClick={handleAdd}>Add</button>
            </div>
            <div>
                <input type="text" id="deleteItem" value={deleteThing} onChange={(e) => setDelete(e.target.value)} placeholder="Delete Activity"></input>
                <button class="my-button" id="remove" onClick={handleDelete}>Delete</button>
            </div>
            <div class="ranges">
                <h4>On a Scale of 1-10, How Happy were you Today?</h4>
                <input type="range" id = "happinessRange" name="happiness" min="1" max="10" step="1" value={happy} onChange={(e) => setHappy(e.target.value)}></input>
          <output id="selectedHappiness">{happy}</output>
          <br></br><br></br>
          <button class="my-button" id="submit" onClick={submit}>Submit Survey</button>
          <p>{submitted}</p>
        </div>
      </div>
    )
}

export default Survey;

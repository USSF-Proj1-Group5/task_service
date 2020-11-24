function AddTask(props){
    return (
        <div>
        <table>
          <thead>
            <tr>
              <th><label for="task">Task </label></th>
              <th><label for="category">Category </label></th>
              <th><label for="recurrence">Recurrence Frequency</label></th>
              <th><label for="last_serviced">Date Last Performed</label></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><input placeholder="Name / Description" onChange={props.onCurrentTaskName} /></th>
              <th>
                <select name="category" id="category" onChange={props.onCurrentCategory} >
                <option value=" "> </option>  
                <option value="appliance">Appliance</option>
                <option value="carpentry">Carpentry</option>
                <option value="electrician">Electrician</option>
                <option value="plumbing">Plumbing</option>
                <option value="roof">Roof</option>
                <option value="yard">Yard</option>
                </select> 
              </th>
              <th><input type="number" placeholder="In Years" onChange={props.onCurrentRecurrence} /></th>
              <th><input type="date" onChange={props.onCurrentServicedDate} /></th>
              <th><button onClick={props.onAddTask}>Add Task</button></th>
            </tr>
          </tbody>
        </table>

        {/* <p>
          <label for="task">Task </label>
          <input placeholder="Name / Description" onChange={props.onCurrentTaskName} />
        </p>
        <p>
            <label for="category">Category </label>       
          <select name="category" id="category" onChange={props.onCurrentCategory} >
          <option value=" "> </option>  
          <option value="appliance">Appliance</option>
          <option value="carpentry">Carpentry</option>
          <option value="electrician">Electrician</option>
          <option value="plumbing">Plumbing</option>
          <option value="roof">Roof</option>
          <option value="yard">Yard</option>
          </select> 
        </p>
        <p>
          <label for="recurrence">Recurrence Frequency</label>
          <input type="number" placeholder="In Years" onChange={props.onCurrentRecurrence} />
        </p>
        <p>
          <label for="last_serviced">Date Last Performed</label>
          <input type="date" onChange={props.onCurrentServicedDate} />
        </p>
          <button onClick={props.onAddTask}>Add Task</button> */}
        </div>
    )
}
        export default AddTask;
function DisplayTasks(props){
    var displayTasks = props.listTasks.map(each => {
        return ( <tr>
                    <td>{each.name}</td>
                    <td>{each.category}</td>
                    <td>{each.recurrence}</td>
                    <td>{each.last_serviced}</td>
                    <td>{each.user_id}</td>
                    <td><button value={each.id} onClick={props.onDeleteTask}>Delete</button></td>
        </tr>
        )
        })
    return (
        <div>
        <h1>Task List</h1>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Recurrence Frequency</th>
                <th>Last Serviced Date</th>
                <th>User ID</th>
            </tr>
            </thead>
            <tbody>
            {displayTasks}
            </tbody>
        </table>
        </div>
    )

}

export default DisplayTasks;
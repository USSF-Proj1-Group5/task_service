function AdminTasks(props) {
return (
    <div>
        <label for="admin_user">User</label>
        <input type="number" placeholder="Enter user number" onChange={props.onUser} />
    </div>
)
}

export default AdminTasks;
const StatusDropdown = ({ value, onChange }) => {
  return (
    <select className='status-select' value={value} onChange={(event) => onChange(event.target.value)}>
      <option value='Open'>Open</option>
      <option value='In Progress'>In Progress</option>
      <option value='Resolved'>Resolved</option>
    </select>
  )
}

export default StatusDropdown

const ShowItems = ({array}: {array: Employee[]}) => {
  return (
    <div>
      {array.map((item: Employee) => (
        <div key={item.id}>
          ID: {item.id}
          Name: {item.name}
          Phone Number: {item.phone_number}
          Email: {item.email}
          position: {item.position}
        </div>
      ))}
    </div>
  )
}

export default ShowItems